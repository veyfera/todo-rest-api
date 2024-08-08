"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const port = 3000;
const todo = [];
app.get('/', (req, res) => {
    res.send(todo);
});
app.post('/add', (req, res) => {
    const todo = req.body;
    console.log(todo);
});
app.get;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=server.js.map