import sirv from 'sirv';
import compression from 'compression';
import * as sapper from '@sapper/server';
import * as express from 'express';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app
.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
)
.listen(PORT, err => {
	if (err) console.log('error', err);
});

