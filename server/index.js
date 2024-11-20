import cors from "cors";
import express from "express";
import helmet from "helmet";
import { router as authRouter } from "./routes/auth.routes.js";
import { router as chatRouter } from "./routes/chat.routes.js";
import { router as messageRouter } from "./routes/message.routes.js";
import { router as userRouter } from "./routes/user.routes.js";

const PORT = 4000;

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", messageRouter);
app.use("/api", chatRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
