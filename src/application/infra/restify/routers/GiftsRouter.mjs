// @ts-check

import { RestifyRouter } from './RestifyRouter.mjs';
import { ListGiftOptionsController } from '../controllers/ListGiftOptionsController.mjs';
import { GiveGiftController } from '../controllers/GiveGiftController.mjs';
import { UpdateGiftController } from '../controllers/UpdateGiftController.mjs';
import { ensureAuthentication } from '../filters/ensureAuthentication.mjs';

class GiftsRouter extends RestifyRouter {
	constructor() {
		super();
		this.listGiftOptions = new ListGiftOptionsController();
		this.giveGift = new GiveGiftController();
		this.updateGift = new UpdateGiftController();
	}

	/**
	 *
	 * @type {RestifyRouter["register"]}
	 */
	register(server) {
		server.get('/v1/gifts', this.listGiftOptions.handle);
		server.post('/v1/gifts', ensureAuthentication, this.giveGift.handle);
		server.patch('/v1/gifts/quantity', ensureAuthentication, this.updateGift.handle);
	}
}

export const giftsRouter = new GiftsRouter();
