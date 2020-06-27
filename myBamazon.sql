DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products
(
    item_id INT (5) NOT NULL auto_increment,
    product_name VARCHAR (100) NOT NULL,
    department_name VARCHAR (50) NOT NULL,
    price INT default 0,
    stock_quantity INT NULL,
    primary key (item_id)
);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Computer", "Electronics", 500, 3);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Cellphone", "Electronics", 800, 5);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Baby Yoda Plush", "Star Wars Gear", 20, 2);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Millennium Falcon", "Star Wars Gear", 300, 2);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Hand-Sanitizer", "PPE", 30, 50);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("N95 MASK", "PPE", 50, 30);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("HARRY POTTER COLLECTION", "Movies", 100, 10);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Toy Story Collection", "Movies", 80, 7);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Toothpaste", "Health & Beauty", 10, 10);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Toothbrush", "Heath & Beauty", 8, 10);