import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Content from '../components/Content'

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            users: "",
            loaded: false
        }
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <Header />
                <Content 
                    title={"Home"}
                    users={this.props}
                />                
                <Footer />
            </div>
        )
    }
}