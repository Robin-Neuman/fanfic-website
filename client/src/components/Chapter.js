import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { formatText } from '../helpers'

export default class Chapter extends React.Component {
  render() {
    const chapters = this.props.fanfics.chapters
    let chapterUnparsed = this.props.match.params.fanficId.substring(1, 2)
    let chapterParsed = Number(chapterUnparsed - 1)
    return (
      <div>
      <Header />
        {chapters ? (
          <div className="chapter">
            <h1>{chapters[chapterParsed].title}</h1>
            <p>{chapters[chapterParsed].chapter_content}</p>
          </div>
        ) : (
            <div className="chapter" />
          )}
          <Footer />
      </div>
    )
  }
}
