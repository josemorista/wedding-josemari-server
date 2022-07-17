// @ts-check

import { UpdateGiftQuantity } from "../../../services/UpdateGiftQuantity.mjs";
import { RestifyController } from "./RestifyController.mjs";
import { MySQLRepositoriesFactory } from "../../mysql/factories/MySQLRepositoriesFactory.mjs";
import { cacheService } from "../../cache/services/CacheService.mjs";

export class UpdateGiftController extends RestifyController {
	constructor() {
		super();
		this.updateGift = new UpdateGiftQuantity(cacheService, new MySQLRepositoriesFactory());
	}

	/**
	 * 
	 * @type {RestifyController["handle"]}
	 */
	async handle(request, response) {
		try {
			await this.updateGift.execute({
				guestId: request.guestId || "",
				itemId: request.body.itemId,
				quantity: request.body.quantity
			});
			response.statusCode = 204;
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