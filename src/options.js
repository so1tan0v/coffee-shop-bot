const RbProductsType = require('./../class/RbProductsType');
const RbProducts = require('./../class/RbProducts');
const ShoppingCart = require('./../class/ShoppingCart');

async function getProductsTypeOption() {
    let productsOption = {
        reply_markup: {
            inline_keyboard: []
        }
    }
    const productsType = await RbProductsType.getAllData();
    productsType.forEach(item => {
        productsOption
            .reply_markup
            .inline_keyboard
            .push([{
                text          : item?.name,
                callback_data : `productsType_${item?.code}`
            }])
    })
    productsOption
        .reply_markup
        .inline_keyboard
        .push([{
            text          : 'Завершить заказ ✅',
            callback_data : `products_completeOrder`
        }]);

    return productsOption;
}

async function getProductOptionsByProductType(name) {
    let productsOption = {
        reply_markup: {
            inline_keyboard: []
        }
    }
    const products = await RbProducts.getAllProductInTime(name);
    productsOption
        .reply_markup
        .inline_keyboard
        .push([{
            text          : '⏪ Назад к категориям',
            callback_data : `communication_getToProductType`
        }]);
    products.forEach(item => {
        productsOption
            .reply_markup
            .inline_keyboard
            .push([{
                text          : item?.rbProduct?.dataValues?.name,
                callback_data : `products_${item?.rbProduct?.dataValues?.id}`
            }, {
                text          : `${item?.rbProduct?.dataValues?.price} ₽`,
                callback_data : `products_${item?.rbProduct?.dataValues?.id}`
            }])
    })
    productsOption
        .reply_markup
        .inline_keyboard
        .push([{
            text          : 'Завершить заказ ✅',
            callback_data : `products_completeOrder`
        }]);

    return productsOption;
}

async function getShoppingCartsOption(orderId) {
    let shoppingCartsOption = {
        reply_markup: {
            inline_keyboard: []
        }
    }
    const shoppingCart = await ShoppingCart.getByOrderId(orderId);
    shoppingCartsOption
        .reply_markup
        .inline_keyboard
        .push([{
            text          : '⏪ Назад к меню',
            callback_data : `communication_getToProductType`
        }]);
    shoppingCart.forEach(item => {
        const product = item?.rbProduct?.dataValues;
        shoppingCartsOption
            .reply_markup
            .inline_keyboard
            .push([{
                text          : `${product?.name} ${item?.dataValues?.count !== 1 ? `(${item?.dataValues?.count})` : ``}`,
                callback_data : `shoppingCarts_${product?.id}`
            }, {
                text          : `❌`,
                callback_data : `shoppingCarts_delete_${product?.id}`
            }])
    })
    shoppingCartsOption
        .reply_markup
        .inline_keyboard
        .push([{
            text          : 'Оплатить 💳',
            callback_data : `shoppingCarts_pay`
        }]);


    return shoppingCartsOption;
}

const confirmOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Да', callback_data: 'confirm_yes'}, {text: 'Нет', callback_data: 'confirm_no'}],
        ]
    })
}

const registrationOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Да', callback_data: 'reg_yes'}, {text: 'Нет', callback_data: 'reg_no'}],
        ]
    })
}

const newOrderOption = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Сделать заказ!', callback_data: 'neworder'}],
        ]
    })
}

module.exports = {
    confirmOptions,
    registrationOptions,
    newOrderOption,
    getProductsTypeOption,
    getProductOptionsByProductType,
    getShoppingCartsOption
}
