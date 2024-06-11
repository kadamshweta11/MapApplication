const mongoose = require('mongoose');

const socialTeenagerProjectSchema = new mongoose.Schema({
  X: { type: Number },
  Y: { type: Number },
  OBJECTID: { type: Number },
  ID: { type: Number },
  TRAEGER: { type: String },
  LEISTUNGEN: { type: String },
  BEZEICHNUNG: { type: String },
  KURZBEZEICHNUNG: { type: String },
  STRASSE: { type: String },
  PLZ: { type: Number },
  ORT: { type: String },
  TELEFON: { type: String },
  EMAIL: { type: String },
  FAX: { type: String }
});

const SocialTeenagerProject = mongoose.model('SocialTeenagerProject', socialTeenagerProjectSchema);
module.exports = SocialTeenagerProject;
