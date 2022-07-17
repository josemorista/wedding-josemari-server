// @ts-check

import { ToggleGuestConfirmation } from "../../../services/ToggleGuestConfirmation.mjs";
import { RestifyController } from "./RestifyController.mjs";
import { MySQLRepositoriesFactory } from "../../mysql/factories/MySQLRepositoriesFactory.mjs";

export class ToggleGuestConfirmationController extends RestifyController {
	constructor() {
		super();
		this.toggleGuestService = new ToggleGuestConfirmation(new MySQLRepositoriesFactory());
	}

	/**
	 * 
	 * @type {RestifyController["handle"]}
	 */
	async handle(request, response, next) {
		try {
			const { guestId } = request.body;
			await this.toggleGuestService.execute(guestId);
			response.statusCode = 204;
			return next();
		} catch (error) {
			console.error(error);
			response.statusCode = 400;
			return response.json({
				error: error.message
			});
		}

	}
}