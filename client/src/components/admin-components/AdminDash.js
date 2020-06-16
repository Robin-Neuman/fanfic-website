import React from 'react'

export default class AdminDash extends React.Component {
  render() {
    return (
      <div className="adminDash">
        <div className="mainBody">
          <div className="commentCont">
            <h1>Latest comments</h1>
          </div>
          <div className="requestCont">
            <h1>Latest requests</h1>
          </div>
        </div>
      </div>
    )
  }
}