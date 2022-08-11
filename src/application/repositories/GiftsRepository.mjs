// @ts-check

/**
 * @typedef {import("../../domain/entities/Gift.mjs").Gift} Gift
 */

export class GiftsRepository {
	/**
	 * 
	 * @abstract
	 * @param {Gift} gift
	 * @returns {Promise<void>}
	 */
	create(gift) {
		throw new Error('Abstract method');
	}

	/**
	 * 
	 * @param {number} guestId 
	 * @param {number} itemId 
	 * @param {number} quantity 
	 * @abstract
	 */
	updateQuantity(guestId, itemId, quantity) {
		throw new Error('Abstract method');
	}

	/**
	 * 
	 * @param {number} guestId 
	 * @param {number} itemId 
	 * @abstract
	 */
	delete(guestId, itemId) {
		throw new Error('Abstract method');
	}

	/**
	 * 
	 * @param {number} guestId 
	 * @param {number} itemId 
	 * @returns {Promise<Gift | undefined>}
	 * @abstract
	 */
	findByGuestIdAndItem(guestId, itemId) {
		throw new Error('Abstract method');
	}
}