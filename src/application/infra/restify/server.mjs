import { createServer } from "restify";
import { guestsRouter } from "./routers/GuestsRouter.mjs";
import { giftsRouter } from "./routers/GiftsRouter.mjs";

const server = createServer({
	name: "wedding-jose-mari"
});

guestsRouter.register(server);
giftsRouter.register(server);

const port = process.env.PORT || "3333";
server.listen(port, () => {
	console.log(`Server is online, ${port} is the love port!`);
});