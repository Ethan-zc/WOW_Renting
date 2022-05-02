-- insert to order
SET FOREIGN_KEY_CHECKS = 0;
truncate table zzz_order;
truncate table zzz_invoice;
SET FOREIGN_KEY_CHECKS = 1;

select * from zzz_customer;
select * from zzz_discount;
select * from zzz_disccorp;

insert into zzz_order (startodo, endodo, odolimit, startdate, enddate, custid, custtype, pickup, dropoff, carid, discid, disctype)
values
(1000, null, 40, '2020-03-01', '2020-03-05', 1, 'I', 2, 3, 1, 1, null),
(1000, null, 40, '2020-03-01', '2020-03-05', 1, 'I', 2, 3, 1, 1, null),
(1000, null, null, '2020-03-01', '2020-03-05', 1, 'I', 2, 3, 1, 1, null),
(1000, null, 40, '2020-03-01', '2020-03-05', 1, 'I', 2, 3, 1, 1, 'I'),
(1000, null, 40, '2021-07-01', '2021-07-05', 1, 'I', 2, 3, 1, 4, 'I'),
(1000, null, 40, '2021-07-01', '2021-07-05', 6, 'C', 2, 3, 1, 8, 'C');

update zzz_order set endodo=1100 where orderid=1; -- 4
update zzz_order set endodo=1500 where orderid=2; -- 17004
update zzz_order set endodo=1500 where orderid=3; -- 4
update zzz_order set endodo=1500 where orderid=4; -- 17004
update zzz_order set endodo=1500 where orderid=5; -- 17004 * 0.8 = 13603.2
update zzz_order set endodo=1500 where orderid=6; -- 17004 * 0.6 = 10202.4


update zzz_order set endodo=1200 where orderid=1234568; -- 2004
select * from zzz_order;
select * from zzz_invoice;


-- insert data to payment
show columns from zzz_payment;
insert into zzz_payment (payid, method, amount, paydate, cardnum, invoiceid)
values
();

-- test auto increment
drop table zzz_address;
insert into zzz_address (street, state, country, zipcode)
values
('A St', 'NY', 'USA', '10001'),
('B St', 'NY', 'USA', '10002');
select * from zzz_address;


