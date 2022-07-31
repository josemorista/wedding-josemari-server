// @ts-check

import { ToggleGuestConfirmation } from "../../../services/ToggleGuestConfirmation.mjs";
import { RestifyController } from "./RestifyController.mjs";
import { PgRepositoriesFactory } from "../../pg/factories/PgRepositoriesFactory.mjs";

export class ToggleGuestConfirmationController extends RestifyController {
	constructor() {
		super();
		this.toggleGuestService = new ToggleGuestConfirmation(new PgRepositoriesFactory());
	}

	/**
	 * 
	 * @type {RestifyController["handle"]}
	 */
	async handle(request, response) {
		try {
			await this.toggleGuestService.execute(request.guestId || -1);
			response.statusCode = 204;
			return response.send();
		} catch (error) {
			console.error(error);
			response.statusCode = 400;
			return response.json({
				error: error.message
			});
		}

	}
}