import React from 'react'
import { Link } from 'react-router-dom'

export default class AdminHeader extends React.Component {
  render() {
    return (
      <div className="adminHeader">        
        <div className="links">
          <Link className="navBarItem" to={"/adminPage"}>Admin</Link>
          <Link className="navBarItem" to={"/"}>Home</Link>
        </div>
      </div>
    )
  }
}
