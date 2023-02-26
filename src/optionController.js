const {bot}   = require('./../Application/Application');
const options = require('./../src/options');

const Client         = require('./../class/Client');
const ShoppingCart   = require('./../class/ShoppingCart');
const Orders         = require('./../class/Orders');
const RbStages       = require('./../class/RbStages');
const RbProducts     = require('./../class/RbProducts');

const staticConf = require('./../config/static');


module.exports = async function(msg) {
    const data            = msg.data;
    const chatId          = msg.from.id;
    const stages          = await RbStages.getAllData();
    let client            = await Client.getByChatId(chatId);

    const date = new Date(),
          day = date.getDate(),
          month = date.getMonth() + 1,
          year = date.getFullYear(),
          hour = date.getHours(),
          min  = date.getMinutes(),
          sec  = date.getSeconds();

    const currentDate = `${day}.${month}.${year} ${hour}:${min}:${sec}`;
    const dateTimeMessage = `Дата изменения: ${currentDate}`;

    let currentStageCode = '';

    if(client?.data?.dataValues?.stage_id) {
        Object.keys(stages).forEach(name => {
            if(stages[name] === client?.data?.dataValues?.stage_id)
                currentStageCode = name
        })
    }
    const buttonType    = data.split('_')[0],
          type          = data.replace(new RegExp(`${data.split('_')[0]}_`, 'g'), ''),
          buttonValue   = type.split('_')[0],
          buttonSubType = type.split('_')[1]
                            ? type.split('_')[1]
                            : '',
         buttonSubSubType = type.split('_')[2]
                            ? type.split('_')[2]
                            : '';

    switch (buttonType) {
        case 'neworder':
            await client.updateStage('readyToOrder');
            const productTypeOption = await options.getProductsTypeOption();
            await bot.editMessageText(`Рады видеть вас снова, ${client?.data?.dataValues?.lastName}, выберите категорию?:`, {
                 chat_id      : chatId,
                 message_id   : msg.message.message_id,
                 reply_markup : productTypeOption.reply_markup
            });
            return;
        case 'communication':
            switch (buttonValue) {
                case 'getToProductType':
                    const productTypeOption = await options.getProductsTypeOption();
                    await bot.editMessageText('Выберите категорию меню', {
                         chat_id      : chatId,
                         message_id   : msg.message.message_id,
                         reply_markup : productTypeOption.reply_markup
                    });
                    return;
                case 'getToProduct':
                    const productOption = await options.getProductOptionsByProductType(buttonSubType);
                    await bot.editMessageText('Выберите категорию меню', {
                         chat_id      : chatId,
                         message_id   : msg.message.message_id,
                         reply_markup : productOption.reply_markup
                    });
                    return;
            }
            return;
        case 'confirm':
            switch (buttonValue) {
                case 'yes':
                    switch (currentStageCode) {
                        case 'completedRegistration':
                        case 'reg':
                            await bot.sendMessage(chatId, 'Отлично!, готовы сделать заказ?', options.confirmOptions);
                            await client.updateStage('readyToOrder')
                            return;
                        case 'chooseProduct':
                        case 'readyToOrder':
                            await client.updateStage('chooseProduct');
                            const productOption = await options.getProductsTypeOption();
                            const message = 'Выберите категорию?';
                            if(staticConf.removeMessageWhenSelectOption) {
                                await bot.deleteMessage(chatId, msg.message.message_id);
                                await bot.sendMessage(chatId, message, productOption);
                            } else {
                                await bot.editMessageText(message, {
                                     chat_id      : chatId,
                                     message_id   : msg.message.message_id,
                                     reply_markup : productOption.reply_markup
                                });
                            }
                            return;
                    }
                    return;
                case 'no':
                    switch (currentStageCode) {
                        case 'reg':
                            await client.updateStage('setName');
                            await bot.sendMessage(chatId, 'Как к вам обращаться?')
                            return;
                        case 'completedRegistration':
                        case 'readyToOrder':
                            await bot.sendMessage(chatId, `Очень жаль. До встречи!`)
                            return;
                    }
                    await bot.sendMessage(chatId, 'Очень жаль, в данном случае')
                return;
            }
            return;
        case 'shoppingCarts':
            switch (buttonValue) {
                case 'delete':
                    await ShoppingCart.removeByProductIdAndClientId(buttonSubType, client?.data?.dataValues?.id);
                    let product = await RbProducts.getById(buttonSubType);
                    let unpaidOrder = await Orders.getUnpaidByClientId(client.data?.dataValues?.id);
                    let option = await options.getShoppingCartsOption(unpaidOrder?.data?.dataValues?.id);
                    if(option) {
                        const message = `Подтвердите заказ: \nБыл удален: ${product?.data?.dataValues?.name}\n${dateTimeMessage}`;
                        if(staticConf.removeMessageWhenSelectOption) {
                            await bot.deleteMessage(chatId, msg.message.message_id);
                            await bot.sendMessage(chatId, message , option);
                        } else {
                            await bot.editMessageText(message, {
                                 chat_id      : chatId,
                                 message_id   : msg.message.message_id,
                                 reply_markup : option.reply_markup
                            });
                        }
                    } else {
                        await bot.sendMessage(chatId, `У вас нет ничего в корзине!, выберете что-нибудь!`)
                    }
                    return;
                case 'pay':
                    const message = `Сейчас вы будете перенаправлены на страницу оплаты (на данный момент не реализовано ничего, так что будет реализовано не по-настоящему)`;
                    if(staticConf.removeMessageWhenSelectOption) {
                        await bot.deleteMessage(chatId, msg.message.message_id);
                        await bot.sendMessage(chatId, message);
                    } else {
                        await bot.editMessageText(message, {
                             chat_id      : chatId,
                             message_id   : msg.message.message_id,
                             // reply_markup : option.reply_markup
                        });
                    }

                    await bot.sendMessage(chatId, '...1')
                    await bot.sendMessage(chatId, '...2')
                    await bot.sendMessage(chatId, '...3')

                    const order = await Orders.getUnpaidByClientId(client?.data?.dataValues?.id);
                    await bot.sendMessage(chatId, `Заказ оплачен ✅. Номер вашего заказа ${order.data.dataValues.id}`);
                    await order.update({
                        payed  : 1,
                        status : 1
                    })
                    await client.updateStage('readyNextOrder');
                    return;
            }
            return;
        case 'productsType':
            const option = await options.getProductOptionsByProductType(buttonValue, client?.data?.dataValues?.id);
            const message = 'Выберите товар';
            if(staticConf.removeMessageWhenSelectOption) {
                await bot.deleteMessage(chatId, msg.message.message_id);
                await bot.sendMessage(chatId, message, option);
            } else {
                await bot.editMessageText(message, {
                     chat_id      : chatId,
                     message_id   : msg.message.message_id,
                     reply_markup : option.reply_markup
                });
            }
            return;
        case 'products':
            let unpaidOrder = await Orders.getUnpaidByClientId(client.data?.dataValues?.id);
            if(buttonValue === 'completeOrder') {
                if(unpaidOrder.data){
                    let option = await options.getShoppingCartsOption(unpaidOrder?.data?.dataValues?.id);
                    if(option) {
                        const message = 'Подтвердите заказ:';
                        if(staticConf.removeMessageWhenSelectOption) {
                            await bot.deleteMessage(chatId, msg.message.message_id);
                            await bot.sendMessage(chatId, message, option);
                        } else {
                            await bot.editMessageText(message, {
                                 chat_id      : chatId,
                                 message_id   : msg.message.message_id,
                                 reply_markup : option.reply_markup
                            });
                        }
                    } else {
                        await bot.sendMessage(chatId, `У вас нет ничего в корзине!, выберете что-нибудь!`)
                    }
                } else {
                    await bot.sendMessage(chatId, `У вас нет ничего в корзине!, выберете что-нибудь!`)
                }
                return;
            } else if(buttonValue === 'remove') {
                await ShoppingCart.removeByProductIdAndClientId(buttonSubSubType, client?.data?.dataValues?.id);

                const selectedProduct = await RbProducts.getById(buttonSubSubType);
                const option = await options.getProductOptionsByProductType(buttonSubType, client?.data?.dataValues?.id);
                const message = `Выберите товар\nБыл убран: ${selectedProduct?.data?.dataValues?.name}\n${dateTimeMessage}`;

                if(staticConf.removeMessageWhenSelectOption) {
                    await bot.deleteMessage(chatId, msg.message.message_id);
                    await bot.sendMessage(chatId, message, option);
                } else {
                    await bot.editMessageText(message, {
                         chat_id      : chatId,
                         message_id   : msg.message.message_id,
                         reply_markup : option.reply_markup
                    });
                }
                return;
            }
            if(!unpaidOrder.data) {
                unpaidOrder = await Orders.create({
                    client_id: client?.data?.dataValues?.id
                })
            }
            await ShoppingCart.create({
                order_id   : unpaidOrder?.data?.dataValues.id,
                client_id  : client?.data?.dataValues?.id,
                product_id : parseInt(buttonSubSubType),
            });

            const selectedProduct = await RbProducts.getById(buttonSubSubType);

            const opt = await options.getProductOptionsByProductType(buttonSubType, client?.data?.dataValues?.id);
            const displayMessage = `Выберите товар\nБыл добавлен: ${selectedProduct?.data?.dataValues?.name}\n${dateTimeMessage}`;

            if(staticConf.removeMessageWhenSelectOption) {
                await bot.deleteMessage(chatId, msg.message.message_id);
                await bot.sendMessage(chatId, displayMessage, opt);
            } else {
                await bot.editMessageText(displayMessage, {
                     chat_id      : chatId,
                     message_id   : msg.message.message_id,
                     reply_markup : opt.reply_markup
                });
            }
            return;
        default:
            await bot.sendMessage(chatId, `Прошу прощения, я вас не понял.`);
            return;
    }
}