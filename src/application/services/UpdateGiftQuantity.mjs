// @ts-check
/**
 * @typedef {import("../factories/RepositoriesFactory.mjs").RepositoriesFactory} RepositoriesFactory
 */

export class CancelGift {
	/**
	 * @arg {RepositoriesFactory} repositoriesFactory
	 */
	constructor(
		repositoriesFactory
	) {
		this.itemsRepository = repositoriesFactory.createItemsRepository();
		this.guestsRepository = repositoriesFactory.createGuestsRepository();
		this.giftsRepository = repositoriesFactory.createGiftsRepository();
	}

	/**
	 * @arg {{itemId: string, guestId: string, quantity: number}} input
	 */
	async execute({ itemId, guestId, quantity }) {
		const guest = await this.guestsRepository.findById(guestId);
		if (!guest) throw new Error("Guest not found");

		const item = await this.itemsRepository.findById(itemId);
		if (!item) throw new Error("Item not found");

		const gift = await this.giftsRepository.findByGuestIdAndItem(guestId, itemId);
		if (!gift) throw new Error("Gift not found");

		if (quantity <= 0) {
			await this.giftsRepository.delete(guestId, itemId);
		} else {
			await this.giftsRepository.updateQuantity(guestId, itemId, quantity);
		}

		await this.itemsRepository.updateAvailableQuantity(itemId,
			item.quantityAvailableToGive + gift.quantity - quantity
		);
	}
}