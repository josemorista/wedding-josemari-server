import { createServer, plugins } from 'restify';
import { guestsRouter } from './routers/GuestsRouter.mjs';
import { giftsRouter } from './routers/GiftsRouter.mjs';
import corsMiddleware from 'restify-cors-middleware2';

const cors = corsMiddleware({
	origins: ['*'],
	allowHeaders: ['Authorization']
});

const server = createServer({
	name: 'wedding-jose-mari',
	version: 'v1'
});

server.use(cors.actual);
server.pre(cors.preflight);
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());

guestsRouter.register(server);
giftsRouter.register(server);

const port = process.env.PORT || '3000';
server.listen(port, () => {
	console.log(`Server is online, ${port} is the love port!`);
});