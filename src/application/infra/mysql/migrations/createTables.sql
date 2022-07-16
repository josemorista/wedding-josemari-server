create table if not exists Guest (
	id varchar(36) primary key not null,
	name varchar(100) not null unique,
	confirmed bool not null default false
) default charset='UTF8MB4';

create table if not exists Item (
	id varchar(36) primary key not null,
	name varchar(100) not null,
	picture varchar(50) not null,
	quantityAvailableToGive smallint unsigned not null default 1,
	quantityNeeded smallint unsigned not null default 1 
) default charset='utf8mb4';

create table if not exists Gift (
	guestId varchar(36) not null,
	itemId varchar(36) not null,
	quantity smallint unsigned not null,
	constraint fk_gift_guest foreign key(guestId) references Guest(id) on delete cascade on update cascade,
	constraint fk_gift_item foreign key(itemId) references Item(id) on delete cascade on update cascade,
	primary key(guestId,itemId)
) default charset='utf8mb4';
