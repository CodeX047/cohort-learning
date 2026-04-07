import { createServer } from "node:http";
import { createApplication } from "./app/index.js";

async function main() {
  try {
    const server = createServer(createApplication());
    const PORT: number = 8000;

    server.listen(PORT, () => {
      console.log(`Server is running of port:${PORT}`);
    });
  } catch (err) {
    console.log("Error starting http server");
    throw err;
  }
}

main();
