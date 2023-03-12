var mongoose = require("mongoose");

var StatusSchema = mongoose.Schema({
    Status:{type:String, required:true, unique:true},
});

var Status = mongoose.model("Status", StatusSchema);

module.exports = Status;