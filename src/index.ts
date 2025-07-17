import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/api/users/", (request: Request, response: Response) => {
  response.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
