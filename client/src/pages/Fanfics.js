import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default class Fanfics extends React.Component {
  render() {
    const fanfics = this.props.fanfics.fanfics
    return (
      <div>
        <Header />
        {fanfics ? fanfics.map((fanfic, key) => {
          return (
            <div className="fanficItem" key={key}>
              <Link to={`fanfics/fanfic/${fanfic.id}`}><h1>{fanfic.title}</h1></Link>
              <p>{fanfic.summary}</p>
            </div>
          )
        }) : ( 
          <div className="fanficItem" />
        )}
        <Footer />
      </div>
    )
  }
}