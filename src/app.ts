import http from "http";
import { config } from "dotenv"
import { createServer } from "./config/express";
import { createIo } from "./config/sockets";

config();

const PORT = process.env.PORT!;

const startServer = () => {
    const app = createServer();

    const server = http.createServer(app);
    const io = createIo(server);

    server.listen(PORT, () => {
        console.log(`Server is listening to port ${PORT}`);
    });


}

startServer();