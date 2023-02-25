const {emulationDb} = require('../config/static')
const uuid = require('uuid');

class Order {
    constructor(orderId) {
        this.orderId = orderId;
        this.order   = emulationDb.orders.find(order => order.orderId === orderId);
    }

    createOrder(chatId) {
        this.order = {
            chatId,
            orderId: uuid.NIL,
            status: 'Создан заказ'
        }
        emulationDb.orders.push(this.order);

        return new Order()
    }
}