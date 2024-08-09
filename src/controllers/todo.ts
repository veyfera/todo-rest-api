import { Request, Response } from 'express';
import { Todo } from './types';

//const todos: Array<Todo> = [];
const todos: Todo[] = [];
let todoCnt = 0;

export const getTodos = (req: Request, res: Response) => {
    const { filter } = req.params;
    if(filter) {
        console.log("filtering todos by: ", filter);
    }
    res.status(200).json(todos);
}

export const getTodo = (req: Request, res: Response) => {
    const { id  } = req.params;
    const todo = todos.find(t => t.id === id);
    if (todo) {
        res.status(200).json(todo);
    } else {
        res.status(404).json({msg: "no todo with id " + id});
    }
}

export const createTodo = (req: Request, res: Response) => {
    //typechecking is happening
    const { title, description, status, priority } = req.body;
    if(title && description && status && priority) {
        const todo = {id: todoCnt, title: title, description: description, status: status, priority: priority};
        todoCnt+=1;
        todos.push(todo);
        res.status(200).json({msg:"succesfully added new todo", id: todoCnt-1});
    } else {
        res.status(400).json({msg: "Invalid body, one or more properties missing: title, description, status, priority"});
    }
}

export const updateTodo = (req: Request, res: Response) => {
    const { id, todo } = req.params;
    if(id && todo) {
        console.log(id, todo);
    }
    res.status(404);
}

export const deleteTodo = (req: Request, res: Response) => {
    const { id  } = req.params;
    console.log(id);
    res.status(404);
}

