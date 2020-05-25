import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default class Fanfic extends React.Component {
  render() {
    const chapters = this.props.fanfics.chapters
    return (
      <div>
      <Header />
        {chapters ? chapters.map((chapter, key) => {
          return (
            <div className="chapterItem" key={key}>
              <Link to={`/fanficPage/fanfic${this.props.match.params.fanficId}/chapter:${chapter.id}`}><h1>{chapter.title}</h1></Link>
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
