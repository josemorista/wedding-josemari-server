// @ts-check

import jwt from "jsonwebtoken";
import { AUTH_SECRET, AUTH_EXPIRATION } from "../../config/auth.mjs";

/**
 * @typedef {import("../factories/RepositoriesFactory.mjs").RepositoriesFactory} RepositoriesFactory
 */

export class Login {
	/**
	 * @arg {RepositoriesFactory} repositoriesFactory
	 */
	constructor(repositoriesFactory) {
		this.guestsRepository = repositoriesFactory.createGuestsRepository();
	}

	/**
	 * 
	 * @param {string} name 
	 */
	async execute(name) {
		const guest = await this.guestsRepository.findByName(name);
		if (!guest) throw new Error("Guest not found");
		const token = jwt.sign({
			name: guest.name,
			confirmed: guest.confirmed
		}, AUTH_SECRET, {
			subject: String(guest.id),
			expiresIn: AUTH_EXPIRATION
		});
		return {
			authToken: token,
			guest
		};
	}
}