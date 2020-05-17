import React from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends React.Component {
    render() {
        return (
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/fanfic"}>Fanfic</Link></li>
                <li><Link to={"/forum"}>Forum</Link></li>
                <li><Link to={"/gallery"}>Gallery</Link></li>
            </ul>
        )
    }
}