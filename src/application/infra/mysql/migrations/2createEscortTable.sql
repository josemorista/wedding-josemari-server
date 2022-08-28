alter table Guest drop column numberOfEscorts;

create table if not exists Escort(
	guestId int not null,
	name varchar(100) not null,
	primary key(guestId,name),
	constraint fk_escort_guest foreign key(guestId) references Guest(id) on delete cascade on update cascade
);

create index escort_guest_id_indx on Escort(guestId);