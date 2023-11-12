import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const tasks = [];

const checkIfFound = (req, res, next) => {
    const wanted = req.params.id
    const found = tasks.find((element) => 
        element.id === Number(wanted)
    )
    if (! found) {
        return res.status(404).send("Not found");
    }
    res.locals.task = found
    next()
} 

app.use(bodyParser.json())

app.get("/todos", (req, res) => {
    res.send(tasks)
})

app.post("/todos", (req, res) => {
    const task = req.body
    if (tasks.length === 0) {
        task.id = 1
    } else {
        const last = tasks[tasks.length - 1]; 
        task.id = last.id + 1 
    }
    tasks.push(task)
    res.status(200).send(task)
})

app.get("/todos/:id", checkIfFound, (req, res) => {
    
    res.send(req.locals.found);
})

app.post("/todos/:id", checkIfFound, (req, res) => {
    const id = req.params.id
    const task = tasks.find((element) => element.id === Number(id))
    task.completed = true;
    res.send(task);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  