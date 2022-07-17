// @ts-check

import { RestifyRouter } from "./RestifyRouter.mjs";
import { ToggleGuestConfirmationController } from "../controllers/ToggleGuestConfirmation.mjs";
import { LoginController } from "../controllers/LoginController.mjs";
import { ensureAuthentication } from "../filters/ensureAuthentication.mjs";

class GuestsRouter extends RestifyRouter {

	constructor() {
		super();
		this.toggleConfirmation = new ToggleGuestConfirmationController();
		this.login = new LoginController();
	}

	/**
	 * 
	 * @type {RestifyRouter["register"]}
	 */
	register(server) {
		server.patch("/guests/confirmation", ensureAuthentication, this.toggleConfirmation.handle);
		server.post("/guests/login", this.login.handle);
	}
}

export const guestsRouter = new GuestsRouter();