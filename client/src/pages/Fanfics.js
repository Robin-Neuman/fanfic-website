import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

export default class Fanfics extends React.Component {
  render() {
    const { fanfics } = this.props
    return (
      <div>
        <Header handleLogout={this.props.handleLogout} loggedIn={this.props.loggedIn} />
        <Sidebar handleLogout={this.props.handleLogout} loggedIn={this.props.loggedIn} />
        <div className="mainCont">
          <h1 className="pageTitle">Fanfics</h1>
          {fanfics.fanfics ? fanfics.fanfics.map((fanfic, key) => {
            return (
              <div className="fanficItem" key={key}>
                <h4>Title:</h4>
                <Link to={`fanfics/fanfic/${fanfic.id}`}><h1 className="itemTitle">{fanfic.title}</h1></Link>
                <h4>Summary:</h4>
                <p>{fanfic.summary}</p>
              </div>
            )
          }) : (
              <div className="fanficItem" />
            )}
        </div>
        <Footer />
      </div>
    )
  }
}