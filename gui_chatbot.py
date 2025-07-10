import tkinter as tk
from tkinter import scrolledtext, messagebox
import threading
from main import DeepSeekChatBot

class ChatBotGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("🤖 DeepSeek ChatBot")
        self.root.geometry("600x500")
        
        # Initialize chatbot
        api_key = "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"
        self.chatbot = DeepSeekChatBot(api_key)
        
        self.setup_ui()
        
    def setup_ui(self):
        # Chat display area
        self.chat_display = scrolledtext.ScrolledText(
            self.root,
            wrap=tk.WORD,
            state=tk.DISABLED,
            height=20,
            font=("Arial", 10)
        )
        self.chat_display.pack(pady=10, padx=10, fill=tk.BOTH, expand=True)
        
        # Input frame
        input_frame = tk.Frame(self.root)
        input_frame.pack(pady=5, padx=10, fill=tk.X)
        
        # Message input
        self.message_entry = tk.Entry(input_frame, font=("Arial", 10))
        self.message_entry.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 5))
        self.message_entry.bind("<Return>", self.send_message)
        
        # Send button
        self.send_button = tk.Button(
            input_frame,
            text="Send",
            command=self.send_message,
            bg="#007ACC",
            fg="white",
            font=("Arial", 10, "bold")
        )
        self.send_button.pack(side=tk.RIGHT)
        
        # Button frame
        button_frame = tk.Frame(self.root)
        button_frame.pack(pady=5, padx=10, fill=tk.X)
        
        # Clear button
        clear_button = tk.Button(
            button_frame,
            text="Clear Chat",
            command=self.clear_chat,
            bg="#FFA500",
            fg="white",
            font=("Arial", 9)
        )
        clear_button.pack(side=tk.LEFT, padx=(0, 5))
        
        # Quit button
        quit_button = tk.Button(
            button_frame,
            text="Quit",
            command=self.root.quit,
            bg="#FF4444",
            fg="white",
            font=("Arial", 9)
        )
        quit_button.pack(side=tk.RIGHT)
        
        # Welcome message
        self.add_message("Bot", "Hello! I'm your DeepSeek ChatBot. How can I help you today?")
        
    def add_message(self, sender, message):
        """Add a message to the chat display."""
        self.chat_display.config(state=tk.NORMAL)
        
        # Add sender label
        if sender == "You":
            self.chat_display.insert(tk.END, f"{sender}: ", "user")
        else:
            self.chat_display.insert(tk.END, f"{sender}: ", "bot")
        
        # Add message content
        self.chat_display.insert(tk.END, f"{message}\n\n")
        
        # Configure tags for styling
        self.chat_display.tag_config("user", foreground="#0066CC", font=("Arial", 10, "bold"))
        self.chat_display.tag_config("bot", foreground="#009900", font=("Arial", 10, "bold"))
        
        self.chat_display.config(state=tk.DISABLED)
        self.chat_display.see(tk.END)
        
    def send_message(self, event=None):
        """Send message to chatbot."""
        message = self.message_entry.get().strip()
        if not message:
            return
            
        # Clear input field
        self.message_entry.delete(0, tk.END)
        
        # Add user message to display
        self.add_message("You", message)
        
        # Disable send button while processing
        self.send_button.config(state=tk.DISABLED, text="Sending...")
        
        # Process response in separate thread
        threading.Thread(target=self.process_response, args=(message,), daemon=True).start()
        
    def process_response(self, message):
        """Process chatbot response in background thread."""
        try:
            response = self.chatbot.send_message(message)
            
            # Update UI in main thread
            self.root.after(0, self.handle_response, response)
        except Exception as e:
            self.root.after(0, self.handle_error, str(e))
            
    def handle_response(self, response):
        """Handle chatbot response in main thread."""
        self.add_message("Bot", response)
        self.send_button.config(state=tk.NORMAL, text="Send")
        self.message_entry.focus()
        
    def handle_error(self, error):
        """Handle error in main thread."""
        self.add_message("Bot", f"Error: {error}")
        self.send_button.config(state=tk.NORMAL, text="Send")
        
    def clear_chat(self):
        """Clear the chat display and conversation history."""
        if messagebox.askyesno("Clear Chat", "Are you sure you want to clear the chat?"):
            self.chatbot.clear_conversation()
            self.chat_display.config(state=tk.NORMAL)
            self.chat_display.delete(1.0, tk.END)
            self.chat_display.config(state=tk.DISABLED)
            self.add_message("Bot", "Chat cleared! How can I help you?")

def main():
    root = tk.Tk()
    app = ChatBotGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main()
