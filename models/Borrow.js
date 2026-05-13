const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Borrow = sequelize.define("Borrow", {
  name: DataTypes.STRING,
  bookTitle: DataTypes.STRING,
  issueDate: DataTypes.DATE,
  dueDate: DataTypes.DATE,
  returnDate: DataTypes.DATE,
  fine: DataTypes.INTEGER
});

module.exports = Borrow;