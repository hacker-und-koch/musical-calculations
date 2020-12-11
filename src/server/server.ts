import { createServer, IncomingMessage, ServerResponse } from 'http';
import { } from 'net';
import { parse as parseUrl } from 'url';
import { readFileSync } from 'fs';
import { resolve as resolvePath } from 'path';

const PORT = process.env.HTTP_PORT || 8080;

const pageHtml = readFileSync(resolvePath(__dirname, 'page.html'));
const pageJs = readFileSync(resolvePath(__dirname, 'page.js'));
const pageCss = readFileSync(resolvePath(__dirname, 'style.css'));

const server = createServer((req: IncomingMessage, res: ServerResponse) => {


    const url = parseUrl(req.url);
    switch (url.pathname) {
        case '/':
        case '/index.html':
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.write(pageHtml);
            break;
        case '/page.js':
            res.setHeader('Content-Type', 'application/javascript');
            res.write(pageJs);
            break;
        case '/style.css': 
            res.setHeader('Content-Type', 'text/css');
            res.write(pageCss);
            break;
        default:
            res.statusCode = 404;
            break;
    }
    res.end();
});

server.listen(PORT, () => console.log(`Listening on *:${PORT}`));
