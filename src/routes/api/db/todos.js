import { db } from '../../../db.js';

// SECTION Example of CRUD request
export async function get(req, res) {
    console.log('GET todos');

    const { getCompleted } = req.query;

    const todos = db.get('todos')
                    .filter(td => {
                        return getCompleted ? td.completed : !td.completed;
                    })
                    .value();
    const todosMap = {};

    todos.forEach(todo => {
        todosMap[todo.id] = todo;
    });

    res.end(JSON.stringify(todosMap));
}

export async function post(req, res) {
    const { body } = req;
    console.log(`POST todos:    ${body.id} received.`);

    db
    .update('todos', (todos) => {
        todos[body.id] = body;
        return todos;
    })
    .write();

    res.writeHead(201, {
        'Content-Type': 'application/json'
    });

    res.end();
}

export async function put(req, res) {
    const { body } = req;
    console.log(`PUT todos:     ${body.id} received.`);

    db
    .update('todos', (todos) => {
        todos[body.id] = body;
        return todos;
    })
    .write();
    res.writeHead(202, {
        'Content-Type': 'application/json'
    });
    res.end();
}

// ANCHOR Delete in JS is a reserved word, so we use del here.
export async function del(req, res) {
    console.log('DELETE todos');

    const todos = db.get('todos')
                    .value();

    const uncompletedTodos = Object.keys(todos).reduce((uncomplete, todo) => {
        if(!todos[todo].completed) {
            uncomplete[todo] = todos[todo];
            return uncomplete;
        }
        return uncomplete;
    }, {});

    db.set('todos', uncompletedTodos)
        .write();

    console.log(uncompletedTodos);
    res.writeHead(202, {
        'Content-Type': 'application/json'
    });
    res.end();
}

// !SECTION

