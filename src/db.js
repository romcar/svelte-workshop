import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import _ from 'lodash';
const adapter = new FileSync('db.json');
export const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
if(_.isEmpty(db.defaults().value())) {
    db.defaults({ todos: {}, dancers: {}, count: 0 })
    .write();
    console.debug('[DATABASE]  File Initialized');
}