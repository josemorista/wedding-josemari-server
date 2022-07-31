// @ts-check

/**
 * @typedef {import("../MySQLConnection.mjs").MySQLConnection} MySQLConnection
 */

import { Item } from "../../../../domain/entities/Item.mjs";
import { ItemsRepository } from "../../../repositories/ItemsRepository.mjs";

export class MySQLItemsRepository extends ItemsRepository {

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
	 * @type {ItemsRepository["findById"]}
	 */
	async findById(id) {
		const connection = await this.db.getConnection();
		const [rows] = await connection.query("select i.* from Item i where id=?;", [id]);
		if (!rows[0]) return;
		return new Item(rows[0]);
	}

	/**
	 * @type {ItemsRepository["updateAvailableQuantity"]}
	 */
	async updateAvailableQuantity(itemId, quantity) {
		const connection = await this.db.getConnection();
		await connection.query("update Item set quantityAvailableToGive=? where id=?;", [
			quantity,
			itemId
		]);
	}
}