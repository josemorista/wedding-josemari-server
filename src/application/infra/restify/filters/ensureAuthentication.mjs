// @ts-check

import jwt from 'jsonwebtoken';
import { AUTH_SECRET } from '../../../../config/auth.mjs';

/**
 *
 * @param {import("../controllers/RestifyController.mjs").Request} request
 * @param {import("restify").Response} response
 */
export const ensureAuthentication = async (request, response) => {
	if (!request.headers.authorization) {
		response.json(403, {
			error: 'Missing authorization header',
		});
		return;
	}

	const [bearer, token] = request.headers.authorization.split(' ');
	if (bearer !== 'Bearer') {
		response.json(403, {
			error: 'Bad formatted token',
		});
		return;
	}
	try {
		/**
		 * @type {any}
		 */
		const decoded = jwt.verify(token, AUTH_SECRET);
		request.guestId = parseInt(decoded.sub);
	} catch (error) {
		response.json(401, {
			error: 'Unauthorized',
		});
	}
};
