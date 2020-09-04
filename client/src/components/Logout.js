import React from 'react'

export default class Logout extends React.Component {
  render() {
    const handleLogout = this.props.handleLogout
    return (
      <div>
        <button onClick={function (e) { handleLogout() }}>Logout</button>
      </div>
    )
  }
}
