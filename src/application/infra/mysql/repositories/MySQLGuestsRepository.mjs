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
		const [rows] = await connection.query(
			`select g.*, e.name as escortName,e.guestId from (select * from Guest where name like ? limit 2) as g
		left outer join Escort e on g.id=e.guestId;`,
			[`${name}%`]
		);
		if (!rows[0] || rows.some((el) => el.id !== rows[0].id)) return;
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
		return guest;
	}

	/**
	 * @type {GuestsRepository["updateGuest"]}
	 */
	async updateGuest(guestId, updateGuestDTO) {
		const connection = await this.db.getConnection();
		await connection.query('START TRANSACTION;');
		try {
			await connection.query('update Guest set confirmed=?,numberOfChildren=?,numberOfEscorts=? where id=?;', [
				updateGuestDTO.confirmed,
				updateGuestDTO.numberOfChildren,
				guestId,
			]);
			if (updateGuestDTO.escorts) {
				const { rows: escorts } = await connection.query('select lower(name) as name from Escort where guestId=$1;', [
					guestId,
				]);
				for (const escort of escorts) {
					if (!updateGuestDTO.escorts.some((el) => el.name.toLowerCase() === escort.name)) {
						await connection.query('delete from Escort where name like $1 and guestId=$2;', [escort.name, guestId]);
					}
				}
				for (const escort of updateGuestDTO.escorts) {
					if (!escorts.some((el) => el.name === escort.name.toLowerCase())) {
						await connection.query('insert into Escort(name, guestId) values ($1,$2);', [(escort.name, guestId)]);
					}
				}
			}
			await connection.query('COMMIT;');
		} catch (error) {
			await connection.query('ROLLBACK;');
			throw error;
		}
	}
}
