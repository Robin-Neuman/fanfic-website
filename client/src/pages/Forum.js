import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default class Forum extends React.Component {
    render() {
        return (
            <div>
                <Header handleLogout={this.props.handleLogout} loggedIn={this.props.loggedIn} />
                <Footer />
            </div>
        )
    }
}