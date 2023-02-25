const models = require('../Application/models');
const {Client} = require("../Application/models");

class Orders {
    constructor(params) {
        this.data = params;
    }

    async update(params) {
        this.data = await this.data.update(params);
    }

    static async getUnpaidByClientId(clientId) {
        const data = await models.Orders.findOne({where: {
            client_id : clientId,
            payed     : 0
        }}
        )
        return new Orders(data);
    }

    static async create(params) {
        let order = await models.Orders.create(params)

        return new Orders(order);
    }

    static async getPayedOrders() {
        return models.Orders.findAll({
            include: {
                model: Client
            },
            where : {
                payed  : 1,
                status : 1
            }
        })
    }
}

module.exports = Orders