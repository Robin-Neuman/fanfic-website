import React from 'react'
import Navbar from './Navbar'

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <Navbar handleLogout={this.props.handleLogout} loggedIn={this.props.loggedIn} />
      </header>
    )
  }
}