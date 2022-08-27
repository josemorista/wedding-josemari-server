// @ts-check

/**
 * @typedef {import("../MySQLConnection.mjs").MySQLConnection} MySQLConnection
 */

import { Guest } from '../../../../domain/entities/Guest.mjs';
import { GuestsRepository } from '../../../repositories/GuestsRepository.mjs';

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
		/**
		 * @type {any}
		 */
		const [rows] = await connection.query(
			`select g.*,e.name as escortName,e.guestId from Guest g 
		left outer join Escort e on g.id=e.guestId
		 where g.id=?;`,
			[id]
		);
		if (!rows[0]) return;
		const guest = new Guest({
			id: rows[0].id,
			name: rows[0].name,
			confirmed: !!rows[0].confirmed,
			numberOfChildren: rows[0].numberOfChildren,
		});
		for (const row of rows) {
			if (row.guestId) {
				guest.addEscort(row.escortName);
			}
		}
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
		const [rows] = await connection.query('select g.* from Guest g where name like ? limit 2;', [`${name}%`]);
		if (!rows[0] || rows.length > 1) return;
		const guest = new Guest({
			id: rows[0].id,
			name: rows[0].name,
			confirmed: !!rows[0].confirmed,
			numberOfChildren: rows[0].numberOfChildren,
		});
		const [escorts] = await connection.query('select name from Escort where guestId=?;', [guest.id]);
	}

	/**
	 * @type {GuestsRepository["updateGuest"]}
	 */
	async updateGuest(guestId, updateGuestDTO) {
		const connection = await this.db.getConnection();
		await connection.query('update Guest set confirmed=?,numberOfChildren=?,numberOfEscorts=? where id=?;', [
			updateGuestDTO.confirmed,
			updateGuestDTO.numberOfChildren,
			guestId,
		]);
	}
}
