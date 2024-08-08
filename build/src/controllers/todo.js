export const getTodos = (req, res) => {
    const requ = req;
    console.log(requ);
    res.status(200).json([1, 2, 3]);
};
export const getTodo = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ 'title': 1, 'desc': 2, 'id': id });
};
export const createTodo = (req, res) => {
    const { todo } = req.params;
    console.log(todo);
    res.status(404);
};
export const updateTodo = (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.status(404);
};
export const deleteTodo = (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.status(404);
};
//# sourceMappingURL=todo.js.map