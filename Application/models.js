const sequelize = require('./db')
const {DataTypes} = require("sequelize")

const rbStages = sequelize.define('rbStage', {
    id    : {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true, comment: 'Идентификатор записи'},
    code  : {type: DataTypes.STRING,                                                       comment: 'Код статуса'},
    name  : {type: DataTypes.STRING,                                                       comment: 'Наименование статуса'}
}, { timestamps: false })

const rbProductsType = sequelize.define('rbProductsType', {
    id    : {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true, comment: 'Идентификатор записи'},
    code  : {type: DataTypes.STRING,                                                       comment: 'Код группы товаров'},
    name  : {type: DataTypes.STRING,                                                       comment: 'Наименование группы товаров'},
}, { timestamps: false })

const rbProducts = sequelize.define('rbProducts', {
    id      : {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true, comment: 'Идентификатор записи'},
    name    : {type: DataTypes.STRING,                                                       comment: 'Наименование товара'},
    price   : {type: DataTypes.DOUBLE,                                                       comment: 'Цена товара'}
}, { timestamps: false })

const rbProducts_rbProductsType = sequelize.define('rbProducts_rbProductsType', {
    id         : {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true, comment: 'Идентификатор записи'},
    product_id : {type: DataTypes.INTEGER,                                                      comment: 'Идентификатор товара'},
    type_id    : {type: DataTypes.INTEGER, constraint: rbProductsType,                          comment: 'Идентификатор типа товара'},
}, { timestamps: false })
rbProducts_rbProductsType.belongsTo(rbProducts, {
    foreignKey: 'product_id'
})
rbProducts_rbProductsType.belongsTo(rbProductsType, {
    foreignKey: 'type_id',
})

const Client = sequelize.define('Client', {
    id        : {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true, comment: 'Идентификатор записи'},
    chatId    : {type: DataTypes.STRING,  unique: true, index: 'client_chat_id',               comment: 'Идентификатор записи'},
    lastName  : {type: DataTypes.STRING,                                                       comment: 'Имя пользователя'},
    firstName : {type: DataTypes.STRING,                                                       comment: 'Имя пользователя'},
    stage_id  : {type: DataTypes.INTEGER,                                                      comment: 'Текущая стадия заказа'}
}, { timestamps: false })
Client.belongsTo(rbStages, {
    foreignKey: 'stage_id'
})

const Orders = sequelize.define('Orders', {
    id        : {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true, comment: 'Идентификатор записи'},
    client_id : {type: DataTypes.INTEGER,                                                      comment: 'Идентификатор клиента'},
    payed     : {type: DataTypes.TINYINT, defaultValue: 0,                                     comment: 'Статус оплаты'},
    status    : {type: DataTypes.INTEGER, defaultValue: 0,                                     comment: 'Статус заказа: 0-создан, 1-оплачен, 2-готов к выдаче, 3-заказ выдан '}
}, { timestamps: false })
Orders.belongsTo(Client, {
    foreignKey: 'client_id'
})

const ShoppingCart = sequelize.define('ShoppingCart', {
    id         : {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true, comment: 'Идентификатор записи'},
    deleted    : {type: DataTypes.TINYINT, defaultValue: 0,                                     comment: 'Признак удаленности'},
    order_id   : {type: DataTypes.INTEGER,                                                      comment: 'Идентификатор заказа'},
    client_id  : {type: DataTypes.INTEGER,                                                      comment: 'Идентификатор клиента'},
    product_id : {type: DataTypes.INTEGER,                                                      comment: 'Статус оплаты'}
}, { timestamps: false })
ShoppingCart.belongsTo(Orders , {
    foreignKey: 'order_id',
})
ShoppingCart.belongsTo(Client , {
    foreignKey: 'client_id',
})
ShoppingCart.belongsTo(rbProducts , {
    foreignKey: 'product_id',
})

module.exports = {
    rbStages,
    Client,
    rbProductsType,
    rbProducts,
    rbProducts_rbProductsType,
    Orders,
    ShoppingCart
};