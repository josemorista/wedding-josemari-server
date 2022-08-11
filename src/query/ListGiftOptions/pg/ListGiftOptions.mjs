// @ts-check
import { PgConnection } from '../../../application/infra/pg/PgConnection.mjs';
import { GiftOption } from '../GiftOption.mjs';
import { CACHE_KEYS } from '../../../config/cache.mjs';

export class ListGiftOptions {
	/**
	 * @param {import("cache-service-lib/lib").CacheService} cacheService
	 * @param {PgConnection} [connection] 
	 */
	constructor(cacheService, connection = PgConnection.getInstance()) {
		this.db = connection;
		this.cacheService = cacheService;
	}

	async execute() {
		const call = async () => {
			const connection = await this.db.getConnection();


			const { rows } = await connection.query(`
				select i.*,g.guest_id,g.quantity as given_quantity from Item i left outer join gift g on i.id=g.item_id order by i.id;
			`);

			/**
			 * @type {Record<number, GiftOption>}
			 */
			const giftOptions = {};

			for (const row of rows) {
				let option = giftOptions[row.id];
				if (!option) {
					option = new GiftOption({
						id: row.id,
						name: row.name,
						picture: row.picture,
						quantityNeeded: row.quantity_needed,
						quantityAvailableToGive: row.quantity_available_to_give,
						averagePrice: row.average_price,
						suggestedSeller: row.suggested_seller
					});
					giftOptions[option.itemId] = option;
				}
				if (row.guest_id) {
					option.addToGiftHistory(
						row.guest_id,
						row.given_quantity
					);
				}
			}
			return Object.values(giftOptions);
		};

		return await this.cacheService.call(call, CACHE_KEYS.GIFT_OPTIONS);

	}
}