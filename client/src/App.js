import React from 'react';
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import Home from './pages/Home'
import Fanfic from './pages/Fanfic'
import Forum from './pages/Forum'
import Gallery from './pages/Gallery'
import Admin from './pages/Admin'

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      users: {},
      news: {},
      loaded: false
    }
  }

  componentDidMount() {
    axios.all([axios.get('/users'), axios.get('/news')]).then(axios.spread((...responses) => {
      const users = responses[0].data
      const news = responses[1].data
      this.setState({ users: users, news: news, loaded: true })
    }))
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Route exact path={"/"} render={(props) => <Home {...props} users={this.state.users} news={this.state.news} />} />
          <Route path={"/fanfic"} component={Fanfic} />
          <Route path={"/forum"} component={Forum} />
          <Route path={"/gallery"} component={Gallery} />
          <Route path={"/admin"} component={Admin} />
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

