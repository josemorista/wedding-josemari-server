// @ts-check

export class Guest {
	/**
	 * @arg {Guest} details
	 */
	constructor(
		details
	) {
		/**
		 * @type {number}
		 */
		this.id = details.id;
		/**
		 * @type {string}
		 */
		this.name = details.name;
		/**
		 * @type {boolean}
		 */
		this.confirmed = details.confirmed !== undefined ? details.confirmed : false;

		/**
		 * @type {number}
		 */
		this.numberOfChildren = details.numberOfChildren || 0;

		/**
		 * @type {number}
		 */
		this.numberOfEscorts = details.numberOfEscorts || 0;
	}
}