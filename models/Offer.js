var mongoose = require("mongoose");

var OfferSchema = mongoose.Schema({
    Name:{type:String, required:true, unique:true},
    Price:{type:String, required:true},
    Description:{type:String, required:false},
    Date:{type:Date, default:Date.now},
    Photos:[{img:{type:String}}], //tablica https://stackoverflow.com/questions/49287424/what-is-the-way-of-saving-image-path-to-mongodb
    User:{type:mongoose.Schema.Types.ObjectId, required:true, unique:false},
    Category:{type:mongoose.Schema.Types.ObjectId, required:true, unique:false},
    Status:{type:mongoose.Schema.Types.ObjectId, required:true, unique:false},
    Address:{type:mongoose.Schema.Types.ObjectId, required:true, unique:false}
});

var Offer = mongoose.model("Offer", OfferSchema);

module.exports = Offer;