import path from "path";
import { Server } from "./presentation/server";
import { envs } from "./config/envs";

export async function main() {
  const server = new Server({
    port: envs.PORT,
    publicPath: path.resolve(__dirname, '..', envs.PUBLIC)
  })

  server.start();
}

main().catch(err => {
    console.error('Unexpected error ', err);
    process.exit(1);
  });