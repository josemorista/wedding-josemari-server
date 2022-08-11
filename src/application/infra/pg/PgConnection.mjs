// @ts-check
import pg from 'pg';

export class PgConnection {

	/**
	 * @type {PgConnection | null}
	 */
	static _instance = null;

	constructor(uri = process.env.DB_URI || 'postgres://weddingjosemariserver:docker@localhost:5432/wedding_jose_mari') {
		this._connection = new pg.Client({
			ssl: {
				rejectUnauthorized: false
			},
			connectionString: uri
		});
		this.isConnected = false;
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
		if (!this.isConnected) {
			await this._connection.connect();
			this.isConnected = true;
		}
		return this._connection;
	}
}