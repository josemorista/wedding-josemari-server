// @ts-check

/**
 * @typedef {import("../MySQLConnection.mjs").MySQLConnection} MySQLConnection
 */

import { Gift } from "../../../../domain/entities/Gift.mjs";
import { Item } from "../../../../domain/entities/Item.mjs";
import { GiftsRepository } from "../../../repositories/GiftsRepository.mjs";

export class MySQLGiftsRepository extends GiftsRepository {

	/**
	 * 
	 * @param {MySQLConnection} connection 
	 */
	constructor(connection) {
		super();
		this.db = connection;
	}

	/**
	 * 
	 * @type {GiftsRepository["save"]}
	 */
	async save(gift) {
		const connection = await this.db.getConnection();
		await connection.query("insert into Gift(itemId,guestId,quantity) values (?,?,?);", [
			gift.item.id,
			gift.guestId,
			gift.quantity
		]);
	}

	/**
	 * @type {GiftsRepository["updateQuantity"]}
	 */
	async updateQuantity(guestId, itemId, quantity) {
		const connection = await this.db.getConnection();
		await connection.query("update Gift set quantity=? where guestId=? and itemId=?;", [
			quantity,
			guestId,
			itemId
		]);
	}

	/**
	 * 
	 * @type {GiftsRepository["findByGuestIdAndItem"]}
	 */
	async findByGuestIdAndItem(guestId, itemId) {
		const connection = await this.db.getConnection();
		const [rows] = await connection.query("select g.*,i.* from Gift g inner join Item i on g.itemId=i.id where guestId=? and itemId=? limit 1;", [
			guestId,
			itemId
		]);
		if (!rows[0]) return;
		return new Gift({
			guestId,
			quantity: rows[0].quantity,
			item: new Item({
				name: rows[0].name,
				picture: rows[0].picture,
				quantityAvailableToGive: rows[0].quantityAvailableToGive,
				quantityNeeded: rows[0].quantityNeeded
			})
		});
	}

	/**
	 * 
	 * @type {GiftsRepository["delete"]}
	 */
	async delete(guestId, itemId) {
		const connection = await this.db.getConnection();
		await connection.query("delete from Gift where guestId=? and itemId=?;", [guestId, itemId]);
	}

}