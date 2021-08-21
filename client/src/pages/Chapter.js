import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import Axios from 'axios'
import Comments from '../components/Comments'
import jwt_decode from 'jwt-decode'

export default class Chapter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      chapter: this.props.location.state.chapter,
      token: this.props.token,
      loggedIn: this.props.loggedIn
    }
    this.fetchComments = this.fetchComments.bind(this)
    this.switchMode = this.switchMode.bind(this)
  }

  fetchComments(id, chapter) {
    try {
      Axios.get(`/content/comments/${id}`)
        .then((response) => {
          if (response.data !== undefined && response.data !== null) {
            chapter.comments = response.data.comments
            this.setState({ chapter: chapter })
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  postComment(e) {
    e.preventDefault()
    const token = this.props.token
    try {
      const decoded = jwt_decode(token)
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
          if (response.data !== undefined && response.data !== null) {
            this.resetFields()
            this.props.fetchComments(this.props.chapterId, this.props.chapter)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  deleteComment(comment_id, chapterId, chapter, token, fetchComments) {
    try {
      Axios({
        url: '/content/comment',
        method: 'delete',
        data: {
          comment_id: comment_id
        },
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => {
          if (response.data !== undefined && response.data !== null) {
            console.log(response.data)
            fetchComments(chapterId, chapter)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  switchMode(id, mode) {
    let chapter = this.state.chapter
    for (let i = 0; i < chapter.comments.length; i++) {
      if (chapter.comments[i].id === id) {
        chapter.comments[i].mode = mode
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
    try {
      for (let i = 0; i < chapter.comments.length; i++) {
        if (chapter.comments[i].id == comment_id) {
          if (chapter.comments[i].title === title && chapter.comments[i].content === content) {
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
                if (response.data !== undefined && response.data !== null) {
                  console.log(response.data)
                  fetchComments(chapterId, chapter)
                }
              })
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.fetchComments(this.props.match.params.chapterId, this.state.chapter)
  }

  render() {
    const { chapter } = this.state
    return (
      <div>
        <Header handleLogout={this.props.handleLogout} loggedIn={this.props.loggedIn} />
        <Sidebar handleLogout={this.props.handleLogout} loggedIn={this.props.loggedIn} />
        <div className="mainCont">
          {chapter ?
            (
              <div className="chapter">
                <h1 className="chapterTitle">{chapter.title}</h1>
                <p className="contentBody" dangerouslySetInnerHTML={{__html: chapter.content}}></p>
              </div>
            ) : (
              <div className="chapter" />
            )}
          <Comments token={this.state.token} chapterId={this.props.match.params.chapterId}
            fanficId={this.props.match.params.fanficId} chapter={this.state.chapter} resetFields={this.resetFields}
            postComment={this.postComment} submitEdit={this.submitEdit} switchMode={this.switchMode} deleteComment={this.deleteComment}
            fetchComments={this.fetchComments} users={this.props.users} loggedIn={this.state.loggedIn} />
        </div>
        <Footer />
      </div>
    )
  }
}

// <p dangerouslySetInnerHTML={{__html: chapter.content}}></p>
// <iframe src='https://view.officeapps.live.com/op/embed.aspx?src=http://remote.url.tld/path/to/document.doc' width='1366px' height='623px' frameborder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe>