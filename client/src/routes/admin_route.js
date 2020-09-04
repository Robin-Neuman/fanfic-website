import React from 'react'
import { isLoggedIn } from '../helpers'
import { Redirect, Route } from 'react-router-dom'

const AdminRoute = ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn(localStorage.getItem("token"), ["admin"]) ? (
          <Component {...props} fanfics={rest.fanfics} token={rest.token} admin={true} />
        ) : (
          <Redirect to={{ pathname: '/admin', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default AdminRoute