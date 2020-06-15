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

          return (
            <div className="commentItem" id={comment.id} user_id={comment.user_id} key={key}>
              <h1>{comment.title}</h1>
              <input defaultValue={comment.title} hidden></input>
              <p>{comment.content}</p>
              <textarea defaultValue={comment.content} hidden></textarea>
              {this.props.decoded.user.id == comment.user_id ? (
                <div>
                  <button onClick={function(e) {e.preventDefault(); deleteComment(comment.id, comment.chapter_id, chapter, token, fetchComments)}}>Delete</button>
                  <button onClick={function() {editComment(comment.id)}}>Edit</button>
                  {comment.edit_mode ? (
                    <button onClick={function(e) {e.preventDefault(); submitEdit(comment.id, comment.chapter_id, chapter, token, fetchComments)}}>Submit</button>
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
            <input ref={(ref) => { this.title = ref }} name="title" required></input>
            <label htmlFor="content">Content</label>
            <input ref={(ref) => { this.content = ref }} name="content" required></input>
            <input ref={(ref) => { this.fanfic_id = ref }} name="fanfic_id" defaultValue={this.props.chapterId} hidden></input>
            <input ref={(ref) => { this.chapter_id = ref }} name="chapter_id" defaultValue={this.props.chapterId} hidden></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}
