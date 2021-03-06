// @ts-check

import { Login } from "../../../services/Login.mjs";
import { RestifyController } from "./RestifyController.mjs";
import { MySQLRepositoriesFactory } from "../../mysql/factories/MySQLRepositoriesFactory.mjs";

export class LoginController extends RestifyController {
	constructor() {
		super();
		this.loginService = new Login(new MySQLRepositoriesFactory());
	}

	/**
	 * 
	 * @type {RestifyController["handle"]}
	 */
	async handle(request, response) {
		try {
			const { name } = request.body;
			return response.json(await this.loginService.execute(name));
		} catch (error) {
			console.error(error);
			response.statusCode = 400;
			return response.json({
				error: error.message
			});
		}

	}
}