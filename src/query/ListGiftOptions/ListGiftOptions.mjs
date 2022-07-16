import { GiftOption } from "./GiftOption.mjs";

/**
 * @typedef {import("../../application/infra/mysql/MySQLConnection.mjs").MySQLConnection} MySQLConnection
 */

export class ListGiftOptions {
	/**
	 * 
	 * @param {MySQLConnection} connection 
	 */
	constructor(connection) {
		this.db = connection;
	}

	async execute() {
		const connection = await this.db.getConnection();

		const [rows] = await connection.query(`
			select i.*,g.guestId,g.quantity as givenQuantity from Item i left outer join Gift g on i.id=g.itemId;
		`);

		const giftOptions = new Map();

		for (const row of rows) {
			let option = giftOptions.get(row.id);
			if (!option) {
				option = new GiftOption({
					itemId: row.id,
					name: row.name,
					picture: row.picture,
					quantityRequested: row.quantityRequested,
					quantityAvailableToGive: row.quantityAvailableToGive
				});
				giftOptions.set(option.itemId, option);
			}
			if (row.guestId) {
				option.addToGiftHistory(
					row.guestId,
					row.givenQuantity
				);
			}
		}

		return [...giftOptions.values()];
	}
}