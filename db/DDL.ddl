-- 生成者Oracle SQL Developer Data Modeler 21.4.1.349.1605
--   时间:        2022-04-25 21:00:37 EDT
--   站点:      Oracle Database 11g
--   类型:      Oracle Database 11g



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE zzz_acc_role (
    accid NUMBER(10) NOT NULL,
    rid   NUMBER(10) NOT NULL
);

ALTER TABLE zzz_acc_role ADD CONSTRAINT zzz_acc_role_pk PRIMARY KEY ( rid,
                                                                      accid );

CREATE TABLE zzz_account (
    accid    NUMBER(10) NOT NULL,
    accname  VARCHAR2(20 CHAR) NOT NULL,
    pwd      VARCHAR2(20 CHAR) NOT NULL,
    custid   NUMBER(6) NOT NULL,
    custtype CHAR(1) NOT NULL
);

ALTER TABLE zzz_account ADD CONSTRAINT zzz_account_pk PRIMARY KEY ( accid );

CREATE TABLE zzz_address (
    addrid  NUMBER(10) NOT NULL,
    street  VARCHAR2(30) NOT NULL,
    state   VARCHAR2(30) NOT NULL,
    country VARCHAR2(30) NOT NULL,
    zipcode NUMBER(5) NOT NULL
);

COMMENT ON COLUMN zzz_address.addrid IS
    'Unique ID for address. ';

COMMENT ON COLUMN zzz_address.street IS
    'Street info for address. ';

COMMENT ON COLUMN zzz_address.state IS
    'State info for address. ';

COMMENT ON COLUMN zzz_address.country IS
    'Country info for address. ';

COMMENT ON COLUMN zzz_address.zipcode IS
    'Zipcode for address. ';

ALTER TABLE zzz_address ADD CONSTRAINT zzz_address_pk PRIMARY KEY ( addrid );

CREATE TABLE zzz_car (
    carid     NUMBER(6) NOT NULL,
    cartype   VARCHAR2(20) NOT NULL,
    dailyrate NUMBER(5, 2) NOT NULL,
    overrate  NUMBER(5, 2) NOT NULL,
    officeid  NUMBER(6),
    vin       VARCHAR2(20) NOT NULL
);

COMMENT ON COLUMN zzz_car.carid IS
    'Unique ID for each car. ';

COMMENT ON COLUMN zzz_car.cartype IS
    'Class of the car.';

COMMENT ON COLUMN zzz_car.dailyrate IS
    'Regular rental rate per day of the rental service for the car.';

COMMENT ON COLUMN zzz_car.overrate IS
    'Extra fees per mile that exceeds the limit.';

CREATE UNIQUE INDEX zzz_car__idx ON
    zzz_car (
        vin
    ASC );

ALTER TABLE zzz_car ADD CONSTRAINT zzz_car_pk PRIMARY KEY ( carid );

CREATE TABLE zzz_corporate (
    custid   NUMBER(6) NOT NULL,
    custtype CHAR(1) NOT NULL,
    corpname VARCHAR2(20) NOT NULL,
    regnum   VARCHAR2(20) NOT NULL,
    empid    VARCHAR2(20) NOT NULL
);

COMMENT ON COLUMN zzz_corporate.custid IS
    'Unique ID for customer.';

COMMENT ON COLUMN zzz_corporate.custtype IS
    'Customer type.';

COMMENT ON COLUMN zzz_corporate.corpname IS
    'Corporation''s name.';

COMMENT ON COLUMN zzz_corporate.regnum IS
    'Registration number of the corporation.';

COMMENT ON COLUMN zzz_corporate.empid IS
    'Employee ID of the customer who rents the car on a corporate account.';

ALTER TABLE zzz_corporate ADD CONSTRAINT zzz_corporate_pk PRIMARY KEY ( custid,
                                                                        custtype );

CREATE TABLE zzz_customer (
    custid   NUMBER(6) NOT NULL,
    custtype CHAR(1) NOT NULL,
    email    VARCHAR2(20) NOT NULL,
    phone    VARCHAR2(20) NOT NULL,
    addrid   NUMBER(10) NOT NULL
);

ALTER TABLE zzz_customer
    ADD CONSTRAINT ch_inh_zzz_customer CHECK ( custtype IN ( 'C', 'I' ) );

