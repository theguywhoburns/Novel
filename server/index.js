import cors from "cors";
import express from "express";
import helmet from "helmet";
import { router as authRouter } from "./routes/auth.routes.js";
import { router as chatRouter } from "./routes/chat.routes.js";
import { router as PlaceRouter } from "./routes/place.routes.js";
import { router as SettingsRouter } from "./routes/settings.routes.js";
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
app.use("/api", PlaceRouter);
app.use("/api", SettingsRouter);

const wss = new WebSocketChatServer(app);

wss.start();

app.listen(PORT, () => {
	console.log(`Main server is listening on port ${PORT}`);
});
