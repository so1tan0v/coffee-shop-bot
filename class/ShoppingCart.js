const models = require('../Application/models');
const sequelize = require('./../Application/db')

class ShoppingCart {
    constructor(params) {
        this.data = params;
    }

    async update(params) {
        this.data = await this.data.update(params);
    }

    static async create(params) {
        let order = await models.ShoppingCart.create(params)

        return new ShoppingCart(order);
    }

    static async getByClientId (id) {
        return await models.ShoppingCart.findAll({
            include: [
                {
                    model: models.ShoppingCart,
                },
                {
                    model: models.Client,
                    where: {
                        id
                    }
                },
                {
                    model: models.rbProducts
                }
            ],
            where: {
                deleted: 0
            }
        })
    }

    static async getByOrderId (orderId) {
        let data = await models.ShoppingCart.findAll({
            include: [
                {
                    model: models.rbProducts
                }
            ],
            where: {
                deleted  : 0,
                order_id : orderId
            },
            group: ['product_id'],
            attributes: [
                'client_id',
                [sequelize.fn('COUNT', sequelize.col('product_id')), 'count']
            ]
        })

        return data;
    }

    static async removeByProductIdAndClientId(productId, clientId){
        let data = await models.ShoppingCart.findOne({
            where: {
                client_id  : clientId,
                product_id : productId,
                deleted    : 0
            }
        })

        if(data)
            await data.update({
                deleted: 1
            });
    }
}

module.exports = ShoppingCart