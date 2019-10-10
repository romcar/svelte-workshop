import { db } from '../../../db.js';

export async function get(req, res) {
    console.log(db.get('todos').value())
    res.end(JSON.stringify(db.get('todos').value()));
}

