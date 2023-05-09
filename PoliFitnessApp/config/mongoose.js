const Mongoose = require("mongoose");
const debug = require("debug")("app:mongoose");

const dbhost = process.env.DBHOST || "localhost";
const dbport = process.env.DBPORT || "6152";
const dbname = process.env.DBNAME || "polifitness-app"

const dburi = process.env.DBURI || `mongodb://${dbhost}:${dbport}/${dbname}`;

const connect = async () => {
  debug(dburi);
  try {
    await Mongoose.connect(dburi);
    debug("Conexión a la base exitosa");
  } catch (error) {
    debug("Error en la conexión de la base");
  }
}

module.exports = {
  connect
}