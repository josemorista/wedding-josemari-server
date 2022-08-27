// @ts-check

/**
 * @typedef {import("../factories/RepositoriesFactory.mjs").RepositoriesFactory} RepositoriesFactory
 * @typedef {import("../../domain/entities/Guest.mjs").Guest} Guest
 * @typedef {Partial<Pick<Guest, 'confirmed' | 'numberOfChildren' | 'escorts'>>} UpdateGuestInput
 */

export class UpdateGuest {
	/**
	 * @arg {RepositoriesFactory} repositoriesFactory
	 */
	constructor(repositoriesFactory) {
		this.guestsRepository = repositoriesFactory.createGuestsRepository();
	}

	/**
	 *
	 * @param {number} guestId
	 * @param {UpdateGuestInput} updateGuestInput
	 */
	async execute(guestId, updateGuestInput) {
		const guest = await this.guestsRepository.findById(guestId);
		if (!guest) throw new Error('Guest not found');
		if (updateGuestInput.escorts && updateGuestInput.escorts.length > 1) throw new Error('Invalid escorts quantity');
		await this.guestsRepository.updateGuest(guest.id, {
			...guest,
			...updateGuestInput,
		});
	}
}
