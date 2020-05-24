import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import News from '../components/News'

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <div>
          <h1 className="pageTitle">Home</h1>
          <div className="introduction">
            <p>Welcome to the home of the fanfic: "I'm in love with a monster with two heads"!
            This is a newly started website by me (boyfriendo) and Pandis in the hopes of improving
            my skills in web-development, as well as helping the community grow for this glorious fanfiction!
            </p>
          </div>
          <News
            users={this.props.users}
            news={this.props.news}
          />
        </div>
        <Footer />
      </div>
    )
  }
}