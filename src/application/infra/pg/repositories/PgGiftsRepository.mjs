// @ts-check

/**
 * @typedef {import("../PgConnection.mjs").PgConnection} PgConnection
 */

import { Gift } from '../../../../domain/entities/Gift.mjs';
import { Item } from '../../../../domain/entities/Item.mjs';
import { GiftsRepository } from '../../../repositories/GiftsRepository.mjs';

export class PgGiftsRepository extends GiftsRepository {
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
	 * @type {GiftsRepository["create"]}
	 */
	async create(gift) {
		const connection = await this.db.getConnection();
		try {
			await connection.query('insert into Gift(item_id,guest_id,quantity) values ($1,$2,$3);', [
				gift.item.id,
				gift.guestId,
				gift.quantity,
			]);
		} finally {
			await connection.end();
		}
	}

	/**
	 * @type {GiftsRepository["updateQuantity"]}
	 */
	async updateQuantity(guestId, itemId, quantity) {
		const connection = await this.db.getConnection();
		try {
			await connection.query('update Gift set quantity=$1 where guest_id=$2 and item_id=$3;', [
				quantity,
				guestId,
				itemId,
			]);
		} finally {
			connection.end();
		}
	}

	/**
	 *
	 * @type {GiftsRepository["findByGuestIdAndItem"]}
	 */
	async findByGuestIdAndItem(guestId, itemId) {
		const connection = await this.db.getConnection();
		try {
			const { rows } = await connection.query(
				'select g.*,i.* from Gift g inner join Item i on g.item_id=i.id where guest_id=$1 and item_id=$2 limit 1;',
				[guestId, itemId]
			);
			if (!rows[0]) return;
			return new Gift({
				guestId,
				quantity: rows[0].quantity,
				item: new Item({
					id: itemId,
					name: rows[0].name,
					picture: rows[0].picture,
					quantityAvailableToGive: rows[0].quantity_available_to_give,
					quantityNeeded: rows[0].quantity_needed,
					averagePrice: rows[0].average_price,
					suggestedSeller: rows[0].suggested_seller,
				}),
			});
		} finally {
			await connection.end();
		}
	}

	/**
	 *
	 * @type {GiftsRepository["delete"]}
	 */
	async delete(guestId, itemId) {
		const connection = await this.db.getConnection();
		try {
			await connection.query('delete from Gift where guest_id=$1 and item_id=$2;', [guestId, itemId]);
		} finally {
			connection.end();
		}
	}
}
