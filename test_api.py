from main import DeepSeekChatBot

# Test the chatbot
api_key = "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"
bot = DeepSeekChatBot(api_key)

print("Testing API connection with English response...")
response = bot.send_message("Hello! Please tell me a joke in English.")
print(f"Response: {response}")
