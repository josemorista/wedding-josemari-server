// @ts-check

/**
 * 
 * @param {import("restify").Request} request 
 * @param {import("restify").Response} response 
 * @param {import("restify").Next} next 
 */
export const ensureAuthentication = (request, response, next) => {
	if (!request.headers.authorization) {
		response.statusCode = 403;
		return response.json({
			error: "Missing authorization header"
		});
	}
	return next();
};