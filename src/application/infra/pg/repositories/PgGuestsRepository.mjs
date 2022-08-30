// @ts-check

/**
 * @typedef {import("../PgConnection.mjs").PgConnection} PgConnection
 */

import { Guest } from '../../../../domain/entities/Guest.mjs';
import { GuestsRepository } from '../../../repositories/GuestsRepository.mjs';

export class PgGuestsRepository extends GuestsRepository {
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
	 * @type {GuestsRepository["findById"]}
	 */
	async findById(id) {
		const connection = await this.db.getConnection();
		try {
			const { rows } = await connection.query(
				`select g.* ,e.name as escort_name, e.guest_id from Guest g
			left outer join Escort e on g.id=e.guest_id
		 	where g.id=$1;`,
				[id]
			);
			if (!rows[0]) return;
			const guest = new Guest({
				id: rows[0].id,
				name: rows[0].name,
				confirmed: rows[0].confirmed,
				numberOfChildren: rows[0].number_of_children,
			});
			for (const row of rows) {
				if (row.guest_id) {
					guest.addEscort(row.escort_name);
				}
			}
			return guest;
		} finally {
			connection.release();
		}
	}

	/**
	 *
	 * @type {GuestsRepository["findByName"]}
	 */
	async findByName(name) {
		const connection = await this.db.getConnection();
		try {
			const { rows } = await connection.query(
				`select g.*,e.name as escort_name, e.guest_id from 
		(select * from Guest where name ilike $1 limit 2) as g 
		left outer join Escort e on g.id=e.guest_id;`,
				[`${name}%`]
			);
			if (!rows[0] || rows.some((el) => el.id !== rows[0].id)) return;
			const guest = new Guest({
				id: rows[0].id,
				name: rows[0].name,
				confirmed: !!rows[0].confirmed,
				numberOfChildren: rows[0].number_of_children,
			});
			for (const row of rows) {
				if (row.guest_id) {
					guest.addEscort(row.escort_name);
				}
			}
			return guest;
		} finally {
			connection.release();
		}
	}

	/**
	 * @type {GuestsRepository["updateGuest"]}
	 */
	async updateGuest(guestId, updateGuestDTO) {
		const connection = await this.db.getConnection();
		try {
			await connection.query('BEGIN;');
			try {
				await connection.query('update Guest set confirmed=$1,number_of_children=$2 where id=$3;', [
					updateGuestDTO.confirmed,
					updateGuestDTO.numberOfChildren,
					guestId,
				]);
				if (updateGuestDTO.escorts) {
					const { rows: escorts } = await connection.query(
						'select lower(name) as name from Escort where guest_id=$1;',
						[guestId]
					);
					for (const escort of escorts) {
						if (!updateGuestDTO.escorts.some((el) => el.name.toLowerCase() === escort.name)) {
							await connection.query('delete from Escort where name ilike $1 and guest_id=$2;', [escort.name, guestId]);
						}
					}
					for (const escort of updateGuestDTO.escorts) {
						if (!escorts.some((el) => el.name === escort.name.toLowerCase())) {
							await connection.query('insert into Escort(name, guest_id) values ($1,$2);', [escort.name, guestId]);
						}
					}
				}
				await connection.query('COMMIT');
			} catch (error) {
				await connection.query('ROLLBACK;');
				throw error;
			}
		} finally {
			connection.release();
		}
	}
}
