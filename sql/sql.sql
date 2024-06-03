create table transferencias (id serial primary key, description varchar (50), date timestamp with time zone not null default now(),
amount int not null default 0, debit_account int, credit_acount int);

create table cuenta (
id serial primary key,
number_account int,
balance numeric(8, 2) check(balance >= 0));