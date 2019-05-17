CREATE DATABASE bamazon;
USE bamazon;

DROP TABLE products;

CREATE TABLE products (
    item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(50),
    price DECIMAL(20,2),
    stock_quantity INTEGER(20),
    PRIMARY KEY(item_id)
);

INSERT INTO  products (itemid,productname,departmentname,price,stockquantity)
VALUES (1, "Stalking Jack The Ripper", "Book", 10.98, 5),
(2, "Dip Pen", "Pen", 23.06, 105),
(3, "Lion King", "Movie", 15.78, 50),
(4, "Moana", "Movie", 15.78, 50),
(5, "Shark Slippers", "Shoes", 11.66, 134),
(6, "Hunting Prince Dracula", "Book", 10.98, 7),
(7, "Adult Coloring Book", "Book", 6.50, 68),
(8, "String Light", "Decore", 5.90, 225),
(9, "Elephant Tapestry", "Decore", 5.64, 87),
(10, "Colored Pencils", "Pencils", 23.56, 45),

SELECT*FROM products;

