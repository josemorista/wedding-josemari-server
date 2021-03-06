// @ts-check

import jwt from "jsonwebtoken";
import { AUTH_SECRET } from "../../../../config/auth.mjs";

/**
 * 
 * @param {import("../controllers/RestifyController.mjs").Request} request 
 * @param {import("restify").Response} response 
 * @param {import("restify").Next} next 
 */
export const ensureAuthentication = (request, response, next) => {
	if (!request.headers.authorization) {
		return response.json(403, {
			error: "Missing authorization header"
		});
	}

	const [bearer, token] = request.headers.authorization.split(" ");
	if (bearer !== "Bearer") {
		return response.json(403, {
			error: "Bad formatted token"
		});
	}
	try {
		/**
		 * @type {any}
		 */
		const decoded = jwt.verify(token, AUTH_SECRET);
		request.guestId = decoded.sub;
		return next();
	} catch (error) {
		return response.json(401, {
			error: "Unauthorized"
		});
	}

};