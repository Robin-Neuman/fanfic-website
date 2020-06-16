import React from 'react'
import { Link } from 'react-router-dom'

export default class AdminHeader extends React.Component {
  render() {
    return (
      <div className="adminHeader">        
        <Link className="navBarItem" to={"/admin/adminPage"}>Admin</Link>
      </div>
    )
  }
}
