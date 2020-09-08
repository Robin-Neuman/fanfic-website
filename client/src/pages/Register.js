import React from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import Header from '../components/Header'

export default class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      registerResponse: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/login" />
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    Axios.post('/users',
      {
        username: this.username.value,
        password: this.password.value,
        email: this.email.value
      })
      .then((response) => {
        if (response.data) {
          if (response.data.success) {
            this.setState({ redirect: true })
          } else {            
            console.log(response.data.message)
            this.setState({ registerResponse: response.data.message })
          }
        } else {
          console.log("Error making request")
        }
      })

  }

  render() {
    return (
      <div>
        {this.handleRedirect()}
        <Header handleLogout={this.props.handleLogout} loggedIn={this.props.loggedIn} />
        <form onSubmit={this.handleSubmit}>
          <h2>Register</h2>
          <h3>{this.state.registerResponse}</h3>
          <label htmlFor="username">Username</label>
          <input ref={(ref) => { this.username = ref }} name="username" required></input>
          <label htmlFor="password">Password</label>
          <input ref={(ref) => { this.password = ref }} type="password" name="password" required></input>
          <label htmlFor="password">Email</label>
          <input ref={(ref) => { this.email = ref }} name="email" required></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}