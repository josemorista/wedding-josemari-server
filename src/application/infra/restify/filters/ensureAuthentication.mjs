// @ts-check

/**
 * 
 * @param {import("restify").Request} request 
 * @param {import("restify").Response} response 
 * @param {import("restify").Next} next 
 */
export const ensureAuthentication = (request, response, next) => {
	if (!request.headers.authorization) {
		return response.json(403, {
			error: "Missing authorization header"
		});
	}
	return next();
};