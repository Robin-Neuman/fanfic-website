import React from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends React.Component {
    render() {
        return (
            <div className="navBar">
                <img src=""></img>
                <h3 className="navBarHeader">Pandis Writes</h3>
                <Link className="navBarItem" to={"/"}>Home</Link>
                <Link className="navBarItem" to={"/fanficPage"}>Fanfic</Link>
                <Link className="navBarItem" to={"/forum"}>Forum</Link>
                <Link className="navBarItem" to={"/gallery"}>Gallery</Link>
                <Link className="navBarItem" to={"/login"}>Login</Link>
                <Link className="navBarItem" to={"/register"}>Register</Link>
            </div>
        )
    }
}