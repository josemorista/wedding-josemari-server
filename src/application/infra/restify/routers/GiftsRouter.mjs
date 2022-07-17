// @ts-check

import { RestifyRouter } from "./RestifyRouter.mjs";
import { ListGiftOptionsController } from "../controllers/ListGiftOptionsController.mjs";

class GiftsRouter extends RestifyRouter {

	constructor() {
		super();
		this.listGiftOptions = new ListGiftOptionsController();
	}

	/**
	 * 
	 * @type {RestifyRouter["register"]}
	 */
	register(server) {
		server.get("/gifts", this.listGiftOptions.handle);
	}
}

export const giftsRouter = new GiftsRouter();