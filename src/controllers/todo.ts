import { Request, Response } from 'express';
import { Todo, Status, Priority } from '../types.js';

const TODO_PER_PAGE = 20;
const TODO_TITLE_LEN = 70;
const TODO_DESC_LEN = 5000;

//const todos: Array<Todo> = [];
const todos: Todo[] = [];
let todoCnt = 0;

export const getTodos = (req: Request, res: Response) => {
    //const { filter, page = 1 } = req.params;
    const { filter, page = 1 } = req.query;
    if(filter) {
        console.log("filtering todos by: ", filter);
        //status
        //priority
        //ts
        //
        //
        //sort by ts
    }
    if(page > (TODO_PER_PAGE-1)*todos.length+1) {
        res.status(404).json({msg: "no such page"});
        return
    }
    res.status(200).json(todos.slice(page-1, page*TODO_PER_PAGE));
}

export const getTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id === id);
    if (todo) {
        res.status(200).json(todo);
    } else {
        res.status(404).json({msg: "no todo with id " + id});
    }
}

export const createTodo = (req: Request, res: Response) => {
    const { title, description, status, priority } = req.body;
    if(title && description && status && priority) {
        let todo: Todo = {
            id: todoCnt.toString(),
            title: title,//check_symbols
            description: description,
            status: status,
            priority: priority,
            ts: Date.now()
        };
        todo = validateTodo(todo);
        todoCnt+=1;
        todos.push(todo);
        res.status(200).json({msg:"succesfully added new todo", id: todoCnt-1});
    } else {
        res.status(400).json({msg: "Invalid body, one or more properties missing: title, description, status, priority"});
    }
}

export const updateTodo = (req: Request, res: Response) => {
    const { id, todo } = req.params;
    if(!id || !todo) {
        res.status(404);
        return;
    }
    console.log(id, todo);
    const oldTodo = todos.find(t => t.id === id);
    if(oldTodo) {
        if (oldTodo.status === Status.Complete || oldTodo.status === Status.Cancelled) {
            oldTodo.status = todo.status;
        } else {
            oldTodo = {...oldTodo, ...todo}
        }
        res.status(200).json({msg: "Succesfully updated todo with id " + id});
    } else {
        res.status(404).json({msg: "No todo with id " + id});
    }
}

export const deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id === id);

    if(todo) {
        todos.splice(todos.indexOf(todo), 1);
        res.status(200).json({msg: "Succesfully deleted todo with id " + id})
    } else {
        res.status(404).json({msg: "No todo with id " + id});
    }
}

const validateTodo = (todo: Todo) => {
    todo.title = todo.title.replace(/[^A-z 0-9.,?!-'"ЁёА-я]/g, "").slice(0, TODO_TITLE_LEN);
    todo.description = todo.description.slice(0, TODO_DESC_LEN);
    todo.status = Object.values(Status).includes(todo.status) ? todo.status : Status.Draft;
    todo.priority = Object.values(Priority).includes(todo.priority) ? todo.priority : Priority.Low;
    return todo;
}
