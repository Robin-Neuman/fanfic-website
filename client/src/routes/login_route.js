import React from 'react'
import { isLoggedIn } from '../helpers'
import { Redirect, Route } from 'react-router-dom'

const LoginRoute = ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn(localStorage.getItem("token"), ["admin", "user"]) ? (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        ) : (
          <Component {...props} handleLogin={rest.handleLogin} admin={false} />
        )
      }
    />
  )
}

export default LoginRoute