create table if not exists Guest (
	id int primary key not null auto_increment,
	name varchar(100) not null unique,
	confirmed bool not null default false,
	numberOfChildren smallint not null default 0,
	numberOfEscorts smallint not null default 0
) default charset='UTF8MB4';

create table if not exists Item (
	id int primary key not null auto_increment,
	name varchar(100) not null,
	picture varchar(50) not null,
	quantityAvailableToGive smallint unsigned not null default 1,
	quantityNeeded smallint unsigned not null default 1,
	suggestedSeller varchar(2000),
	averagePrice float not null
) default charset='utf8mb4';

create table if not exists Gift (
	guestId int not null,
	itemId int not null,
	quantity smallint unsigned not null,
	constraint fk_gift_guest foreign key(guestId) references Guest(id) on delete cascade on update cascade,
	constraint fk_gift_item foreign key(itemId) references Item(id) on delete cascade on update cascade,
	primary key(guestId,itemId)
) default charset='utf8mb4';
