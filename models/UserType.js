var mongoose = require("mongoose");

var UserTypeSchema = mongoose.Schema({
    Type:{type:String, required:true, unique:true},
});

var UserType = mongoose.model("UserType", UserTypeSchema);

module.exports = UserType;