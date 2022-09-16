import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mysql from "mysql";
import cors from "cors";

//* Load environment variables
dotenv.config();

//* Define Port
const { PORT, MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } =
  process.env;

//* Generate instance of express server
const app = express();

//* enable urlencoded as middleware
app.use(express.json());

//* Middleware
//? cross origin resource sharing

app.use(cors());

const connection = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  port: 3306,
});

const mysqlQuery = async (query: string): Promise<any[]> => {
  connection.connect();
  const res: any = connection.query(query, (error, results, _fields) => {
    if (error) console.error(error);
    console.log(results);
    connection.end();
  });

  console.log(res);
  return res;
};

//* Define routes
app.get("/getTodos", async (_req: Request, res: Response): Promise<void> => {
  const results: any = await mysqlQuery("SELECT * FROM todos");
  console.log(results);

  res.json({ results });
});

// TODO - in progress
app.post("/addTodo", (req: Request, res: Response): void => {
  const { todo } = req.body;
  res.json({ message: ["Todo added", todo].join(" - ") });
});

// TODO - in progress
app.put("/updateTodo", (req: Request, res: Response): void => {
  const { id, newStatus } = req.body;
  res.json({
    message: ["Todo Status Updated", "- id:", id, "status:", newStatus].join(
      " "
    ),
  });
});

// TODO - in progress
app.post("/deleteTodo", (req: Request, res: Response): void => {
  const { todo } = req.body;
  res.json({ message: ["Todo added", todo].join(" - ") });
});

//* Listen on port
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
