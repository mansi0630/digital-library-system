const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("libraryDB", "root", "1234", {
  host: "localhost",
  dialect: "mysql"
});

sequelize.authenticate()
  .then(() => console.log("Sequelize MySQL Connected"))
  .catch((err) => console.log("DB connection error:", err));

module.exports = sequelize;