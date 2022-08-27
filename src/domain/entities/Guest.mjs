// @ts-check

import { Escort } from './Escort.mjs';
export class Guest {
	/**
	 * @arg {Omit<Guest, 'escorts' | 'addEscort'>} details
	 */
	constructor(details) {
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
		this.confirmed =
			details.confirmed !== undefined ? details.confirmed : false;

		/**
		 * @type {number}
		 */
		this.numberOfChildren = details.numberOfChildren || 0;

		/**
		 * @type{Array<Escort>}
		 */
		this.escorts = [];
	}

	/**
	 *
	 * @param {string} name
	 */
	addEscort(name) {
		this.escorts.push(new Escort(name));
	}
}
