import express, { Request, Response } from "express";
import cors from "cors";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./endpointFunctions";

//* Define Port
const PORT = process.env.PORT || 3000;

//* Generate instance of express server
const app = express();

//* Middleware (functions that run before every request is sent)
//? cross origin resource sharing so port 5173 can request data from port 3000
//? for security reasons, this is disabled by default to prevent malicious requests
app.use(cors());
//? enable urlencoded as middleware to parse request body
app.use(express.json());

//* Define routes
app.get("/getTodos", getTodos);
app.post("/addTodo", addTodo);
app.put("/updateTodo", updateTodo);
app.delete("/deleteTodo/:id", deleteTodo);

//* Root Handler - (optional)
app.get("/", (_req: Request, res: Response) => {
  res.json({
    availableRoutes: [
      {
        path: "/getTodos",
        method: "GET",
        params: null,
      },
      {
        path: "/addTodo",
        method: "POST",
        params: {
          task: "string",
        },
      },
      {
        path: "/updateTodo",
        method: "PUT",
        params: {
          id: "number",
          task: "string",
          status: "string",
        },
      },
      {
        path: "/deleteTodo/:id",
        method: "DELETE",
        params: null,
      },
    ],
  });
});

//* Listen on port
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
