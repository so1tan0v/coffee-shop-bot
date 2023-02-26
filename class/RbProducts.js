const {rbProducts, rbProductsType, rbProducts_rbProductsType} = require('./../Application/models');
class RbProducts {
    constructor(params) {
        this.data = params;
    }

    static async getById(id) {
        return new RbProducts(await (rbProducts.findOne({where: {id: id}})));
    }

    static async getAllData() {
        return await rbProducts.findAll();
    }

    static async getAllProduct(typeName) {
        return await rbProducts_rbProductsType.findAll({
            include: [
                {
                    model : rbProducts,
                },
                {
                    model: rbProductsType,
                    where: {
                        code: typeName
                    }
                }
            ]
        })
    }
}

module.exports = RbProducts;