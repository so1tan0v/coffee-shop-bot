const {rbStages} = require('./../Application/models');
class RbStages {
    constructor(id) {
        this.data = rbStages.findOne({where: {id: id}})
    }

    static async getAllData() {
        let data = await rbStages.findAll(),
            result = {};

        data.forEach(item => {
            result[item.code] = item.id;
        })
        return result;
    }
}

module.exports = RbStages;