const {rbProductsType} = require('./../Application/models');
class RbProductsType {
    constructor(id) {
        this.data = rbProductsType.findOne({where: {id: id}})
    }

    static async getAllData() {
        return await rbProductsType.findAll();
    }
}

module.exports = RbProductsType;