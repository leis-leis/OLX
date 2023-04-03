var mongoose = require("mongoose");

var OfferSchema = mongoose.Schema({
  Name: { type: String, required: true},
  Price: { type: String, required: true },
  Description: { type: String, required: false },
  Date: { type: Date, default: Date.now },
  Photos: [{ type: String }], //tablica https://stackoverflow.com/questions/49287424/what-is-the-way-of-saving-image-path-to-mongodb
  User: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: false
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    //required: true,
    ref: "Category",
    unique: false,
  },
  Address: {
    type: mongoose.Schema.Types.ObjectId,
    //required: true,
    ref: "Address",
    unique: false,
  },
});


var Offer = mongoose.model("Offer", OfferSchema);

module.exports = Offer;


