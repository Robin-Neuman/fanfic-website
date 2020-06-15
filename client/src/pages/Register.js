import React from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'

export default class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    let formData = new FormData()
    formData.set('username', 'password')
    Axios.post('/users',
      {
        username: this.username.value,
        password: this.password.value,
        email: this.email.value
      })
      .then((response) => {
        if (response.data === true) {
          this.setState({ redirect: true })
        } else {
          console.log(response.data)
        }
      })

  }

  render() {
    return (
      <div>
        {this.handleRedirect()}
        <form onSubmit={this.handleSubmit}>
          <h2>Register</h2>
          <label htmlFor="username">Username</label>
          <input ref={(ref) => { this.username = ref }} name="username" required></input>
          <label htmlFor="password">Password</label>
          <input ref={(ref) => { this.password = ref }} name="password" required></input>
          <label htmlFor="password">Email</label>
          <input ref={(ref) => { this.email = ref }} name="email" required></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}