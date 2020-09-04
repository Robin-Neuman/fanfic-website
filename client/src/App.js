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
import AdminFanficPage from './pages/admin-pages/AdminFanficPage'
import Fanfic from './pages/Fanfic'
import Chapter from './pages/Chapter'
import Login from './pages/Login';
import Register from './pages/Register';
import { isLoggedIn } from './helpers'

import AdminRoute from './routes/admin_route'
import LoginRoute from './routes/login_route'

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
  
  handleLogout() {
    localStorage.removeItem('token')
    this.setState({ loggedIn: false, token: "" })
  }

  handleLogin() {
    this.setState({ loggedIn: isLoggedIn(localStorage.getItem('token'), ["user"]), token: localStorage.getItem('token') })
  }

  componentDidMount() {
    axios.all([axios.get('/users'), axios.get('/content/news'), axios.get('/content/fanfics')]).then(axios.spread((...responses) => {
      const users = responses[0].data
      const news = responses[1].data
      const fanfics = responses[2].data
      this.setState({ users: users, news: news, fanfics: fanfics, loaded: true, 
                      loggedIn: isLoggedIn(localStorage.getItem('token'), ["user"])})
    }))
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loaded ? (
          <BrowserRouter>
          <Route exact path={"/"} render={(props) => <Home {...props} loggedIn={this.state.loggedIn} handleLogout={this.handleLogout} users={this.state.users} news={this.state.news} />} />
          <Route exact path={"/fanfics"} render={(props) => <FanficPage {...props} loggedIn={this.state.loggedIn} handleLogout={this.handleLogout} fanfics={this.state.fanfics} />} />
          <Route exact path={"/fanfics/fanfic/:fanficId"} render={(props) => <Fanfic {...props} loggedIn={this.state.loggedIn} handleLogout={this.handleLogout} fanfics={this.state.fanfics} />} />
          <Route exact path={"/fanfics/fanfic/:fanficId/chapter/:chapterId"} 
            render={(props) => <Chapter {...props} loggedIn={this.state.loggedIn} handleLogout={this.handleLogout} users={this.state.users} fanfics={this.state.fanfics} token={this.state.token} loggedIn={this.state.loggedIn} />} />
          <Route path={"/forum"} component={Forum} loggedIn={this.state.loggedIn} />
          <Route path={"/gallery"} component={Gallery} loggedIn={this.state.loggedIn}/>
          <LoginRoute path={"/login"} component={Login} admin={false} handleLogin={this.handleLogin} />
          <Route path={"/register"} component={Register} loggedIn={this.state.loggedIn} />

          <LoginRoute exact path={"/admin"} component={Login} admin={true} />
          <AdminRoute exact path={"/admin/adminPage"} component={Admin} handleLogout={this.handleLogout} />
          <AdminRoute exact path={"/admin/adminPage/fanfics"} component={AdminFanfic} handleLogout={this.handleLogout} fanfics={this.state.fanfics} />
          <AdminRoute exact path={"/admin/adminPage/fanfics/edit/:fanficId"} component={AdminFanficPage} handleLogout={this.handleLogout} fanfics={this.state.fanfics} token={this.state.token} />
        </BrowserRouter>
        ) : (
          <BrowserRouter />
        )}
      </React.Fragment>
    )
  }
}

