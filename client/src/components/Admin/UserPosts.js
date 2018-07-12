import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserPosts } from '../../actions';
import moment from 'moment-js';

class UserPosts extends Component {

  componentWillMount() {
    this.props.dispatch(getUserPosts(this.props.user.user.id))
  }

  showUserPosts = (user) => (
    user.userPosts ? 
      user.userPosts.map( post => (
        <tr key={post._id}>
          <td>
            <Link to={`/user/edit-post/${post._id}`}>
              {post.name}
            </Link>
          </td>
          <td>{post.author}</td>
          <td>{moment(post.createdAt).format('MM/DD/YYYY')}</td>
        </tr>
      ))
    :
      null
  )

  render() {
    let user = this.props.user;
    return (
      <div className="user_posts">
        <h2>Your reviews:</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Auhtor</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.showUserPosts(user)}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserPosts);