var mongoose = require("mongoose");

var AddressSchema = mongoose.Schema({
    City:{type:String, required:true, unique:true},
    Voivodeship: {type:mongoose.Schema.Types.ObjectId, required:true, unique:false}
});

var Address = mongoose.model("Address", AddressSchema);

module.exports = Address;