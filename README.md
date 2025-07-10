# DeepSeek R1 ChatBot

A simple command-line chatbot using the DeepSeek R1 model via OpenRouter API.

## Features

- Interactive command-line chat interface
- Conversation history management
- Error handling and graceful exits
- Simple and clean design

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the chatbot:**
   ```bash
   python main.py
   ```

## Usage

Once you run the chatbot, you can:

- **Chat normally**: Just type your message and press Enter
- **Clear conversation**: Type `clear` to reset the conversation history
- **View history**: Type `history` to see the entire conversation
- **Exit**: Type `quit`, `exit`, or `bye` to close the chatbot

## Commands

- `quit` / `exit` / `bye` - Exit the chatbot
- `clear` - Clear conversation history
- `history` - Show conversation history
- `Ctrl+C` - Force exit

## Example

```
🤖 DeepSeek ChatBot
================
Type 'quit' to exit
Type 'clear' to clear conversation history
Type 'history' to show conversation history
Type your message and press Enter to chat!

You: Hello! How are you?
Bot: Hello! I'm doing well, thank you for asking. I'm here and ready to help you with any questions or tasks you might have. How are you doing today?

You: What can you help me with?
Bot: I can help you with a wide variety of tasks! Here are some examples:
...
```

## API Information

This chatbot uses:
- **Model**: `deepseek/deepseek-r1-0528:free`
- **Provider**: OpenRouter
- **API**: OpenRouter API v1

## Notes

- The free model has usage limits
- Conversation history is maintained during the session but not saved between runs
- The API key is embedded in the code for simplicity (consider using environment variables for production)