COMMENT ON COLUMN zzz_customer.custid IS
    'Unique ID for customer.';

COMMENT ON COLUMN zzz_customer.custtype IS
    'Customer type.';

COMMENT ON COLUMN zzz_customer.email IS
    'Email address for customer. ';

COMMENT ON COLUMN zzz_customer.phone IS
    'Phone number for customers. ';

CREATE UNIQUE INDEX zzz_customer__idx ON
    zzz_customer (
        addrid
    ASC );

ALTER TABLE zzz_customer ADD CONSTRAINT zzz_customer_pk PRIMARY KEY ( custid,
                                                                      custtype );

CREATE TABLE zzz_disccorp (
    discid   NUMBER(10) NOT NULL,
    disctype CHAR(1) NOT NULL,
    setnum   NUMBER(20) NOT NULL
);

COMMENT ON COLUMN zzz_disccorp.discid IS
    'Uinque ID for discount.';

COMMENT ON COLUMN zzz_disccorp.disctype IS
    'Discriminator of discount type.';

COMMENT ON COLUMN zzz_disccorp.setnum IS
    'Number for indentifying corporation';

ALTER TABLE zzz_disccorp ADD CONSTRAINT zzz_corp_pk PRIMARY KEY ( disctype,
                                                                  discid );

CREATE TABLE zzz_discindi (
    discid     NUMBER(10) NOT NULL,
    disctype   CHAR(1) NOT NULL,
    coupnum    VARCHAR2(10) NOT NULL,
    validstart DATE NOT NULL,
    validend   DATE NOT NULL
);

COMMENT ON COLUMN zzz_discindi.discid IS
    'Uinque ID for discount.';

COMMENT ON COLUMN zzz_discindi.disctype IS
    'Discriminator of discount type.';

COMMENT ON COLUMN zzz_discindi.coupnum IS
    'Coupon number.';

COMMENT ON COLUMN zzz_discindi.validstart IS
    'Coupon valid start date.';

COMMENT ON COLUMN zzz_discindi.validend IS
    'Coupon valid end date.';

ALTER TABLE zzz_discindi ADD CONSTRAINT zzz_indi_pk PRIMARY KEY ( disctype,
                                                                  discid );

CREATE TABLE zzz_discount (
    discid     NUMBER(10) NOT NULL,
    disctype   CHAR(1) NOT NULL,
    discpercen NUMBER(5, 2) NOT NULL
);

ALTER TABLE zzz_discount
    ADD CONSTRAINT ch_inh_zzz_discount CHECK ( disctype IN ( 'C', 'I' ) );

COMMENT ON COLUMN zzz_discount.discid IS
    'Uinque ID for discount.';

COMMENT ON COLUMN zzz_discount.disctype IS
    'Discriminator of discount type.';

COMMENT ON COLUMN zzz_discount.discpercen IS
    'Discount percentage %.';

ALTER TABLE zzz_discount ADD CONSTRAINT zzz_discount_pk PRIMARY KEY ( disctype,
                                                                      discid );

CREATE TABLE zzz_individual (
    custid     NUMBER(6) NOT NULL,
    custtype   CHAR(1) NOT NULL,
    lname      VARCHAR2(20) NOT NULL,
    fname      VARCHAR2(20) NOT NULL,
    licensenum NUMBER(15) NOT NULL,
    insname    VARCHAR2(20) NOT NULL,
    insnum     NUMBER(20) NOT NULL
);

COMMENT ON COLUMN zzz_individual.custid IS
    'Unique ID for customer.';

COMMENT ON COLUMN zzz_individual.custtype IS
    'Customer type.';

COMMENT ON COLUMN zzz_individual.lname IS
    'Last name for individual customer. ';

COMMENT ON COLUMN zzz_individual.fname IS
    'First Name for individual customer. ';

COMMENT ON COLUMN zzz_individual.licensenum IS
    'Drive license number.';

COMMENT ON COLUMN zzz_individual.insname IS
    'Insurance company name.';

COMMENT ON COLUMN zzz_individual.insnum IS
    'Insurance policy number.';

ALTER TABLE zzz_individual ADD CONSTRAINT zzz_individual_pk PRIMARY KEY ( custid,
                                                                          custtype );

