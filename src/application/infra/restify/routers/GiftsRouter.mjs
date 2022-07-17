// @ts-check

import { RestifyRouter } from "./RestifyRouter.mjs";
import { ListGiftOptionsController } from "../controllers/ListGiftOptionsController.mjs";
import { UpdateGiftController } from "../controllers/GiveGiftController.mjs";
import { GiveGiftController } from "../controllers/UpdateGiftController.mjs";
import { ensureAuthentication } from "../filters/ensureAuthentication.mjs";


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
		server.get("/gifts", this.listGiftOptions.handle);
		server.post("/gifts", ensureAuthentication, this.giveGift.handle);
		server.patch("/gifts/quantity", ensureAuthentication, this.updateGift.handle);
	}
}

export const giftsRouter = new GiftsRouter();