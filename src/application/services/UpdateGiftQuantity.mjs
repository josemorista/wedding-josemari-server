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

		const gift = await this.giftsRepository.findByGuestIdAndItem(guestId, itemId);
		if (!gift) throw new Error("Gift not found");

		if (gift.quantity < quantity && (gift.item.quantityAvailableToGive + gift.quantity < quantity)) {
			throw new Error("Invalid quantity");
		}

		if (quantity <= 0) {
			await this.giftsRepository.delete(guestId, itemId);
		} else {
			await this.giftsRepository.updateQuantity(guestId, itemId, quantity);
		}

		await this.itemsRepository.updateAvailableQuantity(itemId,
			gift.item.quantityAvailableToGive + gift.quantity - quantity
		);
	}
}