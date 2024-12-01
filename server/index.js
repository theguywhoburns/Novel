import cors from "cors";
import express from "express";
import helmet from "helmet";
import { router as authRouter } from "./routes/auth.routes.js";
import { router as chatRouter } from "./routes/chat.routes.js";
import { router as userRouter } from "./routes/user.routes.js";
import WebSocketChatServer from './sockets/websocket.js';

const PORT = 4000;

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", chatRouter);

const wss = new WebSocketChatServer(app);
console.log(`WebSocket server is running on port ${wss.wss.options.port}`);
wss.start();

app.listen(PORT, () => console.log(`Main server is running on port ${PORT}`));
