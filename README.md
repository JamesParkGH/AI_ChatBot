# DeepSeek AI ChatBot - Complete Project

A comprehensive AI chatbot project featuring multiple interfaces: command-line, desktop GUI, and modern web application using the DeepSeek R1 model via OpenRouter API.

## 🌟 Project Overview

This project includes three different implementations of an AI chatbot:

1. **Command-Line Interface** (`main.py`) - Simple terminal-based chat
2. **Desktop GUI Application** (`gui_chatbot.py`) - Professional tkinter interface  
3. **Modern Web Application** (`web/`) - Enterprise-grade web interface

## 🚀 Quick Start

### Web Application (Recommended)
```bash
cd web
node server.js
# Then open http://localhost:3000 in your browser
```

### Desktop GUI
```bash
python gui_chatbot.py
```

### Command Line
```bash
python main.py
```

## 📋 Complete Setup Guide

### Step 1: Get API Access from OpenRouter

1. **Visit OpenRouter.ai**
   - Go to [https://openrouter.ai](https://openrouter.ai)
   - Browse available AI models

2. **Find DeepSeek Model**
   - Search for "DeepSeek" in the models section
   - Select `deepseek/deepseek-r1-0528:free` (free tier available)
   - Note the model specifications and pricing

3. **Create Account & Get API Key**
   - Sign up for an OpenRouter account
   - Navigate to the API Keys section in your dashboard
   - Click "Create New Key"
   - Copy your API key (format: `sk-or-v1-...`)
   - **Important**: Keep this key secure and never share it publicly

### Step 2: Project Setup

1. **Clone or Download Project**
   ```bash
   git clone <repository-url>
   cd AI_ChatBot
   ```

2. **Install Python Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **For Web Application (Optional)**
   ```bash
   # Install Node.js from https://nodejs.org
   cd web
   npm install  # (optional, no dependencies needed)
   ```

### Step 3: Configuration

#### Option A: Environment Variables (Recommended)
1. **Create `.env` file** (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file**:
   ```
   OPENROUTER_API_KEY=your_actual_api_key_here
   ```

#### Option B: Direct Configuration
- **For Python versions**: Edit the API key directly in the source files
- **For Web version**: Enter API key through the settings panel

## 🖥️ Usage Instructions

### Command-Line Interface (`main.py`)

**Features:**
- Interactive command-line chat interface
- Conversation history management
- Simple commands for control

**How to use:**
```bash
python main.py
```

**Available Commands:**
- `quit` / `exit` / `bye` - Exit the chatbot
- `clear` - Clear conversation history
- `history` - Show conversation history
- `Ctrl+C` - Force exit

**Example:**
```
🤖 DeepSeek ChatBot
================
Type 'quit' to exit
Type 'clear' to clear conversation history
Type 'history' to show conversation history
Type your message and press Enter to chat!

You: Hello! How are you?
Bot: Hello! I'm doing well, thank you for asking. I'm here and ready to help you with any questions or tasks you might have. How are you doing today?
```

### Desktop GUI Application (`gui_chatbot.py`)

**Features:**
- Professional tkinter-based interface
- Modern enterprise design
- Message timestamps
- Clear chat functionality
- Error handling with user-friendly messages

**How to use:**
```bash
python gui_chatbot.py
```

**Interface Elements:**
- **Header**: Professional branding with "DeepSeek AI Assistant - Enterprise Edition"
- **Chat Area**: Scrollable message history with timestamps
- **Input Section**: Multi-line text input with placeholder text
- **Buttons**: Send message, New Chat, Exit
- **Status Bar**: Connection status and session information

### Web Application (`web/`)

**Features:**
- Modern, responsive web interface
- Enterprise-grade design
- Real-time chat functionality
- Settings panel for API configuration
- Suggested conversation starters
- Session management
- Cross-platform compatibility

**How to start:**

#### Method 1: Using Batch File (Windows)
```bash
cd web
double-click start_web_server.bat
```

#### Method 2: Using Node.js
```bash
cd web
node server.js
# Open http://localhost:3000 in your browser
```

#### Method 3: Using Python
```bash
cd web
python server.py
# Browser opens automatically
```

**Web Interface Features:**
- **Professional Header**: Branding and navigation
- **Chat Interface**: Real-time messaging with AI
- **Settings Panel**: Configure API key, temperature, max tokens
- **Status Indicators**: Connection status and session info
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🛠️ Development Process

### Phase 1: Basic Command-Line Bot
1. **API Research**: Explored OpenRouter.ai for available models
2. **Model Selection**: Chose DeepSeek R1 free tier model
3. **Basic Implementation**: Created simple CLI interface
4. **API Integration**: Implemented HTTP requests to OpenRouter
5. **Error Handling**: Added graceful error management

### Phase 2: Desktop GUI Enhancement
1. **GUI Framework**: Selected tkinter for cross-platform compatibility
2. **Design System**: Created professional color scheme and typography
3. **User Experience**: Added timestamps, status indicators, and input validation
4. **Threading**: Implemented background API calls to prevent UI freezing
5. **Professional Polish**: Enhanced with enterprise-grade styling

### Phase 3: Modern Web Application
1. **Technology Stack**: HTML5, CSS3, vanilla JavaScript
2. **Responsive Design**: Mobile-first approach with modern CSS Grid/Flexbox
3. **API Integration**: Fetch API with proper error handling
4. **Local Storage**: Persistent settings storage
5. **Server Implementation**: Node.js and Python server options
6. **Professional UI/UX**: Enterprise-grade design with animations

### Phase 4: Documentation and Deployment
1. **Comprehensive README**: Detailed setup and usage instructions
2. **Code Comments**: Thorough documentation of all functions
3. **Error Handling**: User-friendly error messages throughout
4. **Cross-Platform**: Ensured compatibility across different systems

## 📁 Project Structure

```
AI_ChatBot/
├── main.py                 # Command-line interface
├── main_secure.py          # Secure version with env variables
├── gui_chatbot.py          # Desktop GUI application
├── test_api.py            # API testing script
├── requirements.txt        # Python dependencies
├── .env.example           # Environment variables template
├── README.md              # This file
├── run_chatbot.bat        # Windows batch launcher
└── web/                   # Web application
    ├── index.html         # Main HTML structure
    ├── styles.css         # Professional CSS styling
    ├── script.js          # JavaScript functionality
    ├── server.js          # Node.js server
    ├── server.py          # Python server alternative
    ├── package.json       # Node.js configuration
    ├── start_web_server.bat  # Windows launcher
    └── README.md          # Web-specific documentation
```

## 🔧 Technical Details

### API Configuration
- **Provider**: OpenRouter.ai
- **Model**: `deepseek/deepseek-r1-0528:free`
- **Endpoint**: `https://openrouter.ai/api/v1/chat/completions`
- **Authentication**: Bearer token (API key)

### Dependencies
- **Python**: `requests` for HTTP calls, `tkinter` for GUI
- **Web**: Pure HTML/CSS/JavaScript (no frameworks required)
- **Server**: Node.js or Python built-in HTTP server

### Features Across All Versions
- Conversation history management
- Error handling and user feedback
- Professional UI/UX design
- Cross-platform compatibility
- Secure API key handling

## 🚨 Security & Best Practices

### API Key Security
- **Never commit API keys** to version control
- **Use environment variables** for production deployments
- **Regenerate keys** if accidentally exposed
- **Monitor usage** on OpenRouter dashboard

### Production Considerations
- Implement rate limiting for web applications
- Add user authentication for multi-user scenarios
- Use HTTPS in production environments
- Consider caching strategies for better performance

## 🐛 Troubleshooting

### Common Issues

1. **API Key Errors**
   ```
   Error: Invalid API key
   ```
   **Solution**: Verify your OpenRouter API key is correct and active

2. **Module Not Found**
   ```
   ModuleNotFoundError: No module named 'requests'
   ```
   **Solution**: Install dependencies with `pip install -r requirements.txt`

3. **Port Already in Use (Web)**
   ```
   Error: EADDRINUSE: address already in use :::3000
   ```
   **Solution**: Change port in server files or kill existing process

4. **GUI Not Displaying Properly**
   **Solution**: Ensure you have tkinter installed (`python -m tkinter`)

### Getting Help
- Check the terminal/console for error messages
- Verify your internet connection
- Ensure all dependencies are installed
- Check OpenRouter API status at [status.openrouter.ai](https://status.openrouter.ai)

## 🔄 Version History

- **v1.0**: Basic command-line interface
- **v1.1**: Added conversation history and commands
- **v2.0**: Desktop GUI with professional design
- **v2.1**: Enhanced GUI with enterprise styling
- **v3.0**: Modern web application with responsive design
- **v3.1**: Added multiple server options and comprehensive documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly across all interfaces
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **OpenRouter** for providing API access to DeepSeek models
- **DeepSeek** for creating powerful open-source AI models
- **Community** for feedback and suggestions during development

## 📞 Support

For questions or issues:
1. Check the troubleshooting section above
2. Review the code comments for implementation details
3. Open an issue on the GitHub repository
4. Check OpenRouter documentation at [openrouter.ai/docs](https://openrouter.ai/docs)
