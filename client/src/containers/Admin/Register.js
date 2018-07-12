import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, userRegister } from '../../actions';

class Register extends Component {

  state = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    error: ''
	}
	
	componentWillMount() {
		this.props.dispatch(getUsers());
	}

	componentWillReceiveProps(nextProps) {
		if(!nextProps.user.register === false) {
			this.setState({error: 'Error, try again'})
		} else {
			this.setState({
				name: '',
				lastname: '',
				email: '',
				password: ''
			})
		}
	}

  handleInputName = (event) => {
		this.setState({
			name: event.target.value
		})
  }

  handleInputLastname = (event) => {
    this.setState({
			lastname: event.target.value
		})
  }

  handleInputEmail = (event) => {
    this.setState({
			email: event.target.value
		})
  }

  handleInputPassword = (event) => {
    this.setState({
			password: event.target.value
		})
  }

  submitForm = (event) => {
		event.preventDefault();
		this.setState({error: ''})

		this.props.dispatch(userRegister({
			name: this.state.name,
			lastname: this.state.lastname,
			email: this.state.email,
			password: this.state.password
		}, this.props.user.users))
	}
	
	showUsers = (users) => (
		users ? 
			users.map( user => (
				<tr key={user._id}>
					<td>{user.name}</td>
					<td>{user.lastname}</td>
					<td>{user.email}</td>
				</tr>
			))
		:
			null
	)

  render() {
		let users = this.props.user.users;
    return (
      <div className="rl_container article">

        <form onSubmit={this.submitForm}>
          <h2>Add User</h2>

          <div className="form_element">
            <input
              type="text"
              placeholder="Enter name"
              value={this.state.name}
              onChange={event => this.handleInputName(event)}
            />
          </div>

          <div className="form_element">
            <input
              type="text"
              placeholder="Enter lastname"
              value={this.state.lastname}
              onChange={event => this.handleInputLastname(event)}
            />
          </div>

          <div className="form_element">
            <input
              type="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={event => this.handleInputEmail(event)}
            />
          </div>

          <div className="form_element">
            <input
              type="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={event => this.handleInputPassword(event)}
            />
          </div>

          <button type="submit">Register</button>

					<div className="error">
						{this.state.error && <p>{this.state.error}</p>}
					</div>
        </form>
				<div className="current_users">
					<h3>Current users:</h3>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>lastname</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							{this.showUsers(users)}
						</tbody>
					</table>
				</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}


export default connect(mapStateToProps)(Register);