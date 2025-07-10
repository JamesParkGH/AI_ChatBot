import requests
import json
import os
from typing import List, Dict

class DeepSeekChatBot:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://openrouter.ai/api/v1/chat/completions"
        self.model = "deepseek/deepseek-r1-0528:free"
        self.conversation_history: List[Dict[str, str]] = []
    
    def send_message(self, message: str) -> str:
        """Send a message to the chatbot and get a response."""
        try:
            # Add user message to conversation history
            self.conversation_history.append({
                "role": "user",
                "content": message
            })
            
            # Prepare the request
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://localhost:3000",  # Optional
                "X-Title": "DeepSeek ChatBot",  # Optional
            }
            
            # Create messages with system prompt for English responses
            messages_with_system = [
                {
                    "role": "system",
                    "content": "You are a helpful AI assistant. Please respond in English only. Be conversational, friendly, and helpful."
                }
            ] + self.conversation_history
            
            data = {
                "model": self.model,
                "messages": messages_with_system,
                "max_tokens": 1000,
                "temperature": 0.7
            }
            
            # Make the API request
            response = requests.post(
                url=self.base_url,
                headers=headers,
                data=json.dumps(data)
            )
            
            # Check if request was successful
            if response.status_code == 200:
                response_data = response.json()
                bot_message = response_data['choices'][0]['message']['content']
                
                # Add bot response to conversation history
                self.conversation_history.append({
                    "role": "assistant",
                    "content": bot_message
                })
                
                return bot_message
            else:
                return f"Error: {response.status_code} - {response.text}"
                
        except Exception as e:
            return f"An error occurred: {str(e)}"
    
    def clear_conversation(self):
        """Clear the conversation history."""
        self.conversation_history = []
        print("Conversation history cleared!")
    
    def show_conversation(self):
        """Display the current conversation history."""
        if not self.conversation_history:
            print("No conversation history.")
            return
        
        print("\n--- Conversation History ---")
        for i, message in enumerate(self.conversation_history, 1):
            role = "You" if message["role"] == "user" else "Bot"
            print(f"{i}. {role}: {message['content']}\n")

def main():
    # Initialize the chatbot with your API key
    api_key = "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"
    chatbot = DeepSeekChatBot(api_key)
    
    print("🤖 DeepSeek ChatBot")
    print("================")
    print("Type 'quit' to exit")
    print("Type 'clear' to clear conversation history")
    print("Type 'history' to show conversation history")
    print("Type your message and press Enter to chat!\n")
    
    while True:
        try:
            user_input = input("You: ").strip()
            
            if user_input.lower() in ['quit', 'exit', 'bye']:
                print("👋 Goodbye!")
                break
            elif user_input.lower() == 'clear':
                chatbot.clear_conversation()
                continue
            elif user_input.lower() == 'history':
                chatbot.show_conversation()
                continue
            elif not user_input:
                print("Please enter a message.")
                continue
            
            print("Bot: ", end="", flush=True)
            response = chatbot.send_message(user_input)
            print(response)
            print()  # Add empty line for readability
            
        except KeyboardInterrupt:
            print("\n👋 Goodbye!")
            break
        except Exception as e:
            print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()