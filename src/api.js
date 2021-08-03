const { telegram } = require("../config.json");
const axios = require("axios");
const chalk = require("chalk");

module.exports = {
    sendTelegram: (msg) => {
        console.log(chalk.green(`Отправка сообщения Telegram`));
        console.log(msg);
        axios.post(
            `${telegram.api}/bot${telegram.token}/sendMessage?chat_id=${
                telegram.chatId
            }&parse_mode=MarkdownV2&text=${encodeURI(msg)}`
        );
    },
};
