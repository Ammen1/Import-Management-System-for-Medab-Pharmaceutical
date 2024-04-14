const mongoose = require('mongoose');
const {Schema} = mongoose;

const ChatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

exports.ChatModel = mongoose.model("ChatModel", ChatSchema);

