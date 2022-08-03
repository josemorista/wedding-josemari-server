export class SlsResponse {
	/**
	 * 
	 * @param {unknown} body 
	 * @param {number} status
	 * @param {Record<string, string>} headers
	 */
	constructor(body, status = 200, headers = {}) {
		/**
		 * @type {string}
		 */
		this.body = body && JSON.stringify(body);
		/**
		 * @type {number}
		 */
		this.statusCode = status;
		/**
		 * @type {Record<string, string>}
		 */
		this.headers = {
			...headers,
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Credentials": true
		};
	}
}