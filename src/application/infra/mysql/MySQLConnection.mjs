// @ts-check

/**
 * @typedef {import("mysql2/promise").Pool} Connection
 */

import { createPool } from "mysql2/promise";

export class MySQLConnection {
	/**
	 * @type {MySQLConnection}
	 */
	static _instance;

	/**
	 * 
	 * @param {string} [uri] 
	 */
	constructor(uri = process.env.DB_URI || "mysql://root:docker@localhost:3306/wedding-jose-mari") {
		this.uri = uri;
		/**
		 * @type {Connection | null}
		 */
		this._connection = null;
	}

	/**
	 * 
	 * @param {string} [uri] 
	 */
	static getInstance(uri) {
		if (!MySQLConnection._instance) {
			MySQLConnection._instance = new MySQLConnection(uri);
		}
		return MySQLConnection._instance;
	}

	async getConnection() {
		if (this._connection) return this._connection;
		this._connection = await createPool({
			uri: this.uri
		});
		return this._connection;
	}
}