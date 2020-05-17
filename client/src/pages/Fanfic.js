import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Content from '../components/Content'

export default class Fanfic extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Content title={"Fanfic"} />
                <Footer />
            </div>
        )
    }
}