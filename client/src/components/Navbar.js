import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'

export default class Navbar extends React.Component {
    render() {
        console.log("Loggedin", this.props.loggedIn)
        return (
            <div className="navBar">
                <img src=""></img>
                <h3 className="navBarHeader">Pandis Writes</h3>
                <Link className="navBarItem" to={"/"}>Home</Link>
                <Link className="navBarItem" to={"/fanfics"}>Fanfics</Link>
                <Link className="navBarItem" to={"/forum"}>Forum</Link>
                <Link className="navBarItem" to={"/gallery"}>Gallery</Link>
                {this.props.loggedIn == true ? (
                    <div/>
                ) : (
                    <Link className="navBarItem" to={"/login"}>Login</Link>
                )}
                <Link className="navBarItem" to={"/register"}>Register</Link>
                <Logout />
            </div>
        )
    }
}