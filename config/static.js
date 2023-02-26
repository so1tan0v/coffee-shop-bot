/**
 * Токен Telegram-бота
 * @type {string}
 */
const token = '5874315771:AAEovEhFxt7Ki0Y1Vn2OxOjcf7CnZJuxziE';

/**
 * Подключение к базе данных
 * @type {{dbUser: string, db: string, dbPassword: string, dbHostParam: {dialect: string, port: string, host: string}}}
 */
const dbConnection = {
    db          : 'coffie',
    dbUser      : 'dbuser',
    dbPassword  : 'dbpassword',
    dbHostParam : {
        host    : 'localhost',
        port    : '3306',
        dialect : 'mysql'
    }
}

/**
 * Первоначальные команды бота
 * @type {[{description: string, command: string},{description: string, command: string},{description: string, command: string},{description: string, command: string}]}
 */
const botCommands = [
    {command: '/start',    description: 'Начало работы с ботом'},
    {command: '/info',     description: 'Информация о нашей кофейне'},
    {command: '/neworder', description: 'Cделать заказ'},
    {command: '/orders',   description: 'Мои заказы'},
];

/**
 * Флаг, говорящий о том, что надо удалять сообщения
 */
let removeMessageWhenSelectOption = false;

module.exports = {
    token,
    dbConnection,
    botCommands,
    removeMessageWhenSelectOption
}