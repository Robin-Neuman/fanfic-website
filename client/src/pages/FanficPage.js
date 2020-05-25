import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Fanfics from '../components/Fanfics'

export default class Fanfic extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Fanfics
          fanfics={this.props.fanfics}
        />
        <Footer />
      </div>
    )
  }
}