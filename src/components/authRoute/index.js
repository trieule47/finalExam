import React from 'react'
import LoginStatus from '../../util/LoginStatus'
import { Navigate } from 'react-router-dom'

export default function AuthRoute(props) {
  if (LoginStatus()) return <Navigate to="/news" replace />
  return props.children
}
