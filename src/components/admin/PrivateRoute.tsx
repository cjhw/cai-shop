import React, { FC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { isAuth } from '../../helpers/auth'

export interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...res
}) => {
  return (
    <Route
      {...res}
      render={(props) => {
        const auth = isAuth()
        if (auth) {
          return <Component {...props} />
        }
        return <Redirect to="/signin" />
      }}
    />
  )
}

export default PrivateRoute
