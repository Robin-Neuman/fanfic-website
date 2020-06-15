import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

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
      this.fetchChapters(this.props.match.params.fanficId)}
  }

  render() {
    return (
      <div>       
        <Header />
        {this.state.loaded ? this.state.chapters.chapters.map((chapter, key) => {
          return (
            <div className="chapterItem" key={key}>
              <Link to={{
                pathname: `/fanfics/fanfic/${this.props.match.params.fanficId}/chapter/${chapter.id}`,
                state: {
                  chapter: chapter
                }
              }}>
              <h1>{chapter.title}</h1></Link>
            </div>
          )
        }) : (
          <div className="chapterItem" />
        )}
        <Footer />
      </div>
    )
  }
}
