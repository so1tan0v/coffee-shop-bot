const {bot} = require('./../Application/Application');
const options = require('./../src/options');
const Client = require('./../class/Client');
const RbStages = require('./../class/RbStages');

module.exports = async function(msg) {
    const text   = msg.text;
    const chatId = msg.chat.id;
    const stages = await RbStages.getAllData();
    let client   = await Client.getByChatId(chatId);

    let currentStageCode = '';

    if(client?.data?.dataValues?.stage_id) {
        Object.keys(stages).forEach(name => {
            if(stages[name] === client?.data?.dataValues?.stage_id)
                currentStageCode = name
        })
    }

    switch (text) {
        case '/start':
            await bot.sendMessage(chatId, `Здравствуйте, меня зовут Александр, \nЯ являюсь роботом, по заказу кофе. Я буду рад помочь сделать вам заказ`);

            if(client) {
                await bot.sendMessage(chatId, 'Вы хотите сделать заказ?', options.confirmOptions);
            } else {
                client = await Client.createClient({
                    lastName  : msg.chat.first_name,
                    firstName : msg.chat.last_name,
                    chatId,
                })
                await client.updateStage('readyToOrder');
                await bot.sendMessage(chatId, `Вы впервые обращаетесь к нам, я могу к вам обращаться ${msg.chat.first_name}?`, options.confirmOptions);
            }
            return;
        case '/info':
            await bot.sendMessage(chatId, `Мы являемся лучшей кофейней во всем Санкт-Петербурге\nЗаниматся кофе с 1987 года.\nМы распологаемя по адресу: Санкт-Петербург, ул. Пушкина, дом Колотушкина, 4`);
            await bot.sendLocation(chatId, '59.92890321569532', '30.356231559394903');
            await bot.sendMessage(chatId, 'Заказывайте у нас!');
            return;
        case '/neworder':
            await bot.sendMessage(chatId, 'еще нет такого функционала');
            return;
        case '/orders':
            await bot.sendMessage(chatId, 'еще нет такого функционала');
            return;
        default:
            switch (currentStageCode) {
                case 'reg':
                    await bot.sendMessage(chatId, 'Нет, нет. Вам надо выбрать!');
                    await bot.sendMessage(chatId, `Вы впервые обращаетесь к нам, я могу к вам обращаться ${msg.chat.first_name}?`, options.confirmOptions);
                    return;
                case 'setName':
                    await client.update({firstName: text});
                    await client.updateStage('completedRegistration');
                    await bot.sendMessage(chatId, `Принято! Буду обращаться к вам ${text}`);
                    await bot.sendMessage(chatId, 'Вы хотите сделать заказ?', options.confirmOptions);
                    return;
                case 'readyToOrder':
                    await bot.sendMessage(chatId, `Нехуй писать, выбирай заказ!`);
                    return;
            }

            await bot.sendMessage(chatId, `Прошу прощения, я вас не понял.`)
            return;
    }
}