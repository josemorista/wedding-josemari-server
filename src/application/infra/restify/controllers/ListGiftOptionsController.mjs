// @ts-check

import { ListGiftOptions } from '../../../../query/ListGiftOptions/pg/ListGiftOptions.mjs';
import { RestifyController } from './RestifyController.mjs';
import { cacheService } from '../../cache/services/CacheService.mjs';

export class ListGiftOptionsController extends RestifyController {
	constructor() {
		super();
		this.listGiftOptions = new ListGiftOptions(cacheService);
	}

	/**
	 *
	 * @type {RestifyController["handle"]}
	 */
	async handle(request, response) {
		try {
			response.json(await this.listGiftOptions.execute());
		} catch (error) {
			console.error(error);
			response.json(400, {
				error: error.message,
			});
		}
	}
}
