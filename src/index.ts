//import express, { Request, Response } from 'express';
import express from 'express';

import todoRouter from './routes/todo.js';
const app = express()
const port = 3000

//const todo = [];

app.use('/', todoRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

