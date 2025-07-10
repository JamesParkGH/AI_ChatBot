#!/usr/bin/env python3
"""
Simple HTTP server for DeepSeek AI Assistant Web Application
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

PORT = 3000

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP request handler with CORS support"""
    
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()
    
    def do_OPTIONS(self):
        # Handle preflight requests
        self.send_response(200)
        self.end_headers()

def main():
    # Change to the web directory
    web_dir = Path(__file__).parent
    os.chdir(web_dir)
    
    # Create server
    with socketserver.TCPServer(("", PORT), CORSHTTPRequestHandler) as httpd:
        print("🚀 DeepSeek AI Assistant Web Server running at:")
        print(f"   Local:   http://localhost:{PORT}")
        print(f"   Network: http://127.0.0.1:{PORT}")
        print()
        print("📝 Instructions:")
        print("   1. Open the URL above in your web browser")
        print("   2. Click the settings button (gear icon) to configure your API key")
        print("   3. Start chatting with the AI assistant!")
        print()
        print("Press Ctrl+C to stop the server")
        print()
        
        # Open browser automatically
        try:
            webbrowser.open(f'http://localhost:{PORT}')
        except Exception as e:
            print(f"Could not open browser automatically: {e}")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Shutting down the server...")
            httpd.shutdown()
            print("Server stopped.")

if __name__ == "__main__":
    main()
