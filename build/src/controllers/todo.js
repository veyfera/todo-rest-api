const TODO_PER_PAGE = 20;
const TODO_TITLE_LEN = 70;
const TODO_DESC_LEN = 5000;
//const todos: Array<Todo> = [];
const todos = [];
let todoCnt = 0;
export const getTodos = (req, res) => {
    const { filter } = req.params;
    if (filter) {
        console.log("filtering todos by: ", filter);
        //status
        //priority
        //ts
        //
        //page = 0/1
        //
        //sort by ts
    }
    res.status(200).json(todos.slice(TODO_PER_PAGE));
};
export const getTodo = (req, res) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id == id);
    if (todo) {
        res.status(200).json(todo);
    }
    else {
        res.status(404).json({ msg: "no todo with id " + id });
    }
};
export const createTodo = (req, res) => {
    //typechecking is happening
    const { title, description, status, priority } = req.body;
    if (title && description && status && priority) {
        const todo = {
            id: todoCnt.toString(),
            title: title.slice(TODO_TITLE_LEN),
            description: description.slide(TODO_DESC_LEN),
            status: status,
            priority: priority,
            ts: Date.now()
        };
        todoCnt += 1;
        todos.push(todo);
        res.status(200).json({ msg: "succesfully added new todo", id: todoCnt - 1 });
    }
    else {
        res.status(400).json({ msg: "Invalid body, one or more properties missing: title, description, status, priority" });
    }
};
export const updateTodo = (req, res) => {
    const { id, todo } = req.params;
    if (id && todo) {
        console.log(id, todo);
    }
    res.status(404);
};
export const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id == id);
    if (todo) {
        todos.splice(todos.indexOf(todo), 1);
        res.status(200).json({ msg: "Succesfully deleted todo with id " + id });
    }
    else {
        res.status(404).json({ msg: "No todo with id " + id });
    }
};
//# sourceMappingURL=todo.js.map