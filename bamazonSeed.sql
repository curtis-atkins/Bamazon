-- if bamazon table exists, delete it and create a new database named bamazon--
DROP DATABASE IF EXISTS	bamazon;
CREATE DATABASE bamazon;

-- select the bamazon database --
USE bamazon;

-- create a new table named products that stores columns for an item's: id, name, department, price and quantity --
CREATE TABLE PRODUCTS (
item_id INTEGER (20) AUTO_INCREMENT NOT NULL,
product_name VARCHAR (50)  NOT NULL,
department_name VARCHAR(30)  NOT NULL,
price DECIMAL(20,2)  NOT NULL,
stock_quantity INTEGER(20)  NOT NULL,
PRIMARY KEY (item_id)
);

-- places a new row for a specified item and giving values to the item
INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ("HONDA CIVICS", "AUTOMOTIVE", 13000.00, 4);

-- places a new row for a specified item and giving values to the item
INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ("GOODYEAR 17IN TIRES", "AUTOMOTIVE", 500.00, 12);

-- places a new row for a specified item and giving values to the item
INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ("RAZER BLADES", "ELECTRONICS", 5000.00, 38);

-- places a new row for a specified item and giving values to the item
INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ("LG STYLUS PRO 2S", "ELECTRONICS", 198.99, 4);

-- places a new row for a specified item and giving values to the item
INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ("PATRON TEQUILAS", "BEER/WINE/LIQUOR", 114.99, 100);

-- places a new row for a specified item and giving values to the item
INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ("RED OAK LAGER 12-PKS", "BEER/WINE/LIQUOR", 17.99, 4);

-- places a new row for a specified item and giving values to the item
INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ("SNICKERS CANDY BARS", "IMPULSE", 1.69, 4);

-- places a new row for a specified item and giving values to the item
INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ("WRIGLEY'S WINTER FRESH GUMS", "IMPULSE", 1.29, 4);

-- places a new row for a specified item and giving values to the item
INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ("WATER 35-PACKS", "FOOD/BEVERAGE", 4.88, 4);

-- places a new row for a specified item and giving values to the item;
INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ("BACON DOUBLECHEESEBURGERS", "FOOD/BEVERAGE", 5.00, 4);

-- selects all data in the PRODUCTS database --
SELECT item_id, product_name, price
FROM PRODUCTS;