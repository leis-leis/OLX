var mongoose = require("mongoose");

var VoivodeshipListSchema = mongoose.Schema({
  Name: { type: String, required: true, unique: true },
});

var VoivodeshipList = mongoose.model("VoivodeshipList", VoivodeshipListSchema);

module.exports = VoivodeshipList;
