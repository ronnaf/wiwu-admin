import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(state => state.admin.current)

  return (
    <Route
      {...rest}
      render={props => {
        return user && user.emailVerified ? (
          <Component {...props} />
        ) : (
          <Redirect to='/auth-page/sign-in' />
        )
      }}
    />
  )
}

PrivateRoute.propTypes = {
  Component: PropTypes.node
}

export default PrivateRoute
