-- update endOdo
update zzz_order set endodo=1100 where orderid=1; -- 4
update zzz_order set endodo=1500 where orderid=2; -- 17004
update zzz_order set endodo=1500 where orderid=3; -- 4
update zzz_order set endodo=1500 where orderid=4; -- 17004
update zzz_order set endodo=1500 where orderid=5; -- 17004 * 0.8 = 13603.2
update zzz_order set endodo=1500 where orderid=6; -- 17004 * 0.6 = 10202.4

select * from zzz_account;
select * from zzz_discindi;
select * from zzz_customer;
select * from zzz_individual;
select * from zzz_order;
select * from zzz_invoice;

-- TODO: payment
-- insert data to payment
show columns from zzz_payment;
insert into zzz_payment (payid, method, amount, paydate, cardnum, invoiceid)
values
();



