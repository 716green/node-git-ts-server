import { Request, Response } from "express";
import { connection } from "./";

const runMysqlQuery = async (query: string, res: Response): Promise<void> => {
  connection.query(query, (error, results, _fields) => {
    if (error) {
      console.error(error);
      res.status(501).json(error);
    }
    res.json(results);
  });
};

export const getTodos = async (_req: Request, res: Response): Promise<void> => {
  await runMysqlQuery("SELECT * FROM todos;", res);
};

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  const { task } = req.body;
  await runMysqlQuery(
    `INSERT INTO todos (task, status) VALUES ('${task}', 'pending');`,
    res
  );
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, task, status } = req.body;
  await runMysqlQuery(
    `UPDATE todos SET task = "${task}", status = "${status}" WHERE id = ${id};`,
    res
  );
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.body;
  await runMysqlQuery(`DELETE FROM todos WHERE id = ${id};`, res);
};
