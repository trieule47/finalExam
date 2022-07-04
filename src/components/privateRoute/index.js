import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
import LoginStatus from '../../util/LoginStatus'
import ModalApp from '../modal'

export default function PrivateRoute(props) {
  const handleClick = () => {
    localStorage.setItem('isLogin', false)
  }

  if (LoginStatus())
    return (
      <div>
        PrivateRoute
        <ModalApp />
        <button onClick={handleClick}>log out</button>
        {props.children}
      </div>
    )
  return <Navigate to="/login" replace />
}
