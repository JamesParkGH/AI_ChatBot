@echo off
echo.
echo =====================================================
echo  DeepSeek AI Assistant - Web Server Launcher
echo =====================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not found in PATH
    echo.
    echo Please install Node.js from https://nodejs.org/
    echo After installation, restart this script.
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js found
echo.

REM Change to the web directory
cd /d "%~dp0"

echo 🚀 Starting DeepSeek AI Assistant Web Server...
echo.
echo Instructions:
echo 1. The web browser will open automatically
echo 2. Click the settings button (gear icon) to enter your API key
echo 3. Start chatting with the AI assistant!
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the server and open browser
start "" "http://localhost:3000"
node server.js

pause
