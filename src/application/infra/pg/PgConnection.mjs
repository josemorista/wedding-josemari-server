// @ts-check
import pg from 'pg';

export class PgConnection {
	/**
	 * @type {PgConnection | null}
	 */
	static _instance = null;

	constructor(uri = process.env.DB_URI || 'postgres://weddingjosemariserver:docker@localhost:5432/wedding_jose_mari') {
		/**
		 * @type {string}
		 */
		this._connectionString = uri;
	}

	/**
	 *
	 * @param {string} [uri]
	 */
	static getInstance(uri) {
		if (!PgConnection._instance) {
			PgConnection._instance = new PgConnection(uri);
		}
		return PgConnection._instance;
	}

	async getConnection() {
		const client = new pg.Client({
			connectionString: this._connectionString,
		});
		await client.connect();
		return client;
	}
}
