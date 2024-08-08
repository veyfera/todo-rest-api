import { Router} from 'express';

import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from '../controllers/todo.js';

const todoRouter = Router();

todoRouter.get('/', getTodos);

todoRouter.get('/:id', getTodo);

todoRouter.post('/', createTodo);

todoRouter.patch('/:id', updateTodo);

todoRouter.delete('/:id', deleteTodo);

export default todoRouter
