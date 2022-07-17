// @ts-check

import { GiveGift } from "../../../services/GiveGift.mjs";
import { RestifyController } from "./RestifyController.mjs";
import { MySQLRepositoriesFactory } from "../../mysql/factories/MySQLRepositoriesFactory.mjs";
import { cacheService } from "../../cache/services/CacheService.mjs";

export class GiveGiftController extends RestifyController {
	constructor() {
		super();
		this.giveGift = new GiveGift(cacheService, new MySQLRepositoriesFactory());
	}

	/**
	 * 
	 * @type {RestifyController["handle"]}
	 */
	async handle(request, response) {
		try {
			await this.giveGift.execute({
				guestId: request.guestId || "",
				itemId: request.body.itemId,
				quantity: request.body.quantity
			});
			response.statusCode = 201;
			return response.send();
		} catch (error) {
			console.error(error);
			response.statusCode = 400;
			return response.json({
				error: error.message
			});
		}

	}
}