// @ts-check

/**
 * @typedef {import("../../domain/entities/Item.mjs").Item} Item
 */

export class ItemsRepository {
	/**
	 * 
	 * @param {string} itemId
	 * @returns {Promise<Item | undefined>} 
	 */
	findById(itemId) {
		throw new Error("Abstract method");
	}

	/**
	 * 
	 * @param {string} itemId 
	 * @param {number} quantity 
	 * @returns {Promise<void>}
	 */
	updateAvailableQuantity(itemId, quantity) {
		throw new Error("Abstract method");
	}
}