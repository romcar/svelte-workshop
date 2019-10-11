import { db } from '../../../db.js';

export async function get(req, res) {
    console.log('GET todos');
    res.end(JSON.stringify(db.get('todos').value()));
}

export async function post(req, res) {
    console.log('Inside Post');
    res.end('success')
}