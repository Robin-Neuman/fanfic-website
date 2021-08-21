import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { getRole } from '../helpers'

export default class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navOpen: false
        }
    }

    toggleNav() {
        const { navOpen } = this.state
        this.setState({ navOpen: !navOpen })
    }

    render() {
        const { navOpen } = this.state
        return (
            <div>
                <div className="navBar">
                    <img src=""></img>
                    <h3 className="navBarHeader">Pandis Writes</h3>
                    <div className="links">
                        <Link className="navBarItem" to={"/"}>Home</Link>
                        <Link className="navBarItem" to={"/fanfics"}>Fanfics</Link>
                        <Link className="navBarItem" to={"/forum"}>Forum</Link>
                        <Link className="navBarItem" to={"/gallery"}>Gallery</Link>
                        <Link className="navBarItem" to={"/register"}>Register</Link>
                        {this.props.loggedIn ? (
                            <div hidden />
                        ) : (
                                <Link className="navBarItem" to={"/login"}>Login</Link>
                            )}
                        {getRole(localStorage.getItem('token')) == "admin" ? (
                            <Link className="navBarItem" to={"/adminPage"}>Admin</Link>
                        ) : (
                                <div hidden />
                            )}
                    </div>
                    {this.props.loggedIn ? (
                        <div className="dropdownButton">
                            <button onClick={() => { this.toggleNav() }}>Dropdown</button>
                        </div>
                    ) : (
                            <div />
                        )}
                </div>
                {navOpen && this.props.loggedIn ? (
                    <div className="dropdownMenu">                 
                        <Link className="dropdownItem" to={"/"}>Profile</Link> 
                        <Logout handleLogout={this.props.handleLogout} />
                    </div>
                ) : (
                        <div hidden />
                    )}
            </div>
        )
    }
}