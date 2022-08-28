alter table Guest drop column number_of_escorts;

create table if not exists Escort(
	guest_id int not null,
	name varchar(100) not null,
	primary key(guest_id,name),
	constraint fk_escort_guest foreign key(guest_id) references Guest(id) on delete cascade on update cascade
);

create index escort_guest_id_indx on Escort(guest_id);