import cors from "cors";
import { config as dotenvConfig } from "dotenv-esm";
import express from "express";
import helmet from "helmet";
import { router as authRouter } from "./routes/auth.routes.js";
import { router as chatRouter } from "./routes/chat.routes.js";
import { router as likesRouter } from "./routes/likes.routes.js";
import { router as newPairRouter } from "./routes/new_pair.routes.js";
import { router as placeRouter } from "./routes/place.routes.js";
import { router as settingsRouter } from "./routes/settings.routes.js";
import { router as userRouter } from "./routes/user.routes.js";
import WebSocketChatServer from "./sockets/websocket.js";

dotenvConfig();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

app.use("/", (req, res, next) => {
  console.log(
    `${req.method} ${req.path} ${JSON.stringify(req.headers)} ${JSON.stringify(
      req.query
    )}`
  );
  next();
});

app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", chatRouter);
app.use("/api", placeRouter);
app.use("/api", settingsRouter);
app.use("/api", newPairRouter);
app.use("/api", likesRouter);
app.use("/assets", express.static("assets", { index: false }));

const wss = new WebSocketChatServer(app);

wss.start();

app.listen(PORT, () => {
  console.log(`Main server is listening on port ${PORT}`);
});
