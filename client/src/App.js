import React from 'react';
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import Home from './pages/Home'
import FanficPage from './pages/FanficPage'
import Forum from './pages/Forum'
import Gallery from './pages/Gallery'
import Admin from './pages/Admin'
import Fanfic from './components/Fanfic'
import Chapter from './components/Chapter'
import Login from './pages/Login';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      users: {},
      news: {},
      fanfics: {},
      loaded: false
    }
  }

  componentDidMount() {
    axios.all([axios.get('http://localhost:3000/users'), axios.get('http://localhost:3000/news'), axios.get('http://localhost:3000/fanfics')]).then(axios.spread((...responses) => {
      const users = responses[0].data
      const news = responses[1].data
      const fanfics = responses[2].data
      console.log(users, news, fanfics)
      this.setState({ users: users, news: news, fanfics: fanfics, loaded: true })
    }))
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Route exact path={"/"} render={(props) => <Home {...props} users={this.state.users} news={this.state.news} />} />
          <Route exact path={"/fanficPage"} render={(props) => <FanficPage {...props} fanfics={this.state.fanfics} />} />
          <Route exact path={"/fanficPage/fanfic:fanficId"} render={(props) => <Fanfic {...props} fanfics={this.state.fanfics} />} />
          <Route exact path={"/fanficPage/fanfic:fanficId/chapter:chapterId"} render={(props) => <Chapter {...props} users={this.state.users} fanfics={this.state.fanfics} />} />
          <Route path={"/forum"} component={Forum} />
          <Route path={"/gallery"} component={Gallery} />
          <Route path={"/admin"} component={Admin} />
          <Route path={"/login"} component={Login} />
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

