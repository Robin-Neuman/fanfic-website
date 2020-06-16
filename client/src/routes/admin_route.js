import React from 'react'
import { isLoggedIn } from '../helpers'
import { Redirect, Route } from 'react-router-dom'

const AdminRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const auth = isLoggedIn
  return (
    <Route
      {...rest}
      render={props =>
        auth(localStorage.getItem("token"), "admin") ? (
          <Component {...props} fanfics={rest.fanfics} admin={true} />
        ) : (
          <Redirect to={{ pathname: '/admin', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default AdminRoute