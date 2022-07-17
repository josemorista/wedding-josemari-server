// @ts-check

/**
 * @typedef {import("../MySQLConnection.mjs").MySQLConnection} MySQLConnection
 */

import { Guest } from "../../../../domain/entities/Guest.mjs";
import { GuestsRepository } from "../../../repositories/GuestsRepository.mjs";

export class MySQLGuestsRepository extends GuestsRepository {

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
	 * @type {GuestsRepository["findById"]}
	 */
	async findById(id) {
		const connection = await this.db.getConnection();
		const [rows] = await connection.query("select g.* from Guest g where id=? limit 1;", [id]);
		if (!rows[0]) return;
		return new Guest({
			name: rows[0].name,
			confirmed: !!rows[0].confirmed
		}, rows[0].id);
	}

	/**
	 * 
	 * @type {GuestsRepository["findByName"]}
	 */
	async findByName(name) {
		const connection = await this.db.getConnection();
		/**
		 * @type {any}
		 */
		const [rows] = await connection.query("select g.* from Guest g where name like ? limit 2;", [`${name}%`]);
		if (!rows[0] || rows.length > 1) return;
		return new Guest({
			name: rows[0].name,
			confirmed: !!rows[0].confirmed
		}, rows[0].id);
	}

	/**
	 * @type {GuestsRepository["updateConfirmation"]}
	 */
	async updateConfirmation(guestId, confirmed) {
		const connection = await this.db.getConnection();
		await connection.query("update Guest set confirmed=? where id=?;", [
			confirmed,
			guestId
		]);
	}
}