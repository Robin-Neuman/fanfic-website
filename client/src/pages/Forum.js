import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default class Forum extends React.Component {
    render() {
        return (
            <div>
                <Header loggedIn={this.props.loggedIn} />
                <Footer />
            </div>
        )
    }
}