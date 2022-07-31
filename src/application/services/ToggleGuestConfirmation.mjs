// @ts-check

/**
 * @typedef {import("../factories/RepositoriesFactory.mjs").RepositoriesFactory} RepositoriesFactory
 */

export class ToggleGuestConfirmation {
	/**
	 * @arg {RepositoriesFactory} repositoriesFactory
	 */
	constructor(repositoriesFactory) {
		this.guestsRepository = repositoriesFactory.createGuestsRepository();
	}

	/**
	 * 
	 * @param {number} guestId 
	 */
	async execute(guestId) {
		const guest = await this.guestsRepository.findById(guestId);
		if (!guest) throw new Error("Guest not found");
		await this.guestsRepository.updateConfirmation(guest.id, !guest.confirmed);
	}
}