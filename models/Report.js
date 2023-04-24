var mongoose = require("mongoose");

var ReportSchema = mongoose.Schema({
  Title: { type: String, required: true},
  Description: { type: String, required: false },
  Date: { type: Date, default: Date.now },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
    unique: false
  },
  Offer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Offer",
    unique: false
    }
});


var Report = mongoose.model("Report", ReportSchema);

module.exports = Report;


