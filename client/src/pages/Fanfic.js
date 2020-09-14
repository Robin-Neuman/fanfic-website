import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

export default class Fanfic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      chapters: ""
    }
    this.fetchChapters = this.fetchChapters.bind(this)
  }

  fetchChapters(id) {
    Axios.get(`/content/chapters/${id}`)
      .then((response) => {
        if (response.data) {
          this.setState({ loaded: true, chapters: response.data })
        }
      })
  }

  componentDidMount() {
    if (!this.state.loaded) {
      this.fetchChapters(this.props.match.params.fanficId)
    }
  }

  render() {
    return (
      <div>
        <Header handleLogout={this.props.handleLogout} loggedIn={this.props.loggedIn} />
        <Sidebar handleLogout={this.props.handleLogout} loggedIn={this.props.loggedIn} />
        <div className="mainCont">          
          <h1 className="pageTitle">Chapters</h1>
          {this.state.loaded ? this.state.chapters.chapters.map((chapter, key) => {
            return (
              
              <div className="chapterItem" key={key}>
                <Link to={{
                  pathname: `/fanfics/fanfic/${this.props.match.params.fanficId}/chapter/${chapter.id}`,
                  state: {
                    chapter: chapter
                  }
                }}>
                  <h2> {chapter.title}</h2></Link>
              </div>
            )
          }) : (
              <div className="chapterItem" />
            )}
        </div>
        <Footer />
      </div>
    )
  }
}
