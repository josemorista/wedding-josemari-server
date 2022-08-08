// @ts-check

/**
 * @typedef {import("../../domain/entities/Item.mjs").Item} Item
 */

export class GiftOption {
	/**
	 * 
	 * @arg {Item} details
	 */
	constructor(
		{ id,
			name,
			picture,
			quantityNeeded,
			quantityAvailableToGive,
			averagePrice,
			suggestedSeller }
	) {
		this.itemId = id;
		this.name = name;
		this.picture = picture;
		this.quantityNeeded = quantityNeeded;
		this.quantityAvailableToGive = quantityAvailableToGive;
		this.averagePrice = averagePrice;
		this.suggestedSeller = suggestedSeller;

		/**
		 * @type {Array<{guestId: string, quantity: number}>}
		 */
		this.history = [];
	}


	addToGiftHistory(guestId, quantity) {
		this.history.push({
			guestId,
			quantity
		});
	}
}