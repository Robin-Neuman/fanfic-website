import React from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { getRole } from '../helpers'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      loginResponse: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleRedirect() {
    if (this.state.redirect) {
      if (this.props.role !== "admin") {
        return <Redirect to="/" />
      } else {
        return <Redirect to="/adminPage" />
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault()
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
            this.props.handleLogin(getRole(response.data.token))
            this.setState({ redirect: true })
          } else {
            console.log(response.data)
            this.setState({ loginResponse: response.data.message })
          }
        }
      })
  }

  render() {
    return (
      <div>
        {this.handleRedirect()}
        <Header handleLogout={this.props.handleLogout} loggedIn={this.props.loggedIn} />
        <Sidebar handleLogout={this.props.handleLogout} loggedIn={this.props.loggedIn} />
        <div className="mainCont">
          <form onSubmit={this.handleSubmit}>
            <h2>Login</h2>
            <h3>{this.state.loginResponse}</h3>
            <label htmlFor="username">Username</label>
            <input ref={(ref) => { this.username = ref }} name="username" required></input>
            <label htmlFor="password">Password</label>
            <input ref={(ref) => { this.password = ref }} name="password" type="password" required></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}
