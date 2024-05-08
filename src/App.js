import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import { subscribe } from './event'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode, colorMode } = useColorModes(
    'coreui-free-react-admin-template-theme',
  )
  const storedTheme = useSelector((state) => state.theme)

  const [token, setToken] = React.useState(null)

  // Set if the user is authenticated or not
  const [user, setUser] = React.useState(false)
  const [userMeta, setUserMeta] = React.useState(null)

  const fakeAuth = () =>
    new Promise((resolve) => {
      setTimeout(() => resolve('2342f2f1d131rf12'), 250)
    })

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (colorMode === 'light') {
    setColorMode('dark')
  }

  function login() {
    setUser(true)
    console.log('Connected!')
  }

  subscribe('loginButton', () => login())

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <UserContext.Provider
          value={{
            user: user,
            setUser: setUser,
            token: token,
            setToken: setToken,
            userMeta: userMeta,
            setUserMeta: setUserMeta,
          }}
        >
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register/:id" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route
              path="*"
              name="Home"
              element={
                <ProtectedRoute user={user}>
                  <DefaultLayout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </UserContext.Provider>
      </Suspense>
    </HashRouter>
  )
}

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ user, children }) => {
  console.log(user)
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default App
export const UserContext = React.createContext(null)
