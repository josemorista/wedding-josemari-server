// @ts-check

import { Login } from '../../../services/Login.mjs';
import { PgRepositoriesFactory } from '../../pg/factories/PgRepositoriesFactory.mjs';
import { SlsResponse } from '../entities/SlsResponse';

const login = new Login(new PgRepositoriesFactory());

export const handle = async (event) => {
	try {
		const body = JSON.parse(event.body);
		return new SlsResponse(await login.execute(body.name), 200);
	} catch (error) {
		console.error(error);
		return new SlsResponse({
			error: error.message
		}, 400);
	}
};