import express from 'express';
import path from 'path';

type ServerOptions = {
  port: number,
  publicPath: string
}

export class Server {
  private readonly app = express();
  private readonly options: ServerOptions
  private middlewares: express.RequestHandler[] = [];

  constructor(options: ServerOptions) {
    this.options = options;
    this.setMiddlewares();
    this.useMiddlewares();
  }

  private useMiddlewares() {
    this.middlewares.forEach(middleware => {
      this.app.use(middleware);
    });
  }

  private setMiddlewares() {
    this.middlewares = [
      express.static(this.options.publicPath)
    ]
  }

  start() {
    this.app.listen(3000, () => {
      console.log(`Server is running on http://localhost:${this.options.port}`);
    });

    this.app.get('*paths', (req: express.Request<{ paths: string }>, res) => {
      const indexPath = path.join(this.options.publicPath, 'index.html');

      res.sendFile(indexPath);
    })
  }
}