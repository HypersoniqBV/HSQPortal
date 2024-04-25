import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import { logo } from 'src/assets/brand/logo'
import { publish } from 'src/event'
import { UserContext } from 'src/App'

const Login = () => {
  const navigate = useNavigate()
  const { user, setUser, token, setToken } = useContext(UserContext)

  useEffect(() => {
    if (user) {
      navigate('/home')
    }
  }, [])

  function loggedIn() {
    const inputBox = document.getElementById('input-box')
    inputBox.style.animation = 'none'

    const userEl = document.getElementById('username')
    var usernameVal = userEl.value

    const passEl = document.getElementById('password')
    var passwordVal = passEl.value

    var body = {
      username: usernameVal,
      password: passwordVal,
    }

    setUser(true)
    navigate('/home')

    fetch('https://10.8.0.1:5000/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((dat) => {
        if (dat['auth'] === 'OK') {
          // The right password was entered
          setUser(true)
          setToken(dat['token'])
          navigate('/home')
        } else {
          // The wrong password was entered
          inputBox.style.animation = 'none'
          inputBox.style.animation = 'horizontal-shaking 0.3s linear 1'
        }
      })
    //console.log('test')
    //publish('loginButton', '')

    //navigate('/home')
  }

  document.body.style.overflow = 'hidden'

  return (
    <>
      <div className="bg-body-dark min-vh-100 d-flex flex-row align-items-center">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <CContainer>
          <CRow className="mb-3">
            <CIcon customClassName="align-self-center text-center mb-1" icon={logo} height={80} />
            <h5
              className="text-center mb-5"
              style={{ fontFamily: 'sans-serif', letterSpacing: 3, fontSize: 20 }}
            >
              MEASURING INSIGHTS
            </h5>
          </CRow>
          <CRow className="justify-content-center">
            <CCol xl={5}>
              <CCardGroup>
                <CCard
                  className="p-4 rounded-4 border-0"
                  style={{ animation: 'none' }}
                  id="input-box"
                >
                  <CCardBody>
                    <CForm>
                      <h2>Login</h2>
                      <p className="text-body-secondary">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText className="border-0">
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          className="border-0 border-primary"
                          placeholder="Username"
                          autoComplete="username"
                          id="username"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText className="border-0">
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          className="border-0"
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          id="password"
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton color="primary" className="px-4" onClick={() => loggedIn()}>
                            Login
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Login
