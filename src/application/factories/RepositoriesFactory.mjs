// @ts-check

/**
 * @typedef {import("../repositories/GuestsRepository.mjs").GuestsRepository} GuestsRepository
 * @typedef {import("../repositories/ItemsRepository.mjs").ItemsRepository} ItemsRepository
 * @typedef {import("../repositories/GiftsRepository.mjs").GiftsRepository} GiftsRepository
 */

export class RepositoriesFactory {
	/**
	 * @returns {ItemsRepository}
	 * @abstract
	 */
	createItemsRepository() {
		throw new Error('Abstract method');
	}

	/**
	 * @returns {GuestsRepository}
	 * @abstract
	 */
	createGuestsRepository() {
		throw new Error('Abstract method');
	}

	/**
	 * @returns {GiftsRepository}
	 * @abstract
	 */
	createGiftsRepository() {
		throw new Error('Abstract method');
	}
}