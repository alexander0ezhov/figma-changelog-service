const { Sequelize } = require("sequelize");
const { dbConfig } = require("../../config.json");

module.exports = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: process.env.HOST || dbConfig["host"],
    port: dbConfig.port,
    dialect: "postgres",
    schema: dbConfig.schema,
    define: {
      timestamps: false,
    },
  }
);
