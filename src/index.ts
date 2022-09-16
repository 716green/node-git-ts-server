import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { getTodos, addTodo, updateTodo, deleteTodo } from "./endpointFunctions";

//* Load environment variables
dotenv.config();

//* Define Port
const PORT = process.env.PORT || 3000;

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
app.delete("/deleteTodo/:id", deleteTodo);

//* Listen on port
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
