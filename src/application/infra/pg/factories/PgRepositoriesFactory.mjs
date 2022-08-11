// @ts-check
import { RepositoriesFactory } from '../../../factories/RepositoriesFactory.mjs';
import { PgConnection } from '../PgConnection.mjs';
import { PgGiftsRepository } from '../repositories/PgGiftsRepository.mjs';
import { PgGuestsRepository } from '../repositories/PgGuestsRepository.mjs';
import { PgItemsRepository } from '../repositories/PgItemsRepository.mjs';


export class PgRepositoriesFactory extends RepositoriesFactory {
	constructor() {
		super();
		this.connection = PgConnection.getInstance();
	}

	createGiftsRepository() {
		return new PgGiftsRepository(this.connection);
	}

	createGuestsRepository() {
		return new PgGuestsRepository(this.connection);
	}

	createItemsRepository() {
		return new PgItemsRepository(this.connection);
	}
}