// @ts-check

/**
 * @typedef {import("../../domain/entities/Guest.mjs").Guest} Guest
 */

export class GuestsRepository {
	/**
	 * @abstract
	 * @arg {string} guestId
	 * @arg {boolean} confirmed
	 * @returns {Promise<void>}
	 */
	updateConfirmation(guestId, confirmed) {
		throw new Error("Abstract method");
	}

	/**
	 * @abstract
	 * @arg {string} guestId
	 * @returns {Promise<Guest | undefined>}
	 */
	findById(guestId) {
		throw new Error("Abstract method");
	}
}