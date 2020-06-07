import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default class Fanfic extends React.Component {
  render() {
    const chapters = this.props.fanfics.chapters
    let fanfic = this.props.match.params.fanficId
    let fanficChapters = []
    if (chapters) {
      for (let i = 0; i < chapters.length; i++) {
        if (chapters[i].fanfic_id == fanfic) {
          console.log(chapters[i].fanfic_id)
        }
      }
    }
    return (
      <div>
        <Header />
        {chapters ? chapters.map((chapter, key) => {
          return (
            <div className="chapterItem" key={key}>
              <Link to={`/fanficPage/fanfic${this.props.match.params.fanficId}/chapter${chapter.id}`}><h1>{chapter.title}</h1></Link>
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
