import React from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      admin: this.props.admin
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleRedirect() {
    if (this.state.redirect) {
      if (!this.state.admin) {
        return <Redirect to="/" />
      } else {
        return <Redirect to="/admin/adminPage" />
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    if (!this.state.admin) {
      Axios.post('/users/login',
        {
          username: this.username.value,
          password: this.password.value
        })
        .then((response) => {
          if (response.data) {
            if (response.data.token) {
              localStorage.removeItem('token')
              localStorage.setItem('token', response.data.token)
              this.setState({ redirect: true })
            } else {
              console.log(response.data)
            }
          }
        })
    } else {
      Axios.post('/admin/login',
        {
          username: this.username.value,
          password: this.password.value
        })
        .then((response) => {
          if (response.data) {
            if (response.data.token) {
              localStorage.setItem('token', response.data.token)
              this.setState({ redirect: true })
            } else {
              console.log(response.data)
            }
          }
        })
    }
  }

  render() {
    return (
      <div>
        {this.handleRedirect()}
        <form onSubmit={this.handleSubmit}>
          <h2>Login</h2>
          <label htmlFor="username">Username</label>
          <input ref={(ref) => { this.username = ref }} name="username" required></input>
          <label htmlFor="password">Password</label>
          <input ref={(ref) => { this.password = ref }} name="password" type="password" required></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
