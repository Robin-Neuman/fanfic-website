import React from 'react';
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Axios from 'axios'

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
import { isLoggedIn, getRole } from './helpers'

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
      loggedIn: false,
      role: ""
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout() {
    localStorage.removeItem('token')
    this.setState({ loggedIn: false, token: "" })
  }

  handleLogin(role) {
    this.setState({ loggedIn: isLoggedIn(localStorage.getItem('token')), token: localStorage.getItem('token'), role: role })
  }

  componentDidMount() {
    //localStorage.removeItem('token')
    Axios.all([Axios.get('/users'), Axios.get('/content/news'), Axios.get('/content/fanfics')]).then(Axios.spread((...responses) => {
      const users = responses[0].data
      const news = responses[1].data
      const fanfics = responses[2].data
      this.setState({
        users: users, news: news, fanfics: fanfics, loaded: true,
        loggedIn: isLoggedIn(localStorage.getItem('token')),
        role: getRole(localStorage.getItem('token'))
      })
    }))
  }

  render() {
    
  console.log("reloaded")
    return (
      <React.Fragment>
        {this.state.loaded ? (
          <BrowserRouter>
            <Route exact path={"/"} render={(props) => <Home {...props}
              role={this.state.role} loggedIn={this.state.loggedIn} handleLogout={this.handleLogout}
              users={this.state.users} news={this.state.news} />} />
            <Route exact path={"/fanfics"} render={(props) => <FanficPage {...props}
              role={this.state.role} loggedIn={this.state.loggedIn} handleLogout={this.handleLogout}
              fanfics={this.state.fanfics} />} />
            <Route exact path={"/fanfics/fanfic/:fanficId"} render={(props) => <Fanfic {...props}
              role={this.state.role} loggedIn={this.state.loggedIn} handleLogout={this.handleLogout}
              fanfics={this.state.fanfics} />} />
            <Route exact path={"/fanfics/fanfic/:fanficId/chapter/:chapterId"} render={(props) => <Chapter {...props}
              role={this.state.role} loggedIn={this.state.loggedIn} handleLogout={this.handleLogout}
              users={this.state.users} fanfics={this.state.fanfics} token={this.state.token} loggedIn={this.state.loggedIn} />} />
            <Route path={"/forum"} render={(props) => <Forum {...props}
              role={this.state.role} loggedIn={this.state.loggedIn} />} />
            <Route path={"/gallery"} render={(props) => <Gallery {...props}
              role={this.state.role} loggedIn={this.state.loggedIn} />} />
            <Route path={"/register"} render={(props) => <Register {...props}
              role={this.state.role} loggedIn={this.state.loggedIn} />} />
            <LoginRoute path={"/login"} component={Login} role={this.state.role} handleLogin={this.handleLogin} />

            <AdminRoute exact path={"/adminPage"} component={Admin}
              handleLogout={this.handleLogout} />
            <AdminRoute exact path={"/adminPage/fanfics"} component={AdminFanfic}
              handleLogout={this.handleLogout} fanfics={this.state.fanfics} token={this.state.token}/>
            <AdminRoute exact path={"/adminPage/fanfics/edit/:fanficId"} component={AdminFanficPage}
              handleLogout={this.handleLogout} fanfics={this.state.fanfics} token={this.state.token} />
          </BrowserRouter>
        ) : (
            <BrowserRouter />
          )}
      </React.Fragment>
    )
  }
}

