// @ts-check
/**
 * @typedef {import("./Item.mjs").Item} Item
 */

export class Gift {
	/**
	 * 
	 * @param {Gift} details 
	 */
	constructor(
		details
	) {
		if (details.quantity <= 0) throw new Error("Invalid quantity");
		/**
		 * @type {Item}
		 */
		this.item = details.item;
		/**
		 * @type {string}
		 */
		this.guestId = details.guestId;
		/**
		 * @type {number}
		 */
		this.quantity = details.quantity;
	}
}