import { db } from '../../../db.js';

export async function get(req, res) {
    console.log('GET todos');
    res.end(JSON.stringify(db.get('todos').value()));
}

export async function post(req, res) {
    console.log('Inside Post');

    const updatedTodos = db.set('todos', req.body).write();
    res.writeHead(201, {
		'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(updatedTodos));
}