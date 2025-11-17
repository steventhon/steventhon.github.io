import React, { useState } from 'react'

// Simple hash router component (works better with GitHub Pages)
export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/')

  React.useEffect(() => {
    const handleHashChange = () => setCurrentPath(window.location.hash.slice(1) || '/')
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (path) => {
    window.location.hash = path
    setCurrentPath(path)
  }

  return React.Children.map(children, child =>
    React.cloneElement(child, { currentPath, navigate })
  )
}

export const Route = ({ path, component: Component, currentPath, navigate }) => {
  return currentPath === path ? <Component navigate={navigate} /> : null
}
