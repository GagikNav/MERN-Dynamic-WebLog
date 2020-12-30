const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  postTitle: {
    type: String,
    required: true,
  },
  postBody: {
    type: String,
    required: true,
  },
  imgIndex: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Post = mongoose.model('blog', PostSchema);

