var mongoose = require("mongoose");

var MessageSchema = mongoose.Schema({
    Content:{type:String, required:true},
    SendTime:{type:String, default:Date.now},
    User:{type:mongoose.Schema.Types.ObjectId, required:true, unique:false}

    //ParentMessage:{type:mongoose.Schema.Types.ObjectId, required:true, unique:false}

});

var Message = mongoose.model("Message", MessageSchema);

module.exports = Message;