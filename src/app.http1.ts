import http from 'node:http';
import fs from 'node:fs';

const server = http.createServer((req, res) => {
  const { url } = req;
  console.log({url});

  const handler = router[url!];
  if (handler) {
    handler(req, res);
    return
  }

  //serve js files
  if (url?.endsWith('.js')) {
    const file = fs.readFileSync(`./public${url}`, 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(file);
    return
  }

  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>Not Found</h1>');
  
});

type RouteHandler = (req: http.IncomingMessage, res: http.ServerResponse) => void

const rootHandler: RouteHandler = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const html = fs.readFileSync('./public/index.html', 'utf-8');
  res.end(html);
}
const router: Record<string, RouteHandler> = {
  '/': rootHandler
} as const


server.listen(3000);
server.on('listening', () => console.log('Server is running on http://localhost:3000'));