CREATE TABLE zzz_invoice (
    invoiceid   NUMBER(10) NOT NULL,
    invoicedate DATE NOT NULL,
    amount      NUMBER(10, 2) NOT NULL,
    ispaid      CHAR(1) NOT NULL,
    orderid     NUMBER(10) NOT NULL
);

COMMENT ON COLUMN zzz_invoice.invoiceid IS
    'Unique ID for invoice.';

COMMENT ON COLUMN zzz_invoice.invoicedate IS
    'Invoice data.';

COMMENT ON COLUMN zzz_invoice.amount IS
    'Invoice amount.';

ALTER TABLE zzz_invoice ADD CONSTRAINT zzz_invoice_pk PRIMARY KEY ( invoiceid );

CREATE TABLE zzz_office (
    officeid NUMBER(6) NOT NULL,
    phone    VARCHAR2(20) NOT NULL,
    addrid   NUMBER(10) NOT NULL
);

COMMENT ON COLUMN zzz_office.officeid IS
    'Unique ID for office.';

COMMENT ON COLUMN zzz_office.phone IS
    'Office''s phone number.';

CREATE UNIQUE INDEX zzz_office__idx ON
    zzz_office (
        addrid
    ASC );

ALTER TABLE zzz_office ADD CONSTRAINT zzz_office_pk PRIMARY KEY ( officeid );

CREATE TABLE zzz_order (
    orderid   NUMBER(10) NOT NULL,
    startodo  NUMBER(10) NOT NULL,
    endodo    NUMBER(10),
    odolimit  NUMBER(10),
    startdate DATE NOT NULL,
    enddate   DATE NOT NULL,
    custid    NUMBER(6) NOT NULL,
    custtype  CHAR(1) NOT NULL,
    pickup    NUMBER(10) NOT NULL,
    dropoff   NUMBER(10) NOT NULL,
    carid     NUMBER(6) NOT NULL,
    discid    NUMBER(10),
    disctype  CHAR(1)
);

COMMENT ON COLUMN zzz_order.orderid IS
    'Unique ID for each order.';

COMMENT ON COLUMN zzz_order.startodo IS
    'Start odometer.';

COMMENT ON COLUMN zzz_order.endodo IS
    'End Odometer.';

COMMENT ON COLUMN zzz_order.odolimit IS
    'Daily odometer limit for the rental service.';

COMMENT ON COLUMN zzz_order.startdate IS
    'Date when the customer starts the service.';

COMMENT ON COLUMN zzz_order.enddate IS
    'Date when the customer ends the service.';

CREATE UNIQUE INDEX zzz_order__idx ON
    zzz_order (
        disctype
    ASC,
        discid
    ASC );

ALTER TABLE zzz_order ADD CONSTRAINT zzz_order_pk PRIMARY KEY ( orderid );

CREATE TABLE zzz_payment (
    paymid    NUMBER(10) NOT NULL,
    method    VARCHAR2(20) NOT NULL,
    amount    NUMBER(5, 2) NOT NULL,
    paymdate  DATE NOT NULL,
    cardnum   NUMBER(20) NOT NULL,
    invoiceid NUMBER(10) NOT NULL
);

COMMENT ON COLUMN zzz_payment.paymid IS
    'Unique ID for payment.';

COMMENT ON COLUMN zzz_payment.method IS
    'Payment method.';

COMMENT ON COLUMN zzz_payment.amount IS
    'Payment amount.';

COMMENT ON COLUMN zzz_payment.paymdate IS
    'Payment date.';

COMMENT ON COLUMN zzz_payment.cardnum IS
    'Card number.';

ALTER TABLE zzz_payment ADD CONSTRAINT zzz_payment_pk PRIMARY KEY ( paymid );

CREATE TABLE zzz_role (
    rid  NUMBER(10) NOT NULL,
    role VARCHAR2(5 CHAR) NOT NULL
);

ALTER TABLE zzz_role ADD CONSTRAINT zzz_role_pk PRIMARY KEY ( rid );

CREATE TABLE zzz_vehicle (
    vin   VARCHAR2(20) NOT NULL,
    make  VARCHAR2(30) NOT NULL,
    model VARCHAR2(30) NOT NULL,
    year  NUMBER(4) NOT NULL,
    lpn   VARCHAR2(15) NOT NULL
);

