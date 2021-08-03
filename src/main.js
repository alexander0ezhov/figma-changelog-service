const chalk = require("chalk");
const { getPaymentsChangelog } = require('./getters')
const { joinChangelogs, toStringDate } = require('./util')
const { sendTelegram } = require('./api')
const { repeatTime } = require('../config.json')

module.exports = {
    start: async function () {
        const startDate = new Date()
        console.log(chalk.yellow(toStringDate(startDate)));
        console.log(chalk.blue("Получение данных из Figma API"));

        const paymentsChangelog = await getPaymentsChangelog();

        const joinedChangelogs = joinChangelogs([
            paymentsChangelog
        ]);

        joinedChangelogs
            ? process.env.MODE === "production"
            ? sendTelegram(joinedChangelogs)
            : console.log(`${chalk.green('Есть изменения')}
${joinedChangelogs}`)
            : console.log("Нет изменений для отправки");

        startDate.setMilliseconds(repeatTime)
        console.log(`${chalk.blue("Следующая проверка в")} ${chalk.yellow(toStringDate(startDate))}`)
        return 1;
    },
};

