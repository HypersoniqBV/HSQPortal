import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { logo } from 'src/assets/brand/logo'
import { useNavigate, useParams } from 'react-router-dom'

const Register = () => {
  document.body.style.overflow = 'hidden'
  const navigate = useNavigate()

  const { id } = useParams()
  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)

  fetch('https://10.8.0.1:5000/api/user/fetch?id=' + id)
    .then((res) => res.json())
    .then((dat) => {
      setUsername(dat.username)
      setEmail(dat.email)
    })
    //If we can't confirm the creation ID, return to the login page
    .catch((res) => navigate('/'))

  function createAccount() {
    const password = document.getElementById('password').value
    const repeatedPassword = document.getElementById('repeatedPassword').value

    if (password !== repeatedPassword) {
      console.log('Passwords do not match!')
      return
    }

    var body = { creation_id: id, password: password }
    fetch('https://10.8.0.1:5000/api/user/register', {
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((dat) => {
        if (dat.status === 'OK') {
          navigate('/')
        }
      })
      .catch((dat) => console.log(dat))
  }

  return (
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
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4 rounded-4 border-0">
              <CCardBody className="p-5">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText className="border-0">
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder={username} disabled />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText className="border-0">@</CInputGroupText>
                    <CFormInput placeholder={email} disabled />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText className="border-0">
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      id="password"
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      className="border-0"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText className="border-0">
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      id="repeatedPassword"
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      className="border-0"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="primary" className="border-0" onClick={() => createAccount()}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
