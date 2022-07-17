// @ts-check

import { MySQLRepositoriesFactory } from "./application/infra/mysql/factories/MySQLRepositoriesFactory.mjs";
import { ToggleGuestConfirmation } from "./application/services/ToggleGuestConfirmation.mjs";
import { GiveGift } from "./application/services/GiveGift.mjs";
import { UpdateGiftQuantity } from "./application/services/UpdateGiftQuantity.mjs";

import { ListGiftOptions } from "./query/ListGiftOptions/ListGiftOptions.mjs";

const repoFactory = new MySQLRepositoriesFactory();

const toggleConfirm = new ToggleGuestConfirmation(repoFactory);
const query = new ListGiftOptions();

const updateGiftQuantity = new UpdateGiftQuantity(repoFactory);
const giveGift = new GiveGift(repoFactory);

giveGift.execute({
	itemId: "i1",
	guestId: "1",
	quantity: 2
}).then(() => {
	query.execute().then((options) => {
		console.log(options);
		console.log(options[0].history);
		process.exit();
	});
});

updateGiftQuantity.execute({
	itemId: "i1",
	guestId: "1",
	quantity: 0
}).then(() => {
	query.execute().then((options) => {
		console.log(options);
		process.exit();
	});
});

toggleConfirm.execute("1").then(() => {
	process.exit();
});
