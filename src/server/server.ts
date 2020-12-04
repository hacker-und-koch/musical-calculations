import { createServer, IncomingMessage, ServerResponse } from 'http';
import { } from 'net';
import { parse as parseUrl } from 'url';
import { readFileSync } from 'fs';
import { resolve as resolvePath } from 'path';

const PORT = process.env.HTTP_PORT || 8080;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {

    // TODO: Move read outside of this function
    const pageHtml = readFileSync(resolvePath(__dirname, 'page.html'));
    const pageJs = readFileSync(resolvePath(__dirname, 'page.js'));

    const url = parseUrl(req.url);
    switch (url.pathname) {
        case '/':
        case '/index.html':
            res.setHeader('Content-Type', 'text/html');
            res.write(pageHtml);
            break;
        case '/page.js':
            res.setHeader('Content-Type', 'application/javascript');
            res.write(pageJs);
            break;
        default:
            res.statusCode = 404;
            break;
    }
    res.end();
});

server.listen(PORT, () => console.log(`Listening on *:${PORT}`));
