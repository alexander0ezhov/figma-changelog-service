const { DataTypes } = require("sequelize");
const { STRING, INTEGER, DATEONLY, TEXT } = DataTypes;
const dbConnect = require("../dbConnect");

module.exports = dbConnect.define("figma_changelog", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  file: STRING,
  name: STRING,
  description: TEXT,
  date: DATEONLY,
});
