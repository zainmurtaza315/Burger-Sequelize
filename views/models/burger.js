var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

var Burgers = sequelize.define("burger, {
  burger_name: sequelize.STRING, 
  devoured: Sequelize.INTEGER
}); 

Burgers.sync(); 

module.exports = Burgers;