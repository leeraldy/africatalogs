const mongoose = require('mongoose');

const AllPostsSchema = new mongoose.Schema({
  user: {
    type: 'ObjectId',
    ref: 'User',
  },
  posts: [
    {
      postid: {
        type: String,
      },
      title: {
        type: String,
      },
      name: {
        type: String,
      },
      photo: {
        type: String,
      },
      category: {
        type: String,
      },
      subcategory: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, {
  timestamps: true,
});

// const AllPosts = models.AllPosts || model('AllPosts', AllPostsSchema);
// export default AllPosts;

// export default mongoose.model('AllPosts', AllPostsSchema);

module.exports = AllPosts = mongoose.model('allposts', AllPostsSchema);