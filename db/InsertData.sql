-- insert data to address
insert into zzz_address (street, state, country, zipcode)
values
('A St', 'NY', 'USA', '10001'),
('B St', 'NY', 'USA', '10002'),
('C St', 'PA', 'USA', '15003'),
('D St', 'PA', 'USA', '15004'),
('E St', 'CA', 'USA', '94043'),
('F St', 'CA', 'USA', '94086'),
('G St', 'CA', 'USA', '94089'),
('H St', 'MI', 'USA', '48228'),
('I St', 'MI', 'USA', '48103'),
('J St', 'NJ', 'USA', '07097'),
('K St', 'MA', 'USA', '02139'),
('L St', 'MA', 'USA', '02138'),
('M St', 'MA', 'USA', '02137'),
('N St', 'MA', 'USA', '01604'),
('O St', 'FL', 'USA', '33125'),
('P St', 'FL', 'USA', '33027'),
('Q St', 'FL', 'USA', '32244'),
('R St', 'FL', 'USA', '32808'),
('S St', 'WA', 'USA', '98101'),
('T St', 'WA', 'USA', '98102'),
('O St', 'WA', 'USA', '98004'),
('P St', 'WA', 'USA', '98005'),
('Q St', 'WA', 'USA', '98006'),
('R St', 'WA', 'USA', '98007');

-- insert data to office
insert into zzz_office (phone, addrid)
values
('(123)-456-789', 1),
('(677)-142-124', 2),
('(456)-634-565', 3),
('(535)-645-089', 4),
('(543)-579-019', 5),
('(082)-977-984', 6),
('(973)-234-893', 7),
('(279)-937-761', 8),
('(769)-733-173', 9),
('(692)-763-182', 10),
('(738)-123-918', 11),
('(162)-472-867', 12);

-- insert data to vehicle
insert into zzz_vehicle (vin, make, model, year, lpn)
values
('299J98JSJIW19923I', 'Volvo', 'Golf', 2001, '123989828'),
('28WHDJW92U939282', 'Honda', 'Acura', 2020, '123899233'),
('894739JUHE2932', 'General', 'Buick', 2003, '123719232'),
('283DWJEHBDU12', 'Toyota', 'Lexus', 2010, '12389SH23'),
('1231283DHUIHU', 'Ford', 'Lincoln', 2012, 'UH198929'),
('HIH289389223', 'Mazda', 'Mazda', 2015, 'HUUE97283'),
('PEI893904212', 'BMW', 'Mini', 2013, 'JIH172HU1'),
('838HIDN8929321', 'Stellantis', 'Ram', 2000, 'GHJDU288'),
('EIWDODO123871', 'BMW', 'Rolls-Royce', 2012, 'UD72JDS'),
('19HDHJ929391', 'Subaru', 'Subaru', 2014, 'DUU1738HJD'),
('BDU12378492112', 'Tesla', 'Tesla', 2020, '89273HJHA');

-- insert data to car
insert into zzz_car (cartype, dailyrate, overrate, officeid, vin, imgurl)
values
('small car', 1.0, 50.0, 1, '299J98JSJIW19923I', 'https://media.zipcar.com/images/model-image?model_id=64790058'),
('mid-size car', 78.28, 10.29, 2, '28WHDJW92U939282', 'https://media.zipcar.com/images/model-image?model_id=94567'),
('luxury car', 28.17, 29.29, 3, '894739JUHE2932','https://media.zipcar.com/images/model-image?model_id=1651832377'),
('SUV', 92.12, 82.23, 4, '283DWJEHBDU12','https://media.zipcar.com/images/model-image?model_id=2297323015'),
('Premium SUV', 19.29, 28.39, 5, '1231283DHUIHU','https://media.zipcar.com/images/model-image?model_id=475722000'),
('Mini Van', 12.23, 34.72, 6, 'HIH289389223','https://media.zipcar.com/images/model-image?model_id=64790058'),
('Station Wagon', 49.38, 19.3, 7, 'PEI893904212','https://media.zipcar.com/images/model-image?model_id=94567'),
('small car',28.34,20.0, 8, '838HIDN8929321','https://media.zipcar.com/images/model-image?model_id=94567'),
('Premium SUV', 72.83, 22.92, 9, 'EIWDODO123871','https://media.zipcar.com/images/model-image?model_id=1651832377'),
('Station Wagon', 48.20, 29.32, 10,'19HDHJ929391','https://media.zipcar.com/images/model-image?model_id=475722000'),
('SUV', 23.12, 28.23, 11, 'BDU12378492112','https://media.zipcar.com/images/model-image?model_id=64790058');

