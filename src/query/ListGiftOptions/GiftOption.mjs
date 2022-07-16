// @ts-check

export class GiftOption {
	/**
	 * 
	 * @arg {{itemId: string, name: string, picture: string, quantityRequested: number, quantityAvailableToGive: number}} details
	 */
	constructor(
		{ itemId,
			name,
			picture,
			quantityRequested,
			quantityAvailableToGive }
	) {
		this.itemId = itemId;
		this.name = name;
		this.picture = picture;
		this.quantityRequested = quantityRequested;
		this.quantityAvailableToGive = quantityAvailableToGive;

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