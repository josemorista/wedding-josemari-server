// @ts-check

import { ListGiftOptions } from "../../../../query/ListGiftOptions/pg/ListGiftOptions.mjs";
import { cacheService } from "../../cache/services/CacheService.mjs";
import { SlsResponse } from "../entities/SlsResponse";

const listGiftOptions = new ListGiftOptions(cacheService);

export const handle = async () => {
	try {
		return new SlsResponse(
			await listGiftOptions.execute(),
			200
		);
	} catch (error) {
		console.error(error);
		return ({
			statusCode: 400,
			error: error.message
		});
	}
};