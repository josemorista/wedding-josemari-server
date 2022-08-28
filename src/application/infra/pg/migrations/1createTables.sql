create table if not exists Guest (
	id serial primary key not null,
	name varchar(100) not null unique,
	confirmed bool not null default false,
	number_of_children smallint not null default 0,
	number_of_escorts smallint not null default 0
);

create table if not exists Item (
	id serial primary key not null,
	name varchar(100) not null,
	picture varchar(50) not null,
	quantity_available_to_give smallint not null default 1,
	quantity_needed smallint not null default 1
);

create table if not exists Gift (
	guest_id int not null,
	item_id int not null,
	quantity smallint not null,
	constraint fk_gift_guest foreign key(guest_id) references Guest(id) on delete cascade on update cascade,
	constraint fk_gift_item foreign key(item_id) references Item(id) on delete cascade on update cascade,
	primary key(guest_id,item_id)
);