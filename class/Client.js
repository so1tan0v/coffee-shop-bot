const {Client: modelClient} = require('../Application/models');

class Client {
    constructor(client) {
        this.data = client;
    }

    async update(params) {
        this.data = await this.data.update(params);
    }

    async updateStage (stage) {
        const stages = await require('./../class/RbStages').getAllData();

        this.data = await this.data.update({stage_id: stages[stage]})
    }

    static async getById (id) {
        let client = await modelClient.findOne({where: {id: id}})

        return client
            ? new Client(client)
            : null
    }

    static async getByChatId (chatId) {
        let client = await modelClient.findOne({where: {chatId: chatId}})

        return client
            ? new Client(client)
            : null
    }

    static async createClient(params) {
        let client = await modelClient.create(params)

        return new Client(client);
    }


}

module.exports = Client