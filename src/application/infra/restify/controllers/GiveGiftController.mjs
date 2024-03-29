// @ts-check

import { GiveGift } from '../../../services/GiveGift.mjs';
import { RestifyController } from './RestifyController.mjs';
import { PgRepositoriesFactory } from '../../pg/factories/PgRepositoriesFactory.mjs';
import { cacheService } from '../../cache/services/CacheService.mjs';

export class GiveGiftController extends RestifyController {
	constructor() {
		super();
		this.giveGift = new GiveGift(cacheService, new PgRepositoriesFactory());
	}

	/**
	 *
	 * @type {RestifyController["handle"]}
	 */
	async handle(request, response) {
		try {
			await this.giveGift.execute({
				guestId: request.guestId || 0,
				itemId: request.body.itemId,
				quantity: request.body.quantity,
			});
			response.statusCode = 201;
			response.send();
		} catch (error) {
			console.error(error);
			response.statusCode = 400;
			response.json({
				error: error.message,
			});
		}
	}
}
