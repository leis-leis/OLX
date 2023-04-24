var mongoose = require("mongoose");

var AddressSchema = mongoose.Schema({
  City: { type: String, required: true},
  County: { type: String, required: true},
  Voivodeship: { type: String, required: true},
});

var Address = mongoose.model("Address", AddressSchema);

module.exports = Address;
