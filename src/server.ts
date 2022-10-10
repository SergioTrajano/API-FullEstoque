import express from "express";
import cors from "cors";
import "express-async-errors";

import routes from "./routes/index";
import errorHandler from "./middlewares/errorHandler";
import testRouter from "./routes/testRouter";

const server = express();

server.use(express.json());
server.use(cors());

if (process.env.NODE_ENV === "test") {
	server.use(testRouter);
}

server.use(routes);
server.use(errorHandler);

export default server;
