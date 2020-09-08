import React from 'react'

export default class Logout extends React.Component {
  render() {
    const handleLogout = this.props.handleLogout
    return (
      <div className="logout">
        <button onClick={function (e) { handleLogout() }}>Logout</button>
      </div>
    )
  }
}
