var mongoose = require("mongoose");

var ChatSchema = mongoose.Schema({
  Recipient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: false,
  },
  Message: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: false,
  },
  IsRead: { type: Boolean, default: false },
});

var Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
