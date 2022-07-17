// @ts-check

export class GiftOption {
	/**
	 * 
	 * @arg {{itemId: string, name: string, picture: string, quantityNeeded: number, quantityAvailableToGive: number}} details
	 */
	constructor(
		{ itemId,
			name,
			picture,
			quantityNeeded,
			quantityAvailableToGive }
	) {
		this.itemId = itemId;
		this.name = name;
		this.picture = picture;
		this.quantityNeeded = quantityNeeded;
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