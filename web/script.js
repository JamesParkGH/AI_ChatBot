class ChatBot {
    constructor() {
        this.apiKey = localStorage.getItem('apiKey') || '';
        this.baseUrl = 'https://openrouter.ai/api/v1/chat/completions';
        this.model = 'deepseek/deepseek-r1-0528:free';
        this.conversation = [];
        this.messageCount = 0;
        this.sessionStartTime = Date.now();
        
        this.initializeElements();
        this.setupEventListeners();
        this.updateSessionTimer();
        this.loadSettings();
    }

    initializeElements() {
        // Main elements
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.newChatBtn = document.getElementById('newChatBtn');
        this.settingsBtn = document.getElementById('settingsBtn');
        
        // Status elements
        this.statusIndicator = document.getElementById('statusIndicator');
        this.statusText = document.getElementById('statusText');
        this.messageCountEl = document.getElementById('messageCount');
        this.sessionTimeEl = document.getElementById('sessionTime');
        this.charCount = document.getElementById('charCount');
        
        // Modal elements
        this.settingsModal = document.getElementById('settingsModal');
        this.closeSettingsBtn = document.getElementById('closeSettingsBtn');
        this.cancelSettingsBtn = document.getElementById('cancelSettingsBtn');
        this.saveSettingsBtn = document.getElementById('saveSettingsBtn');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        
        // Settings inputs
        this.apiKeyInput = document.getElementById('apiKey');
        this.temperatureInput = document.getElementById('temperature');
        this.maxTokensInput = document.getElementById('maxTokens');
    }

    setupEventListeners() {
        // Send message events
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Character counter
        this.messageInput.addEventListener('input', () => {
            this.updateCharCounter();
        });

        // New chat
        this.newChatBtn.addEventListener('click', () => this.newChat());

        // Settings modal
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.closeSettingsBtn.addEventListener('click', () => this.closeSettings());
        this.cancelSettingsBtn.addEventListener('click', () => this.closeSettings());
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());

        // Close modal on overlay click
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) {
                this.closeSettings();
            }
        });

        // Suggested prompts
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('prompt-btn')) {
                const prompt = e.target.getAttribute('data-prompt');
                this.messageInput.value = prompt;
                this.messageInput.focus();
                this.updateCharCounter();
            }
        });

        // Auto-resize textarea
        this.messageInput.addEventListener('input', () => {
            this.autoResizeTextarea();
        });
    }

    autoResizeTextarea() {
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
    }

    updateCharCounter() {
        const length = this.messageInput.value.length;
        this.charCount.textContent = length;
        
        if (length > 1800) {
            this.charCount.style.color = 'var(--danger)';
        } else if (length > 1500) {
            this.charCount.style.color = 'var(--warning)';
        } else {
            this.charCount.style.color = 'var(--text-muted)';
        }
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        if (!this.apiKey) {
            this.showError('Please set your API key in settings first.');
            this.openSettings();
            return;
        }

        // Clear input and hide welcome message
        this.messageInput.value = '';
        this.updateCharCounter();
        this.hideWelcomeMessage();

        // Add user message
        this.addMessage('user', message);
        
        // Show loading state
        this.setLoadingState(true);
        this.updateStatus('connecting', 'Processing your request...');

        try {
            const response = await this.callAPI(message);
            this.addMessage('assistant', response);
            this.updateStatus('online', 'Connected to DeepSeek AI');
        } catch (error) {
            console.error('API Error:', error);
            this.addMessage('assistant', `I apologize, but I encountered an error: ${error.message}`);
            this.updateStatus('offline', 'Connection Error');
        }

        this.setLoadingState(false);
        this.messageInput.focus();
    }

    async callAPI(message) {
        // Add message to conversation history
        this.conversation.push({
            role: 'user',
            content: message
        });

        const requestBody = {
            model: this.model,
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful AI assistant. Please respond in a clear, professional manner. Be concise but thorough in your explanations.'
                },
                ...this.conversation
            ],
            max_tokens: parseInt(this.maxTokensInput.value) || 1000,
            temperature: parseFloat(this.temperatureInput.value) || 0.7
        };

        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.origin,
                'X-Title': 'DeepSeek AI Assistant'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const assistantMessage = data.choices[0]?.message?.content || 'No response received.';

        // Add assistant response to conversation
        this.conversation.push({
            role: 'assistant',
            content: assistantMessage
        });

        return assistantMessage;
    }

    addMessage(sender, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const senderName = sender === 'user' ? 'You' : 'AI Assistant';
        const avatar = sender === 'user' ? '👤' : '🤖';

        messageDiv.innerHTML = `
            <div class="message-header">
                <div class="message-avatar">${avatar}</div>
                <div class="message-info">
                    <span class="message-sender">${senderName}</span>
                    <span class="message-time">${timeString}</span>
                </div>
            </div>
            <div class="message-content">${this.formatMessage(content)}</div>
        `;

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        
        this.messageCount++;
        this.updateMessageCount();
    }

    formatMessage(content) {
        // Basic markdown-like formatting
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    hideWelcomeMessage() {
        const welcomeMessage = this.chatMessages.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.style.display = 'none';
        }
    }

    showWelcomeMessage() {
        const welcomeMessage = this.chatMessages.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.style.display = 'block';
        }
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    setLoadingState(loading) {
        if (loading) {
            this.sendBtn.disabled = true;
            this.sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            this.loadingOverlay.classList.add('visible');
        } else {
            this.sendBtn.disabled = false;
            this.sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send';
            this.loadingOverlay.classList.remove('visible');
        }
    }

    updateStatus(status, text) {
        this.statusIndicator.className = `status-indicator ${status}`;
        this.statusText.textContent = text;
    }

    updateMessageCount() {
        const count = Math.floor(this.messageCount / 2); // Pairs of messages
        this.messageCountEl.textContent = `${count} exchange${count !== 1 ? 's' : ''}`;
    }

    updateSessionTimer() {
        setInterval(() => {
            const elapsed = Date.now() - this.sessionStartTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            this.sessionTimeEl.textContent = `Session: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    newChat() {
        if (this.conversation.length > 0) {
            if (!confirm('Start a new chat? This will clear your conversation history.')) {
                return;
            }
        }
        
        this.conversation = [];
        this.messageCount = 0;
        this.sessionStartTime = Date.now();
        
        // Clear chat messages but keep welcome message
        const messages = this.chatMessages.querySelectorAll('.message');
        messages.forEach(msg => msg.remove());
        
        this.showWelcomeMessage();
        this.updateMessageCount();
        this.updateStatus('online', 'Connected to DeepSeek AI');
        this.messageInput.focus();
    }

    openSettings() {
        this.settingsModal.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    closeSettings() {
        this.settingsModal.classList.remove('visible');
        document.body.style.overflow = 'auto';
    }

    loadSettings() {
        this.apiKeyInput.value = this.apiKey;
        this.temperatureInput.value = localStorage.getItem('temperature') || '0.7';
        this.maxTokensInput.value = localStorage.getItem('maxTokens') || '1000';
    }

    saveSettings() {
        this.apiKey = this.apiKeyInput.value.trim();
        
        if (!this.apiKey) {
            this.showError('Please enter a valid API key.');
            return;
        }

        // Save to localStorage
        localStorage.setItem('apiKey', this.apiKey);
        localStorage.setItem('temperature', this.temperatureInput.value);
        localStorage.setItem('maxTokens', this.maxTokensInput.value);

        this.closeSettings();
        this.showSuccess('Settings saved successfully!');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;
        
        if (type === 'error') {
            notification.style.backgroundColor = 'var(--danger)';
        } else if (type === 'success') {
            notification.style.backgroundColor = 'var(--success)';
        } else {
            notification.style.backgroundColor = 'var(--accent)';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize the chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
