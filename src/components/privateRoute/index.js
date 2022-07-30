import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
import LoginStatus from '../../util/LoginStatus'

export default function PrivateRoute(props) {
  const handleClick = () => {
    localStorage.setItem('isLogin', false)
  }

  if (LoginStatus())
    return (
      <div>
        {props.children}
      </div>
    )
  return <Navigate to="/login" replace />
}
