import { Request, Response } from 'express';
import { Todo, Status, Priority } from '../types.js';

const TODO_PER_PAGE = 20;
const TODO_TITLE_LEN = 70;
const TODO_DESC_LEN = 5000;

const todos: Array<Todo> = [];
let todoCnt = 0;

export const getTodos = (req: Request, res: Response) => {
    const { filter, page = 1, status, priority, date, sort } = req.query;
    let searchRes:Array<Todo> = todos;
    console.log("filtering todos by: ", filter);
    switch(filter) {
        case "status":
            searchRes = todos.filter(t => t.status === +status);
            break;
        case "priority":
            searchRes = todos.filter(t => t.priority === +priority)
            break;
        case "date":
            searchRes = todos.filter(t => t.ts <= +date);
            break;
    }
    if(+page > (TODO_PER_PAGE-1)*searchRes.length+1) {
        res.status(404).json({msg: "No page with number " + page});
        return;
    }
    if(sort === 'desc') {
        searchRes.reverse();
    }
    res.status(200).json(searchRes.slice(+page-1, +page*TODO_PER_PAGE));
}

export const getTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id === id);
    if (todo) {
        res.status(200).json(todo);
    } else {
        res.status(404).json({msg: "No todo with id " + id});
    }
}

export const createTodo = (req: Request, res: Response) => {
    const { title, description, status, priority } = req.body;
    if(title && description && status && priority) {
        let todo: Todo = {
            id: todoCnt.toString(),
            title: title,
            description: description,
            status: status,
            priority: priority,
            ts: Date.now()
        };
        const { valid, msg } = validateTodo(todo);

        if(valid) {
            todoCnt+=1;
            todos.push(todo);
            res.status(200).json({msg:"Succesfully added new todo", id: todoCnt-1});
        } else {
            res.status(400).json({msg: msg});
        }
    } else {
        res.status(400).json({msg: "Invalid body, one or more properties missing: title, description, status, priority"});
    }
}

export const updateTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, status, priority} = req.body;

    if(!id || !req.body) {
        res.status(404).json({msg: "Please provide id and properties for updating a todo"});
        return;
    }

    let todo = todos.find(t => t.id === id);

    if(todo) {
        let tmpTodo: Todo = {
            ...todo,
            title: title,
            description: description,
            status: status,
            priority: priority
        }
        const { valid, msg } =validateTodo(tmpTodo);

        if(valid) {
            if (todo.status === Status.Complete || todo.status === Status.Cancelled) {
                todo.status = status || todo.status;
                res.status(200).json({msg: "Succesfully updated todo with id " + id + " (can only update 'status' for completed and cancelled todos)"});
                return;
            }
            todo.title = title || todo.title;
            todo.description = description || todo.description;
            todo.status = status || todo.status;
            todo.priority = priority || todo.priority;
        } else {
            res.status(400).json({msg: msg});
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
    if (todo.title.length > TODO_TITLE_LEN) {
        return {valid: false, msg: `Todo title should not be longer than ${TODO_TITLE_LEN}`};
    }
    if (todo.title.match(/[^A-z 0-9.,?!\-'"ЁёА-я]/g)) {
        return {valid: false, msg: "Todo title should only contain latin, cyrilic, numeric and .,?!-\"' symbols"};
    }

    if (todo.description.length > TODO_DESC_LEN) {
        return {valid: false, msg: `Todo description should not be longer than ${TODO_DESC_LEN}`};
    }

    if(!Object.values(Status).includes(todo.status)) {
        return {valid: false, msg: "Todo status should be one of "};
    }

    if(!Object.values(Priority).includes(todo.priority)) {
        return {valid: false, msg: "Todo priority should be one of "};
    }
    return {valid: true};
    //alternative logic, if we want to silently and automatically correct the errors
    //todo.title = todo.title.replace(/[^A-z 0-9.,?!-'"ЁёА-я]/g, "").slice(0, TODO_TITLE_LEN);
    //todo.description = todo.description.slice(0, TODO_DESC_LEN);
    //todo.status = Object.values(Status).includes(todo.status) ? todo.status : Status.Draft;
    //todo.priority = Object.values(Priority).includes(todo.priority) ? todo.priority : Priority.Low;
    //return todo;
}
