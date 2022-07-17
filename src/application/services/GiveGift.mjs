// @ts-check

import { Gift } from "../../domain/entities/Gift.mjs";
import { CACHE_KEYS } from "../../config/cache.mjs";

/**
 * @typedef {import("../factories/RepositoriesFactory.mjs").RepositoriesFactory} RepositoriesFactory
 */

export class GiveGift {
	/**
	 * @arg {import("cache-service-lib").CacheService} cacheService
	 * @arg {RepositoriesFactory} repositoriesFactory
	 */
	constructor(
		cacheService,
		repositoriesFactory
	) {
		this.cacheService = cacheService;
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
		if (gift) throw new Error("Gift already exists");

		gift = new Gift({
			guestId,
			item,
			quantity
		});

		if (gift.quantity > item.quantityAvailableToGive) throw new Error("Invalid quantity");

		await this.giftsRepository.save(gift);
		await this.itemsRepository.updateAvailableQuantity(item.id,
			item.quantityAvailableToGive - quantity
		);

		await this.cacheService.del(CACHE_KEYS.GIFT_OPTIONS);
	}
}