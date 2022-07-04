import React from 'react'

export default function LoginStatus() {
  const loginStatus = JSON.parse(localStorage.getItem('isLogin'))

  if (loginStatus) return true
  return false
}
