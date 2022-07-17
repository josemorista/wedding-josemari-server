import { createServer, plugins } from "restify";
import { guestsRouter } from "./routers/GuestsRouter.mjs";
import { giftsRouter } from "./routers/GiftsRouter.mjs";

const server = createServer({
	name: "wedding-jose-mari"
});
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());

guestsRouter.register(server);
giftsRouter.register(server);

const port = process.env.PORT || "3333";
server.listen(port, () => {
	console.log(`Server is online, ${port} is the love port!`);
});