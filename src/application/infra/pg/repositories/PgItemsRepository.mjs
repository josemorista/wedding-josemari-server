// @ts-check

/**
 * @typedef {import("../PgConnection.mjs").PgConnection} PgConnection
 */

import { Item } from '../../../../domain/entities/Item.mjs';
import { ItemsRepository } from '../../../repositories/ItemsRepository.mjs';

export class PgItemsRepository extends ItemsRepository {
	/**
	 *
	 * @param {PgConnection} connection
	 */
	constructor(connection) {
		super();
		this.db = connection;
	}

	/**
	 *
	 * @type {ItemsRepository["findById"]}
	 */
	async findById(id) {
		const connection = await this.db.getConnection();
		try {
			const { rows } = await connection.query('select i.* from Item i where id=$1;', [id]);
			if (!rows[0]) return;
			return new Item({
				id: rows[0].id,
				name: rows[0].name,
				picture: rows[0].picture,
				quantityAvailableToGive: rows[0].quantity_available_to_give,
				quantityNeeded: rows[0].quantity_needed,
				averagePrice: rows[0].average_price,
				suggestedSeller: rows[0].suggested_seller,
			});
		} finally {
			connection.release();
		}
	}

	/**
	 * @type {ItemsRepository["updateAvailableQuantity"]}
	 */
	async updateAvailableQuantity(itemId, quantity) {
		const connection = await this.db.getConnection();
		try {
			await connection.query('update Item set quantity_available_to_give=$1 where id=$2;', [quantity, itemId]);
		} finally {
			connection.release();
		}
	}
}
