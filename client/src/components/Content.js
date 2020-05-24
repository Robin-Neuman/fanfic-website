import React from 'react'

export default class Content extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <h1 className="pageTitle">{this.props.title}</h1>
                </div>
                {/* Renders out an introduction and news, store this information in the database to be changed on admin page */}
                {this.props.title == "Home" ? (
                    <div>
                        <div className="introduction">
                            <p>Welcome to the home of the fanfic: "I'm in love with a monster with two heads"!
                            This is a newly started website by me (boyfriendo) and Pandis in the hopes of improving
                            my skills in web-development, as well as helping the community grow for this glorious fanfiction!
                            </p>
                        </div>
                        <div className="news">
                            <h1>News</h1>
                            <div>
                                <h3>New chapter out!</h3>
                                <p>Read chapter 12 here...</p>
                            </div>
                            <div>
                                <h3>We now have a Patreon!</h3>
                                <p>Support us here...</p>
                            </div>
                        </div>
                        <div className="featured">
                            <div className="art">
                                <h3>Featured art of the week</h3>
                                <p>This piece by Rebecca...</p>
                            </div>
                            <div className="patreon">
                                <h3>Featured patreon of the month</h3>
                                <p>Jonas has been one of our top patreons for...</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div />
                )}
                {/* THIS WILL NOT BE THE FORUM! Only introduction to the forum */}
                {this.props.title == "Forum" ? (
                    <div>
                        <div className="introduction">
                            <p>This is our forum! An amazing place to share your interests, opinions about the fanfic or just about anythingh you feel like!
                                As long as you treat everyone with respect :)
                            </p>
                        </div>
                    </div>
                ) : (
                    <div />
                )}
            </div>
        )
    }
}