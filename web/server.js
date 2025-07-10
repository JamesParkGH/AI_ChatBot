const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // If requesting root, serve index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    // Get the file path
    const filePath = path.join(__dirname, pathname);
    
    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    
    // Set default content type
    const contentType = mimeTypes[ext] || 'text/plain';
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>404 - Not Found</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                        h1 { color: #ef4444; }
                    </style>
                </head>
                <body>
                    <h1>404 - Page Not Found</h1>
                    <p>The requested file <code>${pathname}</code> was not found.</p>
                    <a href="/">Go back to home</a>
                </body>
                </html>
            `);
            return;
        }
        
        // Read and serve the file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>500 - Internal Server Error</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                            h1 { color: #ef4444; }
                        </style>
                    </head>
                    <body>
                        <h1>500 - Internal Server Error</h1>
                        <p>Sorry, there was an error serving the file.</p>
                        <a href="/">Go back to home</a>
                    </body>
                    </html>
                `);
                return;
            }
            
            // Set CORS headers to allow API calls
            res.writeHead(200, {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            });
            res.end(data);
        });
    });
});

server.listen(PORT, () => {
    console.log(`🚀 DeepSeek AI Assistant Web Server running at:`);
    console.log(`   Local:   http://localhost:${PORT}`);
    console.log(`   Network: http://127.0.0.1:${PORT}`);
    console.log('');
    console.log('📝 Instructions:');
    console.log('   1. Open the URL above in your web browser');
    console.log('   2. Click the settings button (gear icon) to configure your API key');
    console.log('   3. Start chatting with the AI assistant!');
    console.log('');
    console.log('Press Ctrl+C to stop the server');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down the server...');
    server.close(() => {
        console.log('Server stopped.');
        process.exit(0);
    });
});
