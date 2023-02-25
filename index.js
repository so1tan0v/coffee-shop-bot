const {bot} = require('./Application/Application');
const {botCommands} = require('./config/static');
const sequelize = require('./Application/db');
const options = require('./src/options');

const messageController = require('./src/messageController');
const optionController = require('./src/optionController');

const Orders = require('./class/Orders');
const start = async () => {

    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (e) {
        throw e;
    }

    await bot.setMyCommands(botCommands);

    bot.on('message', async msg => {
        const chatId = msg.chat.id;

        try {
            return messageController(msg);
        } catch (e) {
            return bot.sendMessage(chatId, 'Произошел отвал, пиши Фарычу: ' + e)
        }
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        try {
            return optionController(msg);
        } catch (e) {
            return bot.sendMessage(chatId, 'Произошел отвал, пиши Фарычу: ' + e)
        }
    })

    setInterval(async () => {
        const payedOrders = await Orders.getPayedOrders();
        if(payedOrders && payedOrders.length !== 0) {
            for(let i in payedOrders) {
                await bot.sendMessage(payedOrders[i].dataValues.Client.dataValues.chatId,
                    `${payedOrders[i].dataValues.Client.lastName}, ваш заказ готов к выдаче 🚀. Ваш номер заказа: ${payedOrders[i].dataValues.id}\nСпасибо за заказ, Будем рады видеть Вас снова!`,
                    options.newOrderOption)
                await payedOrders[i].update({
                    status: 2
                })
            }
        }
    }, 10000)
}

start().then(() => console.log('Server starting'));


