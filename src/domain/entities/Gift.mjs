// @ts-check
/**
 * @typedef {import("./Item.mjs").Item} Item
 */

export class Gift {
	/**
	 * 
	 * @param {Omit<Gift, "_verifyIfQuantityIsValid">} details 
	 */
	constructor(
		details
	) {
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

	/**
	 * 
	 * @param {number} quantity 
	 */
	set quantity(quantity) {
		this.quantity = quantity;
		this._verifyIfQuantityIsValid();
	}

	_verifyIfQuantityIsValid() {
		if (this.quantity <= 0) throw new Error("Negative quantity to give");
		if (this.item.quantityAvailableToGive - this.quantity < 0) throw new Error("Invalid quantity");
	}
}