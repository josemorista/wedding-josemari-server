// @ts-check
import { MySQLConnection } from '../../../application/infra/mysql/MySQLConnection.mjs';
import { GiftOption } from '../GiftOption.mjs';
import { CACHE_KEYS } from '../../../config/cache.mjs';

export class ListGiftOptions {
	/**
	 * @param {import("cache-service-lib/lib").CacheService} cacheService
	 * @param {MySQLConnection} [connection] 
	 */
	constructor(cacheService, connection = MySQLConnection.getInstance()) {
		this.db = connection;
		this.cacheService = cacheService;
	}

	async execute() {
		const call = async () => {
			const connection = await this.db.getConnection();

			/**
			 * @type {any}
			 */
			const [rows] = await connection.query(`
				select i.*,g.guestId,g.quantity as givenQuantity from Item i left outer join Gift g on i.id=g.itemId order by i.id;
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
						quantityNeeded: row.quantityNeeded,
						quantityAvailableToGive: row.quantityAvailableToGive,
						averagePrice: row.averagePrice,
						suggestedSeller: row.suggestedSeller
					});
					giftOptions[option.itemId] = option;
				}
				if (row.guestId) {
					option.addToGiftHistory(
						row.guestId,
						row.givenQuantity
					);
				}
			}
			return Object.values(giftOptions);
		};

		return await this.cacheService.call(call, CACHE_KEYS.GIFT_OPTIONS);

	}
}