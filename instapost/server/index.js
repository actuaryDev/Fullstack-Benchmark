const express = require('express');

const Post = require('../database/Post.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

const getPosts = function() {
  return Post.find();
};

const getPostById = function(postId) {
  return Post.findOneAndUpdate({_id: postId}, {$inc: {likes: 1}}, {new: true});
};

app.get('/api/posts', function(req, res) {
  // TODO - your code here!
  getPosts()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log('Server GET Request Failed.', err);
      res.status(500).send(err);
    });
});

app.patch('/api/posts/:postId', function(req, res) {
  getPostById(req.params.postId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log('Patch Request Failed', err);
      res.status(500).send(err);
    });
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
