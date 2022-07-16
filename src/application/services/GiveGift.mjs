// @ts-check

import { Gift } from "../../domain/entities/Gift.mjs";

/**
 * @typedef {import("../factories/RepositoriesFactory.mjs").RepositoriesFactory} RepositoriesFactory
 */

export class GiveGift {
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

		let gift = await this.giftsRepository.findByGuestIdAndItem(guestId, itemId);

		if (!gift) {
			gift = new Gift({
				guestId,
				item,
				quantity
			});
			await this.giftsRepository.save(gift);
		} else {
			gift.quantity = gift.quantity + quantity;
			await this.giftsRepository.updateQuantity(guestId, itemId, gift.quantity);
		}

		await this.itemsRepository.updateAvailableQuantity(item.id,
			item.quantityAvailableToGive - quantity
		);
	}
}