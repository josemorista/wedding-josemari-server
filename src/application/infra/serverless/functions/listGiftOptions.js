// @ts-check

import { ListGiftOptions } from "../../../../query/ListGiftOptions/pg/ListGiftOptions.mjs";
import { cacheService } from "../../cache/services/CacheService.mjs";

const listGiftOptions = new ListGiftOptions(cacheService);

export const handler = async () => {
	try {
		return {
			statusCode: 200,
			body: JSON.stringify(await listGiftOptions.execute())
		};
	} catch (error) {
		console.error(error);
		return ({
			statusCode: 400,
			error: error.message
		});
	}
};