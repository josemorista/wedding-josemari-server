import { createServer } from "restify";
import { ToggleGuestConfirmationController } from "./controllers/ToggleGuestConfirmation.mjs";
import { ensureAuthentication } from "./filters/ensureAuthentication.mjs";

const server = createServer({
	name: "wedding-jose-mari"
});

const toggleGuestController = new ToggleGuestConfirmationController();

server.post("/guests/confirmation", ensureAuthentication, toggleGuestController.handle);

server.listen(process.env.PORT || "3333", () => {
	console.log("Server is online");
});