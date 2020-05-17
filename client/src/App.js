import React from 'react';
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Fanfic from './pages/Fanfic'
import Forum from './pages/Forum'
import Gallery from './pages/Gallery'
import Admin from './pages/Admin'

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Route exact path={"/"} component={Home} />
          <Route path={"/fanfic"} component={Fanfic} />
          <Route path={"/forum"} component={Forum} />
          <Route path={"/gallery"} component={Gallery} />
          <Route path={"/admin"} component={Admin} />
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

