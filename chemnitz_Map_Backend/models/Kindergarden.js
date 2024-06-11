const mongoose = require('mongoose');

const kindergardenSchema = new mongoose.Schema({
  X: { type: Number },
  Y: { type: Number },
  OBJECTID: { type: Number },
  ID: { type: Number },
  TRAEGER: { type: String },
  BEZEICHNUNG: { type: String },
  KURZBEZEICHNUNG: { type: String },
  STRASSE: { type: String },
  STRSCHL: { type: String },
  HAUSBEZ: { type: String },
  PLZ: { type: Number },
  ORT: { type: String },
  HORT: { type: String },
  KITA: { type: String },
  URL: { type: String },
  TELEFON: { type: String },
  FAX: { type: String },
  EMAIL: { type: String },
  BARRIEREFREI: { type: String },
  INTEGRATIV: { type: String }
});

const Kindergarden = mongoose.model('Kindergarden', kindergardenSchema);
module.exports = Kindergarden;