COMMENT ON COLUMN zzz_vehicle.vin IS
    'Vehicle identification number.';

COMMENT ON COLUMN zzz_vehicle.make IS
    'Brand of the vehicle.';

COMMENT ON COLUMN zzz_vehicle.model IS
    'Name of a product or a range of products.';

COMMENT ON COLUMN zzz_vehicle.year IS
    'Manufacture year of the vehicle. ';

COMMENT ON COLUMN zzz_vehicle.lpn IS
    'The registration identifier is a numeric or alphanumeric ID that uniquely identifies the vehicle or vehicle owner within the issuing region''s vehicle register.';

ALTER TABLE zzz_vehicle ADD CONSTRAINT zzz_vehicle_pk PRIMARY KEY ( vin );

ALTER TABLE zzz_acc_role
    ADD CONSTRAINT zzz_acc_role_zzz_account_fk FOREIGN KEY ( accid )
        REFERENCES zzz_account ( accid );

ALTER TABLE zzz_acc_role
    ADD CONSTRAINT zzz_acc_role_zzz_role_fk FOREIGN KEY ( rid )
        REFERENCES zzz_role ( rid );

ALTER TABLE zzz_account
    ADD CONSTRAINT zzz_account_zzz_customer_fk FOREIGN KEY ( custid,
                                                             custtype )
        REFERENCES zzz_customer ( custid,
                                  custtype );

ALTER TABLE zzz_car
    ADD CONSTRAINT zzz_car_zzz_office_fk FOREIGN KEY ( officeid )
        REFERENCES zzz_office ( officeid );

ALTER TABLE zzz_car
    ADD CONSTRAINT zzz_car_zzz_vehicle_fk FOREIGN KEY ( vin )
        REFERENCES zzz_vehicle ( vin );

ALTER TABLE zzz_disccorp
    ADD CONSTRAINT zzz_corp_zzz_discount_fk FOREIGN KEY ( disctype,
                                                          discid )
        REFERENCES zzz_discount ( disctype,
                                  discid );

ALTER TABLE zzz_corporate
    ADD CONSTRAINT zzz_corporate_zzz_customer_fk FOREIGN KEY ( custid,
                                                               custtype )
        REFERENCES zzz_customer ( custid,
                                  custtype );

ALTER TABLE zzz_customer
    ADD CONSTRAINT zzz_customer_zzz_address_fk FOREIGN KEY ( addrid )
        REFERENCES zzz_address ( addrid );

ALTER TABLE zzz_discindi
    ADD CONSTRAINT zzz_indi_zzz_discount_fk FOREIGN KEY ( disctype,
                                                          discid )
        REFERENCES zzz_discount ( disctype,
                                  discid );

ALTER TABLE zzz_individual
    ADD CONSTRAINT zzz_individual_zzz_customer_fk FOREIGN KEY ( custid,
                                                                custtype )
        REFERENCES zzz_customer ( custid,
                                  custtype );

ALTER TABLE zzz_invoice
    ADD CONSTRAINT zzz_invoice_zzz_order_fk FOREIGN KEY ( orderid )
        REFERENCES zzz_order ( orderid );

ALTER TABLE zzz_office
    ADD CONSTRAINT zzz_office_zzz_address_fk FOREIGN KEY ( addrid )
        REFERENCES zzz_address ( addrid );

ALTER TABLE zzz_order
    ADD CONSTRAINT zzz_order_zzz_address_fk FOREIGN KEY ( dropoff )
        REFERENCES zzz_address ( addrid );

ALTER TABLE zzz_order
    ADD CONSTRAINT zzz_order_zzz_address_fkv2 FOREIGN KEY ( pickup )
        REFERENCES zzz_address ( addrid );

ALTER TABLE zzz_order
    ADD CONSTRAINT zzz_order_zzz_car_fk FOREIGN KEY ( carid )
        REFERENCES zzz_car ( carid );

ALTER TABLE zzz_order
    ADD CONSTRAINT zzz_order_zzz_customer_fk FOREIGN KEY ( custid,
                                                           custtype )
        REFERENCES zzz_customer ( custid,
                                  custtype );

ALTER TABLE zzz_order
    ADD CONSTRAINT zzz_order_zzz_discount_fk FOREIGN KEY ( disctype,
                                                           discid )
        REFERENCES zzz_discount ( disctype,
                                  discid );

