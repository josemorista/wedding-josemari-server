// @ts-check

import { UpdateGuest } from "../../../services/UpdateGuest.mjs";
import { RestifyController } from "./RestifyController.mjs";
import { PgRepositoriesFactory } from "../../pg/factories/PgRepositoriesFactory.mjs";

export class UpdateGuestController extends RestifyController {
	constructor() {
		super();
		this.toggleGuestService = new UpdateGuest(new PgRepositoriesFactory());
	}

	/**
	 * 
	 * @type {RestifyController["handle"]}
	 */
	async handle(request, response) {
		try {
			await this.toggleGuestService.execute(request.guestId || 0, request.body);
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