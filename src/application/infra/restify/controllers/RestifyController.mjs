// @ts-check

export class RestifyController {

	constructor() {
		this.handle = this.handle.bind(this);
	}

	/**
	 * @abstract
	 * @param {import("restify").Request} request 
	 * @param {import("restify").Response} response 
	 * @param {import("restify").Next} next 
	 * @returns {Promise<void>}
	 */
	handle(request, response, next) {
		throw new Error("Abstract method");
	}
}