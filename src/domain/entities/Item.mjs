// @ts-check

export class Item {
	/**
	 * 
	 * @param {Item} details
	 */
	constructor(details) {
		/**
		 * @type {number}
		 */
		this.id = details.id;
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