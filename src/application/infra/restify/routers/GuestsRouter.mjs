// @ts-check

import { RestifyRouter } from "./RestifyRouter.mjs";
import { ToggleGuestConfirmationController } from "../controllers/ToggleGuestConfirmation.mjs";

class GuestsRouter extends RestifyRouter {

	constructor() {
		super();
		this.toggleConfirmation = new ToggleGuestConfirmationController();
	}

	/**
	 * 
	 * @type {RestifyRouter["register"]}
	 */
	register(server) {
		server.patch("/guests/confirmation", this.toggleConfirmation.handle);
	}
}

export const guestsRouter = new GuestsRouter();