import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Fanfics from '../pages/Fanfics'

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