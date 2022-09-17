import { Request, Response } from "express";
import { Connection } from "typeorm";
import { connect } from "./typeorm/config";
import { Todo } from "./typeorm/entity/todos";
import { getAllTodos } from "./typeorm/helperFunctions";

export const getTodos = async (_req: Request, res: Response): Promise<void> => {
  console.log("getTodos");
  const connection = await connect();
  const todos = await getAllTodos(connection);
  res.json(todos);
};

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  console.log("addTodo");
  const { task } = req.body;
  const connection = await connect();
  const todoRepo = connection.getRepository(Todo);

  const newTodo = new Todo();
  newTodo.task = task;
  newTodo.status = "pending";
  await todoRepo.save(newTodo);

  const todos = await getAllTodos(connection);
  res.json(todos);
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("updateTodo");
  const { id, task, status } = req.body;
  const connection: Connection = await connect();
  const todoRepo = connection.getRepository(Todo);

  const todo = await todoRepo.findOne({ where: { id } });
  if (!!todo) {
    todo.task = task;
    todo.status = status;
    await todoRepo.save(todo);
  }

  const todos = await getAllTodos(connection);
  res.json(todos);
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("deleteTodo");
  const { id } = req.params;
  const connection: Connection = await connect();

  const todoRepo = connection.getRepository(Todo);
  await todoRepo.delete(id);

  const todos = await getAllTodos(connection);
  res.json(todos);
};
