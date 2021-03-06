"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];
console.log(config);
// if(env === development)
var db = {};
console.log(process.env.dialect)
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else if (env === "development"){
  console.log("HELLO!");
  console.log(process.env.username);
  var sequelize = new Sequelize(
    process.env.db_database,
    process.env.db_user,
    process.env.db_password,
    {
      "username":process.env.db_user,
      "password":process.env.db_password,
      "database":process.env.db_database,
      "dialect":process.env.db_dialect,
      "host":process.env.db_host,
      "port":process.env.db_port
    }
  )
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;