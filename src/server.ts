import express from "express";
import cors from "cors";
import "express-async-errors";

import routes from "./routes/index";
import errorHandler from "./middlewares/errorHandler";

const server = express();

server.use(express.json());
server.use(cors());
server.use(routes);
server.use(errorHandler);

export default server;
