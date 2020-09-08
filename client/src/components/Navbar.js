import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { getRole } from '../helpers'

export default class Navbar extends React.Component {
    render() {
        return (
            <div className="navBar">
                <img src=""></img>
                <h3 className="navBarHeader">Pandis Writes</h3>
                <Link className="navBarItem" to={"/"}>Home</Link>
                <Link className="navBarItem" to={"/fanfics"}>Fanfics</Link>
                <Link className="navBarItem" to={"/forum"}>Forum</Link>
                <Link className="navBarItem" to={"/gallery"}>Gallery</Link>
                {this.props.loggedIn ? (
                    <div/>
                ) : (
                    <Link className="navBarItem" to={"/login"}>Login</Link>
                )}
                <Link className="navBarItem" to={"/register"}>Register</Link>
                {getRole(localStorage.getItem('token')) == "admin" ? (
                    <Link className="navBarItem" to={"/adminPage"}>Admin</Link>
                ) : (
                    <div/>
                )}
                <Logout handleLogout={this.props.handleLogout} />
            </div>
        )
    }
}