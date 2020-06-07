import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { formatText } from '../helpers'
import Comments from './Comments'

export default class Chapter extends React.Component {
  render() {
    const chapters = this.props.fanfics.chapters
    const comments = this.props.fanfics.chapterComments
    let chapter = this.props.match.params.fanficId
    return (
      <div>
        <Header />
        {chapters ? (
          <div className="chapter">
            <h1>{chapters[chapter].title}</h1>
            <p>{chapters[chapter].content}</p>
          </div>
          ) : (
            <div className="chapter" />
        )}
        <Comments comments={comments} />
        <Footer />
      </div>
    )
  }
}
