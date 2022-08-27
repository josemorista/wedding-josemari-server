// @ts-check

/**
 * @typedef {import("../../domain/entities/Guest.mjs").Guest} Guest
 */

export class GuestsRepository {
	/**
	 * @abstract
	 * @arg {number} guestId
	 * @arg {Omit<Guest, 'id' | 'name' | 'addEscort'>} updateGuestDTO
	 * @returns {Promise<void>}
	 */
	updateGuest(guestId, updateGuestDTO) {
		throw new Error('Abstract method');
	}

	/**
	 * @abstract
	 * @arg {number} guestId
	 * @returns {Promise<Guest | undefined>}
	 */
	findById(guestId) {
		throw new Error('Abstract method');
	}

	/**
	 * @abstract
	 * @arg {string} name
	 * @returns {Promise<Guest | undefined>}
	 */
	findByName(name) {
		throw new Error('Abstract method');
	}
}
