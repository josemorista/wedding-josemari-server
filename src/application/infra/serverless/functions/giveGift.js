// @ts-check

import { GiveGift } from '../../../services/GiveGift.mjs';
import { PgRepositoriesFactory } from '../../pg/factories/PgRepositoriesFactory.mjs';
import { cacheService } from '../../cache/services/CacheService.mjs';
import { SlsResponse } from '../entities/SlsResponse';
import { withAuthorization } from '../hofs/withAuthorization';

const giveGift = new GiveGift(cacheService, new PgRepositoriesFactory());

export const handle = withAuthorization(async (event) => {
	try {
		const body = JSON.parse(event.body);
		await giveGift.execute({
			guestId: event.guestId,
			itemId: body.itemId,
			quantity: body.quantity
		});
		return new SlsResponse(undefined, 201);
	} catch (error) {
		console.error(error);
		return new SlsResponse({
			error: error.message
		}, 400);
	}
});