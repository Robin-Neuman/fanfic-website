import React from 'react';
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import Home from './pages/Home'
import FanficPage from './pages/Fanfics'
import Forum from './pages/Forum'
import Gallery from './pages/Gallery'
import Admin from './pages/Admin'
import AdminFanfic from './pages/AdminFanfic'
import Fanfic from './pages/Fanfic'
import Chapter from './pages/Chapter'
import Login from './pages/Login';
import Register from './pages/Register';

import AdminRoute from './routes/admin_route'

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
    axios.all([axios.get('/users'), axios.get('/content/news'), axios.get('/content/fanfics')]).then(axios.spread((...responses) => {
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
        {this.state.loaded ? (
          <BrowserRouter>
          <Route exact path={"/"} render={(props) => <Home {...props} users={this.state.users} news={this.state.news} />} />
          <Route exact path={"/fanfics"} render={(props) => <FanficPage {...props} fanfics={this.state.fanfics} />} />
          <Route exact path={"/fanfics/fanfic/:fanficId"} render={(props) => <Fanfic {...props} fanfics={this.state.fanfics} />} />
          <Route exact path={"/fanfics/fanfic/:fanficId/chapter/:chapterId"} render={(props) => <Chapter {...props} users={this.state.users} fanfics={this.state.fanfics} />} />
          <Route path={"/forum"} component={Forum} />
          <Route path={"/gallery"} component={Gallery} />
          <Route path={"/login"} render={(props) => <Login {...props} admin={false} />} />
          <Route path={"/register"} component={Register} />

          <Route exact path={"/admin"} render={(props) => <Login {...props} admin={true} />} />
          <AdminRoute exact path={"/admin/adminPage"} component={Admin} />
          <AdminRoute exact path={"/admin/adminPage/fanfics"} component={AdminFanfic} fanfics={this.state.fanfics} />
        </BrowserRouter>
        ) : (
          <BrowserRouter />
        )}
      </React.Fragment>
    )
  }
}

