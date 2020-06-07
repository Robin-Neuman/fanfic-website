import React from 'react'

export default class Comments extends React.Component {
  render() {
    const comments = this.props.comments
    return (
      <div className="commentField">
        {comments ? comments.map((comment) => {
          return (
            <div className="commentItem">
              <h1>{comment.title}</h1>
              <p>{comment.content}</p>
            </div>
          )
        }) : (
          <div className="commentItem" />
        )}
      </div>
    )
  }
}
