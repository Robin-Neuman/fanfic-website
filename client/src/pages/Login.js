import React from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleRedirect() {
        console.log("lel")
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        let formData = new FormData()
        formData.set('username', 'password')
        Axios.post('http://localhost:3000/login', 
        {
            username: this.username.value,
            password: this.password.value
        })
        .then((response) => {
            if (response.data) {
                this.setState({ redirect: true })
            }
        })

    }

    render() {
        return (
            <div>
                {this.handleRedirect()}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input ref={(ref) => {this.username = ref}} name="username" required></input>
                    <label htmlFor="password">Password</label>
                    <input ref={(ref) => {this.password = ref}} name="password" required></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
