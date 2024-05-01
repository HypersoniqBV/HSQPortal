/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
import { React, useState, useReducer, useRef, useEffect, useContext } from 'react'

import { subscribe, unsubscribe } from 'src/event'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormLabel,
  CFormInput,
  CFormCheck,
  CToast,
  CToaster,
  CToastHeader,
  CToastBody,
  CBadge,
  CSpinner,
  CModalBody,
  CModalFooter,
  CCardFooter,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormTextarea,
  CFormSelect,
  CForm,
  CHeader,
  CDropdownDivider,
  CDropdownHeader,
  CNavItem,
  CNavGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LogarithmicScale,
  LineElement,
  Title,
} from 'chart.js'
import { cilAlarm, cilUser } from '@coreui/icons'

import _nav from 'src/_nav'
import { useNavigate } from 'react-router-dom'
import { UserContext } from 'src/App'



const Home = () => {
  const navigate = useNavigate()
  const { userMeta } = useContext(UserContext)

  function appTile(item) {
    console.log('../' + item.href)

    return (
      <div className="app-tile shadow" 
      onClick={() => navigate('../' + item.href.substring(2))}
      style={{ cursor: 'pointer', position: "relative", borderRadius: "10px", marginBottom: "0px", marginRight: "10px", textAlign: 'center', fontSize: 13 }} >
        <div style={{marginTop: '50px' }}>{item.name}</div>
        <div className='vertical-center center'>
          <div className='' style={{width: "25px", height: "50px"}}>
            {item.icon}
          </div>
          {/*<CIcon className='mb-2' size="2xl" icon={item.icon} style={{width: "50px", height: "50px"}} />*/}
        </div>
      </div>
    )
  }

  const sortedNav = {}
  let tempNav = []
  let currCategory = ""

  for( let i = 0; i < _nav.length; i++ ) {
    const obj = _nav[i]
    if(obj.component.render.displayName === "CNavItem") {
      if(obj.name !== "Dashboard") {
        tempNav.push(obj)
      }
    }
    
    if(obj.component.render.displayName === "CNavTitle") {
      if (tempNav.length > 0) {
        sortedNav[currCategory] = tempNav
        tempNav = []
      }
      currCategory = obj.name
    }
  }

  if (tempNav.length > 0) {
    sortedNav[currCategory] = tempNav
    tempNav = []
  }

  console.log(sortedNav)

  const testMessages = [
    {
      msg: " Maria commented on experiment #12 of project HSQ#0320",
      time: "8 hours ago"
    },
    {
      msg: " Zahra commented on experiment #12 of project HSQ#0320",
      time: "8 hours ago"
    },
    {
      msg: " Zahra commented on experiment #12 of project HSQ#0320",
      time: "8 hours ago"
    },
    {
      msg: " Maria commented on experiment #12 of project HSQ#0320",
      time: "8 hours ago"
    },
    {
      msg: " Maria commented on experiment #12 of project HSQ#0320",
      time: "8 hours ago"
    },
    {
      msg: " Maria commented on experiment #12 of project HSQ#0320",
      time: "8 hours ago"
    },
    {
      msg: " Maria commented on experiment #12 of project HSQ#0320",
      time: "8 hours ago"
    },
    {
      msg: " Maria commented on experiment #12 of project HSQ#0320",
      time: "8 hours ago"
    },
  ]

  return (
    <>
    <CRow className='mb-3'>
      <CCol xs={1} style={{height: "100px", width: "120px" }}>
        <div className='w-100 h-100 p-2 text-center'>
          <div className='w-100 h-100 p-3 rounded-3 border-white border-2 border'>
          <CIcon icon={cilUser} className='w-100 h-100'/>
          </div>
        </div>
      </CCol>
      <CCol xs={7}>
        <h1>Welcome, {userMeta.first_name}</h1>
        <p>Last logged in - 30/04/2024</p>
      </CCol>
    </CRow>
    <CRow>
      <CCol xs={6}>
        <CCard>
          <CCardHeader>Quick Menu</CCardHeader>
          <CCardBody>
            {Object.entries(sortedNav).map(([key, value]) => (
              <CRow className='pt-3 p-0 m-0 mb-2' style={{ display: 'flex' }}>
                <h5>{key}</h5>
                {value.map((k, v) => (
                  appTile(k)
                ))}
              </CRow>
            ))}
          </CCardBody>
        </CCard>
      </CCol>
      <CCol>
        <CCard className='h-100'>
          <CCardHeader>Notifications</CCardHeader>
          <CCardBody style={{position: 'relative', padding: 0 }}>
            <div style={{ position: 'absolute', overflow: 'scroll', width: '100%', height: '100%' }}>
              {testMessages.map((item, index) => (
              <CRow className='m-2'>
              <div className="shadow rounded-3 pt-2 pb-2 notification-box" style={{ height: "70px", verticalAlign: "middle" }}>
                <CRow>
                  <CCol xs={1} style={{ position: 'relative' }}>
                    <div className='bg-white rounded-circle center' style={{ width: '10px', height: '10px' }} />
                  </CCol>
                  <CCol>
                    <CRow className='fw-bold'>{item.msg}</CRow>
                    <CRow style={{fontSize: 2}}>{item.time}</CRow>
                  </CCol>
                </CRow>
              </div>
            </CRow>
              ))}
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    { /*
    <CRow className='mt-4'>
      <CCol style={{ height: "30px" }}className="wave bg-white"/>
          </CRow> */}
    </>
  )
}

export default Home
