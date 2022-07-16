// @ts-check

/**
 * @typedef {import("mysql2/promise").ConnectionOptions} ConnectionOptions
 * @typedef {import("mysql2/promise").Connection} Connection
 */

import { createConnection } from "mysql2/promise";

export class MySQLConnection {
	/**
	 * @type {MySQLConnection}
	 */
	static _instance;

	/**
	 * 
	 * @param {ConnectionOptions} config 
	 */
	constructor(config) {
		this.config = config;
		/**
		 * @type {Connection | null}
		 */
		this._connection = null;
	}

	/**
	 * 
	 * @param {ConnectionOptions} config 
	 */
	static getInstance(config) {
		if (!MySQLConnection._instance) {
			MySQLConnection._instance = new MySQLConnection(config);
		}
		return MySQLConnection._instance;
	}

	async getConnection() {
		if (this._connection) return this._connection;
		this._connection = await createConnection(this.config);
		return this._connection;
	}
}