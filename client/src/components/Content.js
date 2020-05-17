import React from 'react'

export default class Content extends React.Component {
    render() {
        return (
            <body>
                <div>
                    <h1>{this.props.title}</h1>
                </div>
            </body>
        )
    }
}