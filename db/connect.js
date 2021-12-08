const mongoose = require("mongoose");
const { url } = require("../config");

mongoose.connect(url);

const db = mongoose.connection;

module.exports = db;
