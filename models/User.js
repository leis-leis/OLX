var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    Login:{type:String, required:true, unique:true},
    Pass:{type:String, required:true},
    Name:{type:String, required:false},
    Surname:{type:String, required:false},
    Email:{type:String, required:true/*, unique:true*/},
    Phone:{type:String, required:true},
    JoinDate:{type:String, default:Date.now},
    LastOnline:{type:String, default:Date.now}, //update przy przejsciu między stronami?
    //Offers:{},  //tablica
    //ContactList:{}, //tablica
    Blocked:{type:Boolean, default:false},
    UserType:{type:mongoose.Schema.Types.ObjectId, required:true, unique:false}
});

var User = mongoose.model("User", UserSchema);

module.exports = User;