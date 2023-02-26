const {rbProductsType, rbProducts_rbProductsType, rbProducts} = require('./../Application/models');

class RbProductsType {
    constructor(id) {
        this.data = rbProductsType.findOne({where: {id: id}})
    }

    static async getAllData() {
        return await rbProductsType.findAll();
    }

    static async getByProductId(productId) {
        return await rbProducts_rbProductsType.findOne({
            include : rbProducts,
            where   : {
                id: productId
            }
        })
    }
}

module.exports = RbProductsType;