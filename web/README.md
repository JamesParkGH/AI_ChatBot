# DeepSeek AI Assistant - Web Version

A modern, professional web-based chat interface for the DeepSeek AI Assistant.

## Features

- **Modern UI Design**: Clean, professional interface with enterprise-grade styling
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Chat**: Instant messaging with the DeepSeek AI model
- **Message History**: Persistent conversation within session
- **Settings Panel**: Configurable API key, temperature, and response length
- **Status Indicators**: Connection status and session information
- **Suggested Prompts**: Quick-start conversation starters
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Graceful error messages and retry options

## Setup Instructions

1. **Open the Web Application**:
   - Navigate to the `web` folder
   - Open `index.html` in a modern web browser

2. **Configure API Key**:
   - Click the settings button (gear icon) in the header
   - Enter your OpenRouter API key
   - Adjust temperature and max tokens as needed
   - Click "Save Settings"

3. **Start Chatting**:
   - Type your message in the input area
   - Press Enter or click Send
   - Use suggested prompts for quick starts

## File Structure

```
web/
├── index.html          # Main HTML structure
├── styles.css          # Modern CSS styling
├── script.js          # JavaScript functionality
└── README.md          # This file
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Features Overview

### User Interface
- **Header**: Branding and navigation with New Chat and Settings buttons
- **Chat Area**: Scrollable message history with user and AI messages
- **Input Section**: Text area with send button and helpful hints
- **Status Bar**: Connection status and session information

### Functionality
- **API Integration**: Direct connection to OpenRouter/DeepSeek API
- **Local Storage**: Settings persist between sessions
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Keyboard navigation and screen reader support

### Settings
- **API Key**: Secure local storage of authentication
- **Temperature**: Control response creativity (0.1 - 1.0)
- **Max Tokens**: Set response length limits

## Security Notes

- API keys are stored locally in browser localStorage
- No data is sent to external servers except OpenRouter API
- All communication uses HTTPS

## Customization

The application uses CSS custom properties (variables) for easy theming:

```css
:root {
    --primary: #1e293b;
    --accent: #3b82f6;
    --success: #10b981;
    /* ... more variables */
}
```

## Troubleshooting

1. **API Key Issues**: Ensure your OpenRouter API key is valid and has sufficient credits
2. **Connection Problems**: Check your internet connection and firewall settings
3. **Browser Issues**: Try refreshing the page or clearing browser cache

## Development

To modify the application:

1. Edit `styles.css` for visual changes
2. Modify `script.js` for functionality updates
3. Update `index.html` for structural changes

The code is well-commented and follows modern web development practices.
