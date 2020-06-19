import React from 'react'
import jwt_decode from 'jwt-decode'

export default class Comments extends React.Component {

  resetFields() {
    this.title.value = ""
    this.content.value = ""
  }

  render() {
    const comments = this.props.chapter.comments
    return (
      <div className="commentField">
        {comments ? comments.map((comment, key) => {
          const deleteComment = this.props.deleteComment
          const editComment = this.props.editComment
          const submitEdit = this.props.submitEdit
          const fetchComments = this.props.fetchComments
          const chapter = this.props.chapter
          const token = this.props.token
          const users = this.props.users.users
          let decoded = false
          if (token !== undefined && token !== null) {
            decoded = jwt_decode(token)
          }

          return (
            <div className="commentItem" id={comment.id} user_id={comment.user_id} key={key}>
              {users ? users.map((user, key) => {
                if (user.id == comment.user_id) {                        
                  return (
                    <div key={key}>
                      <h1>{user.username}</h1>
                    </div>
                  )
                }
              }) : (
                <div />
              )}
              {comment.edit_mode ? (
                <div>                    
                  <form onSubmit={submitEdit.bind(this)}>
                    <input ref={(ref) => { this.newTitle = ref }} maxLength="20" name="newTitle" defaultValue={comment.title} required></input>
                    <textarea ref={(ref) => { this.newContent = ref }} maxLength="500" name="newContent" defaultValue={comment.content} required></textarea>
                    <input ref={(ref) => { this.id = ref }} name="id" defaultValue={comment.id} hidden></input>
                    <p>{comment.created}</p>
                    <button type="submit">Submit</button>
                    <button onClick={function(e) {editComment(comment.id, false)}}>Cancel</button>
                  </form>
                </div>
                ) : (
                  <div>
                    <h1>{comment.title}</h1>
                    <p>{comment.content}</p>
                    <p>{comment.created}</p>
                  </div>
                )}
              {token !== undefined && token !== null ? (
                <div>
                  {!comment.edit_mode && decoded.user.id == comment.user_id ? (
                    <div>
                      <button onClick={function(e) {e.preventDefault(); deleteComment(comment.id, comment.chapter_id, chapter, token, fetchComments)}}>Delete</button>                
                      <button onClick={function() {editComment(comment.id, true)}}>Edit</button>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              ) : (
                <div />
              )}
            </div>
          )
        }) : (
            <div className="commentItem" />
          )}
        <div className="postComment">
          <form onSubmit={this.props.postComment.bind(this)}>
            <h2>Post your comment</h2>
            <label htmlFor="title">Title</label>
            <input ref={(ref) => { this.title = ref }} maxLength="20" name="title" required></input>
            <label htmlFor="content">Content</label>
            <textarea ref={(ref) => { this.content = ref }} maxLength="500" name="content" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}
