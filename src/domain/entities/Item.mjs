// @ts-check
import { randomUUID } from "crypto";

export class Item {
	/**
	 * 
	 * @param {Omit<Item, "id">} details 
	 * @param {string} [id]
	 */
	constructor(details, id) {
		/**
		 * @type {string}
		 */
		this.id = id || randomUUID();
		/**
		 * @type {string}
		 */
		this.name = details.name;
		/**
		 * @type {string}
		 */
		this.picture = details.picture;
		/**
		 * @type {number}
		 */
		this.quantityNeeded = details.quantityNeeded;
		/**
		 * @type {number}
		 */
		this.quantityAvailableToGive = details.quantityAvailableToGive;
	}
}