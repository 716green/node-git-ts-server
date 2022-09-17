import {
  ConnectionOptions,
  Connection,
  createConnection,
  getConnection,
} from "typeorm";
import "reflect-metadata";
import dotenv from "dotenv";
import { Todo } from "./entity/todos";
dotenv.config();

const { NODE_ENV, MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } =
  process.env;

export const prod = NODE_ENV === "production";

export const config: ConnectionOptions = {
  name: "todos",
  type: "mysql",
  host: MYSQL_HOST,
  port: 3306,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Todo],
};

export const connect = async (): Promise<Connection> => {
  let connection: Connection;

  try {
    connection = getConnection(config.name);
  } catch (_err) {
    connection = await createConnection(config);
  }

  return connection;
};
