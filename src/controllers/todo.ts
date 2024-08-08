import { Request, Response } from 'express';

export const getTodos = (req: Request, res: Response) => {
    const requ = req;
    console.log(requ);
    res.status(200).json([1, 2, 3]);
}

export const getTodo = (req: Request, res: Response) => {
    const { id  } = req.params;
    res.status(200).json({'title': 1, 'desc': 2, 'id': id});
}

export const createTodo = (req: Request, res: Response) => {
    const { todo } = req.params;
    console.log(todo);
    res.status(404);
}

export const updateTodo = (req: Request, res: Response) => {
    const { id  } = req.params;
    console.log(id);
    res.status(404);
}

export const deleteTodo = (req: Request, res: Response) => {
    const { id  } = req.params;
    console.log(id);
    res.status(404);
}

