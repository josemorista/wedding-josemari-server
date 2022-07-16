// @ts-check
/**
 * @typedef {import("../factories/RepositoriesFactory.mjs").RepositoriesFactory} RepositoriesFactory
 */

export class DropGift {
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
	 * @arg {{itemId: string, guestId: string, quantityToDrop: number}} input
	 */
	async execute({ itemId, guestId, quantityToDrop }) {
		const guest = await this.guestsRepository.findById(guestId);
		if (!guest) throw new Error("Guest not found");
		const item = await this.itemsRepository.findById(itemId);
		if (!item) throw new Error("Item not found");

		const gift = await this.giftsRepository.findByGuestIdAndItem(guestId, itemId);
		if (!gift) throw new Error("Gift not found");

		const newQuantity = gift.quantity - quantityToDrop;

		if (newQuantity <= 0) await this.giftsRepository.delete(guestId, itemId);
		else
			await this.giftsRepository.updateQuantity(guestId, itemId, newQuantity);

		await this.itemsRepository.updateAvailableQuantity(itemId,
			item.quantityAvailableToGive + quantityToDrop
		);
	}
}