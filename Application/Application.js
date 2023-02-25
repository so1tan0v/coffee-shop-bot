const TelegramApi = require('node-telegram-bot-api');
const {token} = require('./../config/static');

const bot = new TelegramApi(token, {polling: true})

module.exports = {
    bot
}