// @ts-check

import { UpdateGiftQuantity } from '../../../services/UpdateGiftQuantity.mjs';
import { PgRepositoriesFactory } from '../../pg/factories/PgRepositoriesFactory.mjs';
import { cacheService } from '../../cache/services/CacheService.mjs';
import { SlsResponse } from '../entities/SlsResponse';
import { withAuthorization } from '../hofs/withAuthorization';

const updateGift = new UpdateGiftQuantity(cacheService, new PgRepositoriesFactory());

export const handle = withAuthorization(async (event) => {
	try {
		const body = JSON.parse(event.body);
		await updateGift.execute({
			guestId: event.guestId,
			itemId: body.itemId,
			quantity: body.quantity
		});
		return new SlsResponse(undefined, 204);
	} catch (error) {
		console.error(error);
		return new SlsResponse({
			error: error.message
		}, 400);
	}
});