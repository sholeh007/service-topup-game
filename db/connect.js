const mongoose = require("mongoose");
const { user,pswd,db_name } = require("../config");

mongoose.connect(`mongodb+srv://${user}:${pswd}@topup-game.he7gi.mongodb.net/${db_name}?retryWrites=true&w=majority`);

const db = mongoose.connection;

module.exports = db;
