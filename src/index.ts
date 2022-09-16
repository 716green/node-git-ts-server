import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mysql from "mysql";

import { getTodos, addTodo, updateTodo, deleteTodo } from "./endpointFunctions";

//* Load environment variables
dotenv.config();

//* Define Port
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;
const PORT = process.env.PORT || 3000;

export const connection = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  port: 3306,
});
connection.connect();

//* Generate instance of express server
const app = express();

//* enable urlencoded as middleware
app.use(express.json());

//* Middleware
//? cross origin resource sharing

app.use(cors());

//* Define routes
app.get("/getTodos", getTodos);
app.post("/addTodo", addTodo);
app.put("/updateTodo", updateTodo);
app.delete("/deleteTodo", deleteTodo);

//* Listen on port
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
