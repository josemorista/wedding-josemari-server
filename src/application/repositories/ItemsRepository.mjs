// @ts-check

/**
 * @typedef {import("../../domain/entities/Item.mjs").Item} Item
 */

export class ItemsRepository {
	/**
	 * 
	 * @param {number} itemId
	 * @returns {Promise<Item | undefined>} 
	 */
	findById(itemId) {
		throw new Error("Abstract method");
	}

	/**
	 * 
	 * @param {number} itemId 
	 * @param {number} quantity 
	 * @returns {Promise<void>}
	 */
	updateAvailableQuantity(itemId, quantity) {
		throw new Error("Abstract method");
	}
}