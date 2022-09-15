import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

//* Load environment variables
dotenv.config();

//* Define Port
const PORT = process.env.PORT as string;

//* Generate instance of express server
const app = express();

//* enable urlencoded as middleware
app.use(express.json());

//* Middleware
app.use(cors()); // cross origin resource sharing

//* Define routes
app.post("/addTodo", (req: Request, res: Response): void => {
  const { todo } = req.body;

  res.json({ message: ["Todo added", todo].join(" - ") });
});

//* Listen on port
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
