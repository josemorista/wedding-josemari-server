// @ts-check
import { RepositoriesFactory } from '../../../factories/RepositoriesFactory.mjs';
import { MySQLConnection } from '../MySQLConnection.mjs';
import { MySQLGiftsRepository } from '../repositories/MySQLGiftsRepository.mjs';
import { MySQLGuestsRepository } from '../repositories/MySQLGuestsRepository.mjs';
import { MySQLItemsRepository } from '../repositories/MySQLItemsRepository.mjs';


export class MySQLRepositoriesFactory extends RepositoriesFactory {
	constructor() {
		super();
		this.connection = MySQLConnection.getInstance();
	}

	createGiftsRepository() {
		return new MySQLGiftsRepository(this.connection);
	}

	createGuestsRepository() {
		return new MySQLGuestsRepository(this.connection);
	}

	createItemsRepository() {
		return new MySQLItemsRepository(this.connection);
	}
}