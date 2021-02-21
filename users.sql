create table users (
    user_id serial PRIMARY KEY,
    first_name text,
    last_name text,
    email text,
    age int
);

create index concurrently "idx_first_name" on users using btree (first_name);
create index concurrently "idx_last_name" on users using btree (last_name);

insert into users (first_name, last_name, email, age) values ('Hayden', 'Gibbons', 'hayden.c.gibbons@gmail.com', 18);
insert into users (first_name, last_name, email, age) values ('Chris', 'Gibbons', 'chris.gibbons@gmail.com', 50);
insert into users (first_name, last_name, email, age) values ('Logan', 'Anderson', 'logan.anderson@gmail.com', 17);
insert into users (first_name, last_name, email, age) values ('Karlie', 'Rawlings', 'karlie.rawlings@gmail.com', 18);
insert into users (first_name, last_name, email, age) values ('Amanda', 'Keller', 'amanda.keller@gmail.com', 18);
insert into users (first_name, last_name, email, age) values ('Jaxon', 'Keller', 'jaxon.keller@gmail.com', 18);
insert into users (first_name, last_name, email, age) values ('Mason', 'Keller', 'mason.keller@gmail.com', 18);
insert into users (first_name, last_name, email, age) values ('Carson', 'Keller', 'carson.keller@gmail.com', 18);
insert into users (first_name, last_name, email, age) values ('Nate', 'Hadlock', 'nate.hadlock@gmail.com', 18);
insert into users (first_name, last_name, email, age) values ('Sarah', 'Holt', 'sarah.holt@gmail.com', 18);
