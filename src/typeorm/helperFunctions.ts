import { Connection } from "typeorm";
import { Todo } from "./entity/todos";

export const getAllTodos = async (connection: Connection): Promise<Todo[]> => {
  const todoRepo = connection.getRepository(Todo);
  const todos = await todoRepo.find();
  return todos;
};
