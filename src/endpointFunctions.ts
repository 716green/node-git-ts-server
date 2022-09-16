import { Request, Response } from "express";
import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

const connection = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  port: 3306,
});

connection.connect();
const runMysqlQuery = async (query: string, res: Response): Promise<void> => {
  connection.query(query, async (error, results, _fields) => {
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
  const { id } = req.params;
  await runMysqlQuery(`DELETE FROM todos WHERE id = ${id};`, res);
};
