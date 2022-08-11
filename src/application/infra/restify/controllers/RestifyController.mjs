// @ts-check

/**
 * @typedef {import("restify").Request & {guestId?: number}} Request
 */

export class RestifyController {

	constructor() {
		this.handle = this.handle.bind(this);
	}

	/**
	 * @abstract
	 * @param {Request} request 
	 * @param {import("restify").Response} response 
	 * @param {import("restify").Next} next 
	 * @returns {Promise<void>}
	 */
	handle(request, response, next) {
		throw new Error('Abstract method');
	}
}