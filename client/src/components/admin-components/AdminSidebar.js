import React from 'react'
import { Link } from 'react-router-dom'

export default class AdminSidebar extends React.Component {
  render() {
    return (
      <div className="adminSidebar">
        <div className="sidebar">
          <Link className="navBarItem" to={"/admin/adminPage"}>Dashboard</Link>          
          <Link className="navBarItem" to={"/admin/adminPage/fanfics"}>Fanfics</Link>          
          <Link className="navBarItem" to={"/admin/adminPage/gallery"}>Gallery</Link>          
          <Link className="navBarItem" to={"/admin/adminPage/news"}>News</Link>          
          <Link className="navBarItem" to={"/admin/adminPage/comments"}>Comments</Link>          
          <Link className="navBarItem" to={"/admin/adminPage/requests"}>Requests</Link>          
        </div>
      </div>
    )
  }
}
