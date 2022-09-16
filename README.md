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
  status: "pending" | "completed";
}

type task = string;
```

## GET TODOS - Params: none

```ts
app.get("/getTodos", getTodos);
axios.get("http://localhost:3000/getTodos").then(({ data }) => {
  setTasks(data);
});
```

---

## ADD TODO - Params: `currentTask: string`

```ts
app.post("/addTodo", addTodo);
//
axios
  .post("http://localhost:3000/addTodo", currentTask)
  .then(({ data }) => {
    if (!!data) console.log("task added");
    setCurrentTask("");
  })
  .then(() => {
    // update tasks
    axios.get("http://localhost:3000/getTodos").then(({ data }) => {
      setTasks(data);
    });
  });
```

---

## UPDATE TASK NAME OR STATUS - Params: `todo: ITodo`

```ts
app.put("/updateTodo", updateTodo);
//
axios
  .put("http://localhost:3000/updateTodo", todo)
  .then(({ data }) => {
    console.log("task updated");
    setCurrentTask("");
  })
  .then(() => {
    // update tasks
    axios.get("http://localhost:3000/getTodos").then(({ data }) => {
      setTasks(data);
    });
  });
```

---

## DELETE TODO - Params: `todo: ITodo`

```ts
app.delete("/deleteTodo", deleteTodo);
//
axios.delete(`http://localhost:3000/deleteTodo:${id}`).then(() => {
  // update tasks
  axios.get("http://localhost:3000/getTodos").then(({ data }) => {
    setTasks(data);
  });
});
```
