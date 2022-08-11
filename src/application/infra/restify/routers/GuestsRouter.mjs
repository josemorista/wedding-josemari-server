// @ts-check

import { RestifyRouter } from './RestifyRouter.mjs';
import { UpdateGuestController } from '../controllers/UpdateGuest.mjs';
import { LoginController } from '../controllers/LoginController.mjs';
import { ensureAuthentication } from '../filters/ensureAuthentication.mjs';

class GuestsRouter extends RestifyRouter {

	constructor() {
		super();
		this.updateGuest = new UpdateGuestController();
		this.login = new LoginController();
	}

	/**
	 * 
	 * @type {RestifyRouter["register"]}
	 */
	register(server) {
		server.put('/v1/guests', ensureAuthentication, this.updateGuest.handle);
		server.post('/v1/guests/login', this.login.handle);
	}
}

export const guestsRouter = new GuestsRouter();