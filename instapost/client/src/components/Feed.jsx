import React from 'react';
import Post from './Post.jsx';

const Feed = (props) => {
  const posts = props.posts;
  posts.sort((first, second) => {
    return new Date(second.createdAt) - new Date(first.createdAt);
  });

  return (
    <div className='feed'>
      {/* section for post form */}

      {/* section for all posts */}
      {posts.map((post, index) => <Post key={index} posts={post} />)}
    </div>
  );
};

export default Feed;
