// @ts-check
import { UpdateGuest } from '../../../services/UpdateGuest.mjs';
import { PgRepositoriesFactory } from '../../pg/factories/PgRepositoriesFactory.mjs';
import { SlsResponse } from '../entities/SlsResponse';
import { withAuthorization } from '../hofs/withAuthorization';

const updateGuest = new UpdateGuest(new PgRepositoriesFactory());

export const handle = withAuthorization(async (event) => {
	try {
		const body = JSON.parse(event.body);
		await updateGuest.execute(event.guestId, body);
		return new SlsResponse(undefined, 204);
	} catch (error) {
		console.error(error);
		return new SlsResponse({
			error: error.message
		}, 400);
	}
});