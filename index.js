const chalk = require("chalk");
const { start } = require("./src/main");
const { repeatTime } = require('./config.json')

console.log(chalk.green("Запуск задачи по проверке изменений Figma"));
start();
setInterval(start, repeatTime)