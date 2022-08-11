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
		const { rows } = await connection.query('select g.* from Guest g where id=$1 limit 1;', [id]);
		if (!rows[0]) return;
		return new Guest({
			id: rows[0].id,
			name: rows[0].name,
			confirmed: rows[0].confirmed,
			numberOfChildren: rows[0].number_of_children,
			numberOfEscorts: rows[0].number_of_escorts
		});
	}

	/**
	 * 
	 * @type {GuestsRepository["findByName"]}
	 */
	async findByName(name) {
		const connection = await this.db.getConnection();
		const { rows } = await connection.query('select g.* from Guest g where name ilike $1 limit 2;', [`${name}%`]);
		if (!rows[0] || rows.length > 1) return;
		return new Guest({
			id: rows[0].id,
			name: rows[0].name,
			confirmed: !!rows[0].confirmed,
			numberOfChildren: rows[0].number_of_children,
			numberOfEscorts: rows[0].number_of_escorts
		});
	}

	/**
	 * @type {GuestsRepository["updateGuest"]}
	 */
	async updateGuest(guestId, updateGuestDTO) {
		const connection = await this.db.getConnection();
		await connection.query('update Guest set confirmed=$1,number_of_children=$2,number_of_escorts=$3 where id=$4;', [
			updateGuestDTO.confirmed,
			updateGuestDTO.numberOfChildren,
			updateGuestDTO.numberOfEscorts,
			guestId
		]);
	}
}