# node-git-ts-server

### Create tsconfig.json file

```bash
npx tsconfig.json
```

---

# API

## Types

```ts
interface ITodo {
  id: number;
  task: string;
  status: TStatus;
}

type TStatus = "pending" | "completed";
```

## GET TODOS - Params: none

```ts
// server
app.get("/getTodos", getTodos);
// client
axios.get("http://localhost:3000/getTodos").then(({ data }) => {
  setTasks(data);
});
```

---

## ADD TODO - Params: `currentTask: string`

```ts
// server
app.post("/addTodo", addTodo);
// client
axios.post("http://localhost:3000/addTodo", currentTask).then(({ data }) => {
  setTasks(data);
  setCurrentTask("");
});
```

---

## UPDATE TASK NAME OR STATUS - Params: `todo: ITodo`

```ts
// server
app.put("/updateTodo", updateTodo);
// client
axios.put("http://localhost:3000/updateTodo", todo).then(({ data }) => {
  setCurrentTask("");
  setTasks(data);
});
```

---

## DELETE TODO - Params: `todo: ITodo`

```ts
// server
app.delete("/deleteTodo", deleteTodo);
// client
axios.delete(`http://localhost:3000/deleteTodo:${id}`).then(({ data }) => {
  setTasks(data);
});
```