ALTER TABLE zzz_payment
    ADD CONSTRAINT zzz_payment_zzz_invoice_fk FOREIGN KEY ( invoiceid )
        REFERENCES zzz_invoice ( invoiceid );

CREATE OR REPLACE TRIGGER arc_fkarc_7_zzz_individual BEFORE
    INSERT OR UPDATE OF custid, custtype ON zzz_individual
    FOR EACH ROW
DECLARE
    d CHAR(1);
BEGIN
    SELECT
        a.custtype
    INTO d
    FROM
        zzz_customer a
    WHERE
        a.custid = :new.custid
        AND a.custtype = :new.custtype;

    IF ( d IS NULL OR d <> 'I' ) THEN
        raise_application_error(
                               -20223,
                               'FK ZZZ_INDIVIDUAL_ZZZ_CUSTOMER_FK in Table ZZZ_INDIVIDUAL violates Arc constraint on Table ZZZ_CUSTOMER - discriminator column CustType doesn''t have value ''I'''
        );
    END IF;

EXCEPTION
    WHEN no_data_found THEN
        NULL;
    WHEN OTHERS THEN
        RAISE;
END;
/

CREATE OR REPLACE TRIGGER arc_fkarc_7_zzz_corporate BEFORE
    INSERT OR UPDATE OF custid, custtype ON zzz_corporate
    FOR EACH ROW
DECLARE
    d CHAR(1);
BEGIN
    SELECT
        a.custtype
    INTO d
    FROM
        zzz_customer a
    WHERE
        a.custid = :new.custid
        AND a.custtype = :new.custtype;

    IF ( d IS NULL OR d <> 'C' ) THEN
        raise_application_error(
                               -20223,
                               'FK ZZZ_CORPORATE_ZZZ_CUSTOMER_FK in Table ZZZ_CORPORATE violates Arc constraint on Table ZZZ_CUSTOMER - discriminator column CustType doesn''t have value ''C'''
        );
    END IF;

EXCEPTION
    WHEN no_data_found THEN
        NULL;
    WHEN OTHERS THEN
        RAISE;
END;
/

CREATE OR REPLACE TRIGGER arc_fkarc_8_zzz_discindi BEFORE
    INSERT OR UPDATE OF disctype, discid ON zzz_discindi
    FOR EACH ROW
DECLARE
    d CHAR(1);
BEGIN
    SELECT
        a.disctype
    INTO d
    FROM
        zzz_discount a
    WHERE
        a.disctype = :new.disctype
        AND a.discid = :new.discid;

    IF ( d IS NULL OR d <> 'I' ) THEN
        raise_application_error(
                               -20223,
                               'FK ZZZ_INDI_ZZZ_DISCOUNT_FK in Table ZZZ_DISCINDI violates Arc constraint on Table ZZZ_DISCOUNT - discriminator column DiscType doesn''t have value ''I'''
        );
    END IF;

EXCEPTION
    WHEN no_data_found THEN
        NULL;
    WHEN OTHERS THEN
        RAISE;
END;
/

CREATE OR REPLACE TRIGGER arc_fkarc_8_zzz_disccorp BEFORE
    INSERT OR UPDATE OF disctype, discid ON zzz_disccorp
    FOR EACH ROW
DECLARE
    d CHAR(1);
BEGIN
    SELECT
        a.disctype
    INTO d
    FROM
        zzz_discount a
    WHERE
        a.disctype = :new.disctype
        AND a.discid = :new.discid;

    IF ( d IS NULL OR d <> 'C' ) THEN
        raise_application_error(
                               -20223,
                               'FK ZZZ_CORP_ZZZ_DISCOUNT_FK in Table ZZZ_DISCCORP violates Arc constraint on Table ZZZ_DISCOUNT - discriminator column DiscType doesn''t have value ''C'''
        );
    END IF;

EXCEPTION
    WHEN no_data_found THEN
        NULL;
    WHEN OTHERS THEN
        RAISE;
END;
/



-- Oracle SQL Developer Data Modeler 概要报告: 
-- 
-- CREATE TABLE                            16
-- CREATE INDEX                             4
-- ALTER TABLE                             36
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           4
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0
