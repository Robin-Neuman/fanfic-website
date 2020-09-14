import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { getRole } from '../helpers'

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navOpen: false
    }
  }

  toggleNav() {
    const navOpen = this.state.navOpen
    this.setState({ navOpen: !navOpen })
  }

  render() {
    const navOpen = this.state.navOpen
    return (
      <div className="sidebar">
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
      </div>
    )
  }
}