// @ts-check

import { RestifyRouter } from "./RestifyRouter.mjs";
import { UpdateGuestController } from "../controllers/UpdateGuest.mjs";
import { LoginController } from "../controllers/LoginController.mjs";
import { ensureAuthentication } from "../filters/ensureAuthentication.mjs";

class GuestsRouter extends RestifyRouter {

	constructor() {
		super();
		this.toggleConfirmation = new UpdateGuestController();
		this.login = new LoginController();
	}

	/**
	 * 
	 * @type {RestifyRouter["register"]}
	 */
	register(server) {
		server.put("/guests", ensureAuthentication, this.toggleConfirmation.handle);
		server.post("/guests/login", this.login.handle);
	}
}

export const guestsRouter = new GuestsRouter();