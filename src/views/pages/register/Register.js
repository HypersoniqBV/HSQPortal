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
import { useParams } from 'react-router-dom'

const Register = () => {
  document.body.style.overflow = 'hidden'

  const { id } = useParams()
  console.log(id)

  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)

  fetch('https://10.8.0.1:5000/api/register/user_sub?id=' + id)
    .then((res) => res.json())
    .then((dat) => {
      setUsername(dat.username)
      setEmail(dat.email)
    })

  return (
    <div className="bg-body-dark min-vh-100 d-flex flex-row align-items-center">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <CContainer>
        <CRow>
          <CIcon customClassName="align-self-center text-center mb-1" icon={logo} height={40} />
          <h5 className="text-center mb-5">Measuring Insights</h5>
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
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      className="border-0"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="primary" className="border-0">
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
