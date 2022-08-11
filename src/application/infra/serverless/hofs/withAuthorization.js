// @ts-check
import { SlsResponse } from '../entities/SlsResponse';

import jwt from 'jsonwebtoken';
import { AUTH_SECRET } from '../../../../config/auth.mjs';

export const withAuthorization = cb => {
	return async (event, ctx) => {
		if (!event.headers['Authorization']) {
			return new SlsResponse({
				error: 'Missing authorization header'
			}, 403);
		}
		const [bearer, token] = event.headers['Authorization'].split(' ');
		if (bearer !== 'Bearer') {
			return new SlsResponse({
				error: 'Bad formatted token'
			}, 403);
		}
		try {
			/**
			 * @type {any}
			 */
			const decoded = jwt.verify(token, AUTH_SECRET);
			event.guestId = parseInt(decoded.sub);
			return await cb(event, ctx);
		} catch (error) {
			return new SlsResponse({
				error: 'Unauthorized'
			}, 403);
		}
	};
};