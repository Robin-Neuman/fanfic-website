import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

export default class Forum extends React.Component {
    render() {
        return (
            <div>
                <Header handleLogout={this.props.handleLogout} loggedIn={this.props.loggedIn} />
                <Sidebar handleLogout={this.props.handleLogout} loggedIn={this.props.loggedIn} />
                <div className="mainCont">

                </div>
                <Footer />
            </div>
        )
    }
}