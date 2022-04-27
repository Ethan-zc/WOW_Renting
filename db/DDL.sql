-- SQLINES DEMO *** le SQL Developer Data Modeler 21.4.1.349.1605
-- SQLINES DEMO *** -04-25 23:22:52 EDT
-- SQLINES DEMO *** le Database 21c
-- SQLINES DEMO *** le Database 21c



-- SQLINES DEMO *** no DDL - MDSYS.SDO_GEOMETRY

-- SQLINES DEMO *** no DDL - XMLTYPE

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE zzz_acc_role (
    accid BIGINT NOT NULL,
    rid   BIGINT NOT NULL
);

ALTER TABLE zzz_acc_role ADD CONSTRAINT zzz_acc_role_pk PRIMARY KEY ( rid,
                                                                      accid );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE zzz_account (
    accid    BIGINT NOT NULL COMMENT 'Unique ID for account.',
    accname  VARCHAR(20) NOT NULL COMMENT 'Account name.',
    pwd      VARCHAR(20) NOT NULL COMMENT 'Password.',
    custid   INT NOT NULL,
    custtype CHAR(1) NOT NULL
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_account.accid IS
    'Unique ID for account.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_account.accname IS
    'Account name.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_account.pwd IS
    'Password.'; */

ALTER TABLE zzz_account ADD CONSTRAINT zzz_account_pk PRIMARY KEY ( accid );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE zzz_address (
    addrid  BIGINT NOT NULL COMMENT 'Unique ID for address. ',
    street  VARCHAR(30) NOT NULL COMMENT 'Street info for address. ',
    state   VARCHAR(30) NOT NULL COMMENT 'State info for address. ',
    country VARCHAR(30) NOT NULL COMMENT 'Country info for address. ',
    zipcode INT NOT NULL COMMENT 'Zipcode for address. '
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_address.addrid IS
    'Unique ID for address. '; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_address.street IS
    'Street info for address. '; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_address.state IS
    'State info for address. '; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_address.country IS
    'Country info for address. '; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_address.zipcode IS
    'Zipcode for address. '; */

ALTER TABLE zzz_address ADD CONSTRAINT zzz_address_pk PRIMARY KEY ( addrid );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE zzz_car (
    carid     INT NOT NULL COMMENT 'Unique ID for each car. ',
    cartype   VARCHAR(20) NOT NULL COMMENT 'Class of the car.',
    dailyrate DECIMAL(5, 2) NOT NULL COMMENT 'Regular rental rate per day of the rental service for the car.',
    overrate  DECIMAL(5, 2) NOT NULL COMMENT 'Extra fees per mile that exceeds the limit.',
    officeid  INT,
    vin       VARCHAR(20) NOT NULL,
    imgurl    VARCHAR(80)
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_car.carid IS
    'Unique ID for each car. '; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_car.cartype IS
    'Class of the car.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_car.dailyrate IS
    'Regular rental rate per day of the rental service for the car.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_car.overrate IS
    'Extra fees per mile that exceeds the limit.'; */

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE UNIQUE INDEX zzz_car__idx ON
    zzz_car (
        vin
    ASC );

ALTER TABLE zzz_car ADD CONSTRAINT zzz_car_pk PRIMARY KEY ( carid );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE zzz_corporate (
    custid   INT NOT NULL COMMENT 'Unique ID for customer.',
    custtype CHAR(1) NOT NULL COMMENT 'Customer type.',
    corpname VARCHAR(20) NOT NULL COMMENT 'Corporation''s name.',
    regnum   VARCHAR(20) NOT NULL COMMENT 'Registration number of the corporation.',
    empid    VARCHAR(20) NOT NULL COMMENT 'Employee ID of the customer who rents the car on a corporate account.'
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_corporate.custid IS
    'Unique ID for customer.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_corporate.custtype IS
    'Customer type.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_corporate.corpname IS
    'Corporation''s name.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_corporate.regnum IS
    'Registration number of the corporation.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_corporate.empid IS
    'Employee ID of the customer who rents the car on a corporate account.'; */

ALTER TABLE zzz_corporate ADD CONSTRAINT zzz_corporate_pk PRIMARY KEY ( custid,
                                                                        custtype );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE zzz_customer (
    custid   INT NOT NULL COMMENT 'Unique ID for customer.',
    custtype CHAR(1) NOT NULL COMMENT 'Customer type.',
    email    VARCHAR(20) NOT NULL COMMENT 'Email address for customer. ',
    phone    VARCHAR(20) NOT NULL COMMENT 'Phone number for customers. ',
    addrid   BIGINT NOT NULL
);

ALTER TABLE zzz_customer
    ADD CONSTRAINT ch_inh_zzz_customer CHECK ( custtype IN ( 'C', 'I' ) );

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_customer.custid IS
    'Unique ID for customer.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_customer.custtype IS
    'Customer type.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_customer.email IS
    'Email address for customer. '; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_customer.phone IS
    'Phone number for customers. '; */

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE UNIQUE INDEX zzz_customer__idx ON
    zzz_customer (
        addrid
    ASC );

ALTER TABLE zzz_customer ADD CONSTRAINT zzz_customer_pk PRIMARY KEY ( custid,
                                                                      custtype );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE zzz_disccorp (
    discid   BIGINT NOT NULL COMMENT 'Uinque ID for discount.',
    disctype CHAR(1) NOT NULL COMMENT 'Discriminator of discount type.',
    setnum   DECIMAL(20) NOT NULL COMMENT 'Number for indentifying corporation'
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_disccorp.discid IS
    'Uinque ID for discount.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_disccorp.disctype IS
    'Discriminator of discount type.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_disccorp.setnum IS
    'Number for indentifying corporation'; */

ALTER TABLE zzz_disccorp ADD CONSTRAINT zzz_disccorp_pk PRIMARY KEY ( disctype,
                                                                      discid );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE zzz_discindi (
    discid     BIGINT NOT NULL COMMENT 'Uinque ID for discount.',
    disctype   CHAR(1) NOT NULL COMMENT 'Discriminator of discount type.',
    coupnum    VARCHAR(10) NOT NULL COMMENT 'Coupon number.',
    validstart DATETIME NOT NULL COMMENT 'Coupon valid start date.',
    validend   DATETIME NOT NULL COMMENT 'Coupon valid end date.'
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_discindi.discid IS
    'Uinque ID for discount.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_discindi.disctype IS
    'Discriminator of discount type.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_discindi.coupnum IS
    'Coupon number.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_discindi.validstart IS
    'Coupon valid start date.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_discindi.validend IS
    'Coupon valid end date.'; */

ALTER TABLE zzz_discindi ADD CONSTRAINT zzz_discindi_pk PRIMARY KEY ( disctype,
                                                                      discid );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE zzz_discount (
    discid     BIGINT NOT NULL COMMENT 'Uinque ID for discount.',
    disctype   CHAR(1) NOT NULL COMMENT 'Discriminator of discount type.',
    discpercen DECIMAL(3, 2) NOT NULL COMMENT 'Discount percentage %.'
);

ALTER TABLE zzz_discount
    ADD CONSTRAINT ch_inh_zzz_discount CHECK ( disctype IN ( 'C', 'I' ) );

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_discount.discid IS
    'Uinque ID for discount.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_discount.disctype IS
    'Discriminator of discount type.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_discount.discpercen IS
    'Discount percentage %.'; */

ALTER TABLE zzz_discount ADD CONSTRAINT zzz_discount_pk PRIMARY KEY ( disctype,
                                                                      discid );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE zzz_individual (
    custid     INT NOT NULL COMMENT 'Unique ID for customer.',
    custtype   CHAR(1) NOT NULL COMMENT 'Customer type.',
    lname      VARCHAR(20) NOT NULL COMMENT 'Last name for individual customer. ',
    fname      VARCHAR(20) NOT NULL COMMENT 'First Name for individual customer. ',
    licensenum BIGINT NOT NULL COMMENT 'Drive license number.',
    insname    VARCHAR(20) NOT NULL COMMENT 'Insurance company name.',
    insnum     DECIMAL(20) NOT NULL COMMENT 'Insurance policy number.'
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_individual.custid IS
    'Unique ID for customer.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_individual.custtype IS
    'Customer type.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_individual.lname IS
    'Last name for individual customer. '; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_individual.fname IS
    'First Name for individual customer. '; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_individual.licensenum IS
    'Drive license number.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_individual.insname IS
    'Insurance company name.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_individual.insnum IS
    'Insurance policy number.'; */

ALTER TABLE zzz_individual ADD CONSTRAINT zzz_individual_pk PRIMARY KEY ( custid,
                                                                          custtype );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE zzz_invoice (
    invoiceid   BIGINT NOT NULL COMMENT 'Unique ID for invoice.',
    invoicedate DATETIME NOT NULL COMMENT 'Invoice data.',
    amount      DECIMAL(10, 2) NOT NULL COMMENT 'Invoice amount.',
    ispaid      CHAR(1) NOT NULL COMMENT 'Boolean to check if the invoice is paid.',
    orderid     BIGINT NOT NULL
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_invoice.invoiceid IS
    'Unique ID for invoice.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_invoice.invoicedate IS
    'Invoice data.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_invoice.amount IS
    'Invoice amount.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_invoice.ispaid IS
    'Boolean to check if the invoice is paid.'; */

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE UNIQUE INDEX zzz_invoice__idx ON
    zzz_invoice (
        orderid
    ASC );

ALTER TABLE zzz_invoice ADD CONSTRAINT zzz_invoice_pk PRIMARY KEY ( invoiceid );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE zzz_office (
    officeid INT NOT NULL COMMENT 'Unique ID for office.',
    phone    VARCHAR(20) NOT NULL COMMENT 'Office''s phone number.',
    addrid   BIGINT NOT NULL
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_office.officeid IS
    'Unique ID for office.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_office.phone IS
    'Office''s phone number.'; */

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE UNIQUE INDEX zzz_office__idx ON
    zzz_office (
        addrid
    ASC );

ALTER TABLE zzz_office ADD CONSTRAINT zzz_office_pk PRIMARY KEY ( officeid );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE zzz_order (
    orderid   BIGINT NOT NULL COMMENT 'Unique ID for each order.',
    startodo  BIGINT NOT NULL COMMENT 'Start odometer.',
    endodo    BIGINT COMMENT 'End Odometer.',
    odolimit  BIGINT COMMENT 'Daily odometer limit for the rental service.',
    startdate DATETIME NOT NULL COMMENT 'Date when the customer starts the service.',
    enddate   DATETIME NOT NULL COMMENT 'Date when the customer ends the service.',
    custid    INT NOT NULL,
    custtype  CHAR(1) NOT NULL,
    pickup    BIGINT NOT NULL,
    dropoff   BIGINT NOT NULL,
    carid     INT NOT NULL,
    disctype  CHAR(1),
    discid    BIGINT
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_order.orderid IS
    'Unique ID for each order.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_order.startodo IS
    'Start odometer.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_order.endodo IS
    'End Odometer.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_order.odolimit IS
    'Daily odometer limit for the rental service.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_order.startdate IS
    'Date when the customer starts the service.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_order.enddate IS
    'Date when the customer ends the service.'; */

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE UNIQUE INDEX zzz_order__idx ON
    zzz_order (
        disctype
    ASC,
        discid
    ASC );

ALTER TABLE zzz_order ADD CONSTRAINT zzz_order_pk PRIMARY KEY ( orderid );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE zzz_payment (
    paymid    BIGINT NOT NULL COMMENT 'Unique ID for payment.',
    method    VARCHAR(20) NOT NULL COMMENT 'Payment method.',
    amount    DECIMAL(5, 2) NOT NULL COMMENT 'Payment amount.',
    paymdate  DATETIME NOT NULL COMMENT 'Payment date.',
    cardnum   DECIMAL(20) NOT NULL COMMENT 'Card number.',
    invoiceid BIGINT NOT NULL
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_payment.paymid IS
    'Unique ID for payment.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_payment.method IS
    'Payment method.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_payment.amount IS
    'Payment amount.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_payment.paymdate IS
    'Payment date.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_payment.cardnum IS
    'Card number.'; */

ALTER TABLE zzz_payment ADD CONSTRAINT zzz_payment_pk PRIMARY KEY ( paymid );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE zzz_role (
    rid  BIGINT NOT NULL COMMENT 'Unique ID for role.',
    role VARCHAR(5) NOT NULL COMMENT 'Role name.'
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_role.rid IS
    'Unique ID for role.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_role.role IS
    'Role name.'; */

ALTER TABLE zzz_role ADD CONSTRAINT zzz_role_pk PRIMARY KEY ( rid );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE zzz_vehicle (
    vin   VARCHAR(20) NOT NULL COMMENT 'Vehicle identification number.',
    make  VARCHAR(30) NOT NULL COMMENT 'Brand of the vehicle.',
    model VARCHAR(30) NOT NULL COMMENT 'Name of a product or a range of products.',
    year  SMALLINT NOT NULL COMMENT 'Manufacture year of the vehicle. ',
    lpn   VARCHAR(15) NOT NULL COMMENT 'The registration identifier is a numeric or alphanumeric ID that uniquely identifies the vehicle or vehicle owner within the issuing region''s vehicle register.'
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_vehicle.vin IS
    'Vehicle identification number.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_vehicle.make IS
    'Brand of the vehicle.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_vehicle.model IS
    'Name of a product or a range of products.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_vehicle.year IS
    'Manufacture year of the vehicle. '; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN zzz_vehicle.lpn IS
    'The registration identifier is a numeric or alphanumeric ID that uniquely identifies the vehicle or vehicle owner within the issuing region''s vehicle register.'; */

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

ALTER TABLE zzz_corporate
    ADD CONSTRAINT zzz_corporate_zzz_customer_fk FOREIGN KEY ( custid,
                                                               custtype )
        REFERENCES zzz_customer ( custid,
                                  custtype );

ALTER TABLE zzz_customer
    ADD CONSTRAINT zzz_customer_zzz_address_fk FOREIGN KEY ( addrid )
        REFERENCES zzz_address ( addrid );

ALTER TABLE zzz_disccorp
    ADD CONSTRAINT zzz_disccorp_zzz_discount_fk FOREIGN KEY ( disctype,
                                                              discid )
        REFERENCES zzz_discount ( disctype,
                                  discid );

ALTER TABLE zzz_discindi
    ADD CONSTRAINT zzz_discindi_zzz_discount_fk FOREIGN KEY ( disctype,
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

CREATE OR REPLACE TRIGGER arc_fkarc_11_zzz_individual BEFORE
    INSERT OR UPDATE OF custid, custtype ON zzz_individual
    FOR EACH ROW
    DECLARE d CHAR(1);
BEGIN
    -- SQLINES LICENSE FOR EVALUATION USE ONLY
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

    DECLARE EXIT HANDLER FOR not found BEGIN
        NULL;
    END;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN
        RESIGNAL;
    END;
END;
/

CREATE OR REPLACE TRIGGER arc_fkarc_11_zzz_corporate BEFORE
    INSERT OR UPDATE OF custid, custtype ON zzz_corporate
    FOR EACH ROW
    DECLARE d CHAR(1);
BEGIN
    -- SQLINES LICENSE FOR EVALUATION USE ONLY
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

    DECLARE EXIT HANDLER FOR not found BEGIN
        NULL;
    END;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN
        RESIGNAL;
    END;
END;
/

CREATE OR REPLACE TRIGGER arc_fkarc_12_zzz_disccorp BEFORE
    INSERT OR UPDATE OF disctype, discid ON zzz_disccorp
    FOR EACH ROW
    DECLARE d CHAR(1);
BEGIN
    -- SQLINES LICENSE FOR EVALUATION USE ONLY
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
                               'FK ZZZ_DISCCORP_ZZZ_DISCOUNT_FK in Table ZZZ_DISCCORP violates Arc constraint on Table ZZZ_DISCOUNT - discriminator column DiscType doesn''t have value ''C'''
        );
    END IF;

    DECLARE EXIT HANDLER FOR not found BEGIN
        NULL;
    END;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN
        RESIGNAL;
    END;
END;
/

CREATE OR REPLACE TRIGGER arc_fkarc_12_zzz_discindi BEFORE
    INSERT OR UPDATE OF disctype, discid ON zzz_discindi
    FOR EACH ROW
    DECLARE d CHAR(1);
BEGIN
    -- SQLINES LICENSE FOR EVALUATION USE ONLY
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
                               'FK ZZZ_DISCINDI_ZZZ_DISCOUNT_FK in Table ZZZ_DISCINDI violates Arc constraint on Table ZZZ_DISCOUNT - discriminator column DiscType doesn''t have value ''I'''
        );
    END IF;

    DECLARE EXIT HANDLER FOR not found BEGIN
        NULL;
    END;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN
        RESIGNAL;
    END;
END;
/



-- SQLINES DEMO *** per Data Modeler Summary Report: 
-- 
-- SQLINES DEMO ***                        16
-- SQLINES DEMO ***                         5
-- SQLINES DEMO ***                        36
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO *** DY                      0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         4
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***  TYPE                   0
-- SQLINES DEMO ***  TYPE                   0
-- SQLINES DEMO ***  TYPE BODY              0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO *** EGMENT                  0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO *** ED VIEW                 0
-- SQLINES DEMO *** ED VIEW LOG             0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- 
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- 
-- SQLINES DEMO ***                         0
-- 
-- SQLINES DEMO ***                         0
-- SQLINES DEMO *** A                       0
-- SQLINES DEMO *** T                       0
-- 
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
