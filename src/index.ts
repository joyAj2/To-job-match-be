import express from "express";
import usersRouter from "./routes/user";
import authRouter from "./routes/auth";

const app = express();

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
