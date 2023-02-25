-- Стадии
INSERT INTO coffie.rbStages (code, name) VALUES ('reg', 'Регистрация');
INSERT INTO coffie.rbStages (code, name) VALUES ('setName', 'Задает имя себя');
INSERT INTO coffie.rbStages (code, name) VALUES ('completedRegistration', 'Регистрация закончена');
INSERT INTO coffie.rbStages (code, name) VALUES ('readyToOrder', 'Готов к заказу');
INSERT INTO coffie.rbStages (code, name) VALUES ('chooseProduct', 'Выбор продукта');
INSERT INTO coffie.rbStages (code, name) VALUES ('makeOrder', 'Заказ произведен');
INSERT INTO coffie.rbStages (code, name) VALUES ('readyNextOrder', 'Готов к след заказу');

-- Типы товаров
INSERT INTO coffie.rbProductsTypes (code, name) VALUES ('drinks', 'Напитки');
INSERT INTO coffie.rbProductsTypes (code, name) VALUES ('cookies', 'Печенья');
INSERT INTO coffie.rbProductsTypes (code, name) VALUES ('doughnuts', 'Пончики');

-- Товары
INSERT INTO coffie.rbProducts (name, price) VALUES ('Американо', 50);
INSERT INTO coffie.rbProducts (name, price) VALUES ('Капучино', 150);
INSERT INTO coffie.rbProducts (name, price) VALUES ('Латте', 200);
INSERT INTO coffie.rbProducts (name, price) VALUES ('Матча Латте', 250);
INSERT INTO coffie.rbProducts (name, price) VALUES ('Овсяное печенье', 40);
INSERT INTO coffie.rbProducts (name, price) VALUES ('Злаковое печенье', 45);
INSERT INTO coffie.rbProducts (name, price) VALUES ('Малиновое печенье', 50);
INSERT INTO coffie.rbProducts (name, price) VALUES ('Пончик в виде монстра', 80);
INSERT INTO coffie.rbProducts (name, price) VALUES ('Пончик с клубникой', 85);
INSERT INTO coffie.rbProducts (name, price) VALUES ('Пончик с малиной', 70);
INSERT INTO coffie.rbProducts (name, price) VALUES ('Печенье-пончик', 140);

-- Соотношение товаров и группы
INSERT INTO coffie.rbProducts_rbProductsTypes (product_id, type_id) VALUES (1, 1);
INSERT INTO coffie.rbProducts_rbProductsTypes (product_id, type_id) VALUES (2, 1);
INSERT INTO coffie.rbProducts_rbProductsTypes (product_id, type_id) VALUES (3, 1);
INSERT INTO coffie.rbProducts_rbProductsTypes (product_id, type_id) VALUES (4, 1);
INSERT INTO coffie.rbProducts_rbProductsTypes (product_id, type_id) VALUES (5, 2);
INSERT INTO coffie.rbProducts_rbProductsTypes (product_id, type_id) VALUES (6, 2);
INSERT INTO coffie.rbProducts_rbProductsTypes (product_id, type_id) VALUES (7, 2);
INSERT INTO coffie.rbProducts_rbProductsTypes (product_id, type_id) VALUES (8, 3);
INSERT INTO coffie.rbProducts_rbProductsTypes (product_id, type_id) VALUES (9, 3);
INSERT INTO coffie.rbProducts_rbProductsTypes (product_id, type_id) VALUES (10, 3);
INSERT INTO coffie.rbProducts_rbProductsTypes (product_id, type_id) VALUES (11, 2);
INSERT INTO coffie.rbProducts_rbProductsTypes (product_id, type_id) VALUES (11, 3);

