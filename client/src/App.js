import React from 'react';
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import Home from './pages/Home'
import FanficPage from './pages/Fanfics'
import Forum from './pages/Forum'
import Gallery from './pages/Gallery'
import Admin from './pages/admin-pages/Admin'
import AdminFanfic from './pages/admin-pages/AdminFanfic'
import AdminFanficEdit from './pages/admin-pages/AdminFanficEdit'
import AdminChapterEdit from './pages/admin-pages/AdminChapterEdit'
import Fanfic from './pages/Fanfic'
import Chapter from './pages/Chapter'
import Login from './pages/Login';
import Register from './pages/Register';
import { isLoggedIn } from './helpers'

import AdminRoute from './routes/admin_route'

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      users: {},
      news: {},
      fanfics: {},
      loaded: false,
      token: localStorage.getItem('token'),
      loggedIn: false
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    console.log(isLoggedIn(localStorage.getItem('token'), "user"))
    this.setState({ loggedIn: isLoggedIn(localStorage.getItem('token'), "user"), token: localStorage.getItem('token') })
  }

  componentDidMount() {
    axios.all([axios.get('/users'), axios.get('/content/news'), axios.get('/content/fanfics')]).then(axios.spread((...responses) => {
      const users = responses[0].data
      const news = responses[1].data
      const fanfics = responses[2].data
      console.log(users, news, fanfics)
      this.setState({ users: users, news: news, fanfics: fanfics, loaded: true, 
                      loggedIn: isLoggedIn(localStorage.getItem('token'), "user")})
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
          <Route exact path={"/fanfics/fanfic/:fanficId/chapter/:chapterId"} render={(props) => <Chapter {...props} users={this.state.users} 
                            fanfics={this.state.fanfics} token={this.state.token} loggedIn={this.state.loggedIn} />} />
          <Route path={"/forum"} component={Forum} />
          <Route path={"/gallery"} component={Gallery} />
          <Route path={"/login"} render={(props) => <Login {...props} admin={false} handleLogin={this.handleLogin} />} />
          <Route path={"/register"} component={Register} />

          <Route exact path={"/admin"} render={(props) => <Login {...props} admin={true} />} />
          <AdminRoute exact path={"/admin/adminPage"} component={Admin} />
          <AdminRoute exact path={"/admin/adminPage/fanfics"} component={AdminFanfic} fanfics={this.state.fanfics} />
          <AdminRoute exact path={"/admin/adminPage/fanfics/edit/:fanficId"} component={AdminFanficEdit} fanfics={this.state.fanfics} />
          <AdminRoute exact path={"/admin/adminPage/chapter/edit/:chapterId"} component={AdminChapterEdit} fanfics={this.state.fanfics} />
        </BrowserRouter>
        ) : (
          <BrowserRouter />
        )}
      </React.Fragment>
    )
  }
}

