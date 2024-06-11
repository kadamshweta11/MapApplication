const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  X: { type: Number },
  Y: { type: Number, required: true },
  OBJECTID: { type: Number, required: true },
  ID: { type: Number, required: true },
  TYP: { type: String, required: true },
  ART: { type: String, required: true },
  STANDORT: { type: String },
  BEZEICHNUNG: { type: String, required: true },
  BEZEICHNUNGZUSATZ: { type: String },
  KURZBEZEICHNUNG: { type: String },
  STRASSE: { type: String, required: true },
  PLZ: { type: Number, required: true },
  ORT: { type: String, required: true },
  TELEFON: { type: String },
  FAX: { type: String },
  EMAIL: { type: String },
  PROFILE: { type: String },
  SPRACHEN: { type: String },
  WWW: { type: String },
  TRAEGER: { type: String },
  TRAEGERTYP: { type: String },
  BEZUGNR: { type: String },
  GEBIETSARTNUMMER: { type: String },
  SNUMMER: { type: String },
  NUMMER: { type: String },
  GlobalID: { type: String },
  CreationDate: { type: Date },
  Creator: { type: String },
  EditDate: { type: Date },
  Editor: { type: String }
});

const School = mongoose.model('School', schoolSchema);
module.exports = School;
