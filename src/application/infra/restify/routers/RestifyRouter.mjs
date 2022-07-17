// @ts-check

export class RestifyRouter {
	/**
	 * @abstract
	 * @param {import("restify").Server} server 
	 */
	register(server) {
		throw new Error("Not implemented");
	}
}