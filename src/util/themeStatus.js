import React from 'react'

export default function ThemeStatus() {
  const themeStatus = localStorage.getItem('theme')
  if (themeStatus === 'dark') return 'dark'
  return 'light'
}