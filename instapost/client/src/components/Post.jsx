import React from 'react';
import axios from 'axios';
import moment from 'moment';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: props.posts.body,
      showMaxChars: false,
      likes: props.posts.likes
    };
    this.toggle = this.toggle.bind(this);
    this.showChars = this.showChars.bind(this);
    this.multiPar = this.multiPar.bind(this);
    this.incrementLikes = this.incrementLikes.bind(this);
  }

  toggle() {
    this.setState({ showMaxChars: !this.state.showMaxChars });
  }

  showChars() {
    if (this.state.showMaxChars) {
      return this.props.posts.body;
    }
    return this.state.body.slice(0, 145) + '...';
  }

  multiPar() {
    let postBody = this.showChars();
    let pSplit = postBody.split('\n');
    return pSplit;
  }

  incrementLikes() {
    axios.patch('/api/posts/' + this.props.posts._id)
      .then(res => {
        this.setState({likes: res.data.likes});
      })
      .catch(err => {
        console.log('Client incrementLikes PATCH Failed.', err);
        res.send(err);
      });
  }


  render() {
    return (
      <div className='post'>
        <div className='post__byline'>
          <div className='center'>
            <img
              className='avatar'
              src='https://www.w3schools.com/w3images/avatar6.png'
              alt='user avatar'
            />
            <span className='post__byline__user'>{this.props.posts.username}</span>
          </div>
          {moment(this.props.posts.createdAt, 'YYYYMMDD').fromNow()}
        </div>
        <div className='post__image'>
          <img src={this.props.posts.imageUrl} />
        </div>
        {this.multiPar().map((p, index) => {
          return (<p key={index}>{p}</p>);
        })}
        <button onClick={this.toggle}>
          {this.state.showMaxChars ? 'Show LESS' : 'Show ALL'}
        </button>
        <div className='post__actions'>
          <div className='post__likes'>Likes: {this.state.likes}</div>
          <div className='post__buttons'>
            <button onClick={this.incrementLikes}>Like</button>
            <button>Comment</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
