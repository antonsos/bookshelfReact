import React, { Component } from 'react';
import { connect } from 'react-redux';

//ACTIONS
import { auth } from '../actions';

export default (CompasedClass, reload) => {
  class AuthenticationCheck extends Component {

    state = {
      loading: true
    }

    componentWillMount() {
      this.props.dispatch(auth())
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        loading: false
      })

      if(!nextProps.user.user.isAuth) {
        if(reload === true) {
          this.props.history.push('/login')
        }
      } else {
        if(reload === false) {
          this.props.history.push('/user')
        }
      }
    }

    render() {
      if(this.state.loading) {
        return <div className="loader">Loading...</div>
      }

      return <CompasedClass {...this.props} user={this.props.user}/>
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  }

  return connect(mapStateToProps)(AuthenticationCheck);
}
