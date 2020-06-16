import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Axios from 'axios'
import Comments from '../components/Comments'
import jwt_decode from 'jwt-decode'

export default class Chapter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      chapter: this.props.location.state.chapter,
      token: localStorage.getItem('token')
    }
    this.fetchComments = this.fetchComments.bind(this)
    this.editComment = this.editComment.bind(this)
  }

  fetchComments(id, chapter) {
    Axios.get(`/content/comments/${id}`)
      .then((response) => {
        if (response.data) {
          chapter.comments = response.data.comments
          this.setState({ chapter: chapter })
        }
      })
  }

  postComment(e) {
    const decoded = this.props.decoded
    e.preventDefault()
    Axios.post('/content/comment',
      {
        title: this.title.value,
        content: this.content.value,
        user_id: decoded.user.id,
        fanfic_id: this.props.fanficId,
        chapter_id: this.props.chapterId
      },
      {
        headers: { Authorization: `Bearer ${this.props.token}` }
      }
    )
      .then((response) => {
        if (response.data) {
          this.resetFields()
          this.props.fetchComments(this.props.chapterId, this.props.chapter)
        }
      })
  }

  deleteComment(comment_id, chapterId, chapter, token, fetchComments) {
    Axios({
      url: '/content/comment',
      method: 'delete',
      data: {
        comment_id: comment_id
      },
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (response.data) {
          console.log(response.data)
          fetchComments(chapterId, chapter)
        }
      })
  }

  editComment(id, edit_mode) {
    let chapter = this.state.chapter
    for (let i = 0; i < chapter.comments.length; i++) {
      if (chapter.comments[i].id == id) {
        chapter.comments[i].edit_mode = edit_mode
        this.setState({ chapter: chapter })
      }
    }
  }

  submitEdit(e) {
    e.preventDefault()
    const comment_id = this.id.value
    const title = this.newTitle.value
    const content = this.newContent.value
    const chapterId = this.props.chapterId
    const chapter = this.props.chapter
    const token = this.props.token
    const fetchComments = this.props.fetchComments
    for (let i = 0; i < chapter.comments.length; i++) {
      if (chapter.comments[i].id == comment_id) {
        if (chapter.comments[i].title == title && chapter.comments[i].content == content) {
          return false
        } else {
          Axios({
            url: '/content/comment',
            method: 'put',
            data: {
              title: title,
              content: content,
              comment_id: comment_id
            },
            headers: { Authorization: `Bearer ${token}` }
          })
            .then((response) => {
              if (response.data) {
                console.log(response.data)
                fetchComments(chapterId, chapter)
              }
            })
        }
      }
    }
  }

  componentDidMount() {
    this.fetchComments(this.props.match.params.chapterId, this.state.chapter)
  }

  render() {
    const chapter = this.state.chapter
    return (
      <div>
        <Header />
        {chapter ?
          (
            <div className="chapter">
              <h1>{chapter.title}</h1>
              <p>{chapter.content}</p>
            </div>
          ) : (
            <div className="chapter" />
          )}
        <Comments decoded={jwt_decode(this.state.token)} token={this.state.token} chapterId={this.props.match.params.chapterId}
          fanficId={this.props.match.params.fanficId} chapter={this.state.chapter} resetFields={this.resetFields}
          postComment={this.postComment} submitEdit={this.submitEdit} editComment={this.editComment} deleteComment={this.deleteComment}
          fetchComments={this.fetchComments} users={this.props.users} />
        <Footer />
      </div>
    )
  }
}