-- insert data to customer
insert into zzz_customer (custtype, email, phone, addrid)
values
('I', 'erte@nyu.edu', '(162)-472-844', 13),
('I', 'cxbd@nyu.edu', '(162)-472-845', 14),
('I', 'yijj@nyu.edu', '(162)-472-846', 15),
('I', 'cvfh@nyu.edu', '(162)-472-847', 16),
('I', 'nyif@nyu.edu', '(162)-472-848', 17),
('C', 'xcxg@nyu.edu', '(162)-472-849', 18),
('C', 'iygj@nyu.edu', '(162)-472-850', 19),
('C', 'xzzz@nyu.edu', '(162)-472-851', 20),
('C', 'oyou@nyu.edu', '(162)-472-852', 21),
('C', 'bnfg@nyu.edu', '(162)-472-853', 22);

-- insert data to individual
insert into zzz_individual (custid, custtype, lname, fname, licensenum, insname, insnum)
values
(1, 'I', 'Smith', 'Jack', '218984751', 'Good Insurance', 36571),
(2, 'I', 'Will', 'Lily', '218984752', 'Better Insurance', 36572),
(3, 'I', 'Wade', 'Micheal', '218984753', 'Awesome Insurance', 36573),
(4, 'I', 'Green', 'Tom', '218984754', 'Cool Insurance', 36574),
(5, 'I', 'Gates', 'Jessie', '218984755', 'Nice Insurance', 36575);

-- insert data to corporate
insert into zzz_corporate (custid, custtype, corpname, regnum, empid)
values
(6, 'C', 'Amazon', 'amz123', 'amz456'),
(7, 'C', 'Google', 'gg123', 'gg456'),
(8, 'C', 'Meta', 'fb123', 'fb456'),
(9, 'C', 'Apple', 'apple123', 'apple456'),
(10, 'C', 'Linkedin', 'ln123', 'ln456');

-- insert data to discounts
insert into zzz_discount (disctype, discpercen)
values
('I', 30),
('I', 34),
('I', 38),
('I', 20),
('I', 21),
('I', 30),
('I', 39),
('C', 40),
('C', 44),
('C', 48),
('C', 30),
('C', 31),
('C', 40),
('C', 49);

-- insert data to discindi
insert into zzz_discindi (discid, disctype, validstart, validend, coupnum)
values
(1, 'I', '2022-03-03', '2022-03-31', 9675731),
(2, 'I', '2022-02-01', '2022-03-01', 5760897),
(3, 'I', '2019-05-31', '2019-06-30', 0903232),
(4, 'I', '2021-07-01', '2021-07-31', 5881648),
(5, 'I', '2021-11-05', '2021-12-01', 5891678),
(6, 'I', '2022-03-05', '2022-03-15', 7689352),
(7, 'I', '2022-03-05', '2022-03-15', 7908112);

-- insert data to disccorp
insert into zzz_disccorp (discid, disctype, setnum)
values
(8, 'C', 0146731),
(9, 'C', 0146757),
(10, 'C', 0158931),
(11, 'C', 0187190),
(12, 'C', 0167880),
(13, 'C', 0778906),
(14, 'C', 0167890);

 -- insert data to zzz_orders
SET FOREIGN_KEY_CHECKS = 0;
insert into zzz_order (orderid, startodo, endodo, odolimit, startdate, enddate, custid, custtype, pickup, dropoff, carid, discid, disctype)
values
(1234568, 1000, null, 40, '2020-03-01', '2020-03-05', 754710, 'I', 2, 3, 1, 84654, null),
(2234568, 1000, null, 40, '2020-03-01', '2020-03-05', 754710, 'I', 2, 3, 1, 84654, null),
(3234568, 1000, null, null, '2020-03-01', '2020-03-05', 754710, 'I', 2, 2, 1, 84657, null),
(4234568, 1000, null, 40, '2020-03-01', '2020-03-05', 754710, 'I', 2, 3, 1, 84654, 'I'),
(5234568, 1000, null, 40, '2021-07-01', '2021-07-05', 754710, 'I', 2, 3, 1, 84657, 'I'),
(6234568, 1000, null, 40, '2021-07-01', '2021-07-05', 754710, 'C', 2, 3, 1, 94654, 'C');
SET FOREIGN_KEY_CHECKS = 1;

commit;