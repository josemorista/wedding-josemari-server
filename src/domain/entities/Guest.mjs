// @ts-check
import { randomUUID } from "crypto";

export class Guest {
	/**
	 * @arg {Omit<Guest, "id">} details
	 * @arg {string} [id]
	 */
	constructor(
		details,
		id
	) {
		/**
		 * @type {string}
		 */
		this.id = id || randomUUID();
		/**
		 * @type {string}
		 */
		this.name = details.name;
		/**
		 * @type {boolean}
		 */
		this.confirmed = details.confirmed !== undefined ? details.confirmed : false;
	}
}