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
import { cilAlarm } from '@coreui/icons'

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
      style={{ cursor: 'pointer', position: "relative", borderRadius: "10px", marginBottom: "0px", marginRight: "10px", textAlign: 'center'}} >
        <div className='mt-3'>{item.name}</div>
        <div className='vertical-center center'>
          <div className='' style={{width: "35px", height: "35px"}}>
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

  return (
    <>
    <CRow>
      <CCol xs={6}>
        <CCard>
          <CCardHeader>Quick Menu</CCardHeader>
          <CCardBody>
            {Object.entries(sortedNav).map(([key, value]) => (
              <CRow className='pt-3 p-0 m-0' style={{ display: 'flex' }}>
                <h4>{key}</h4>
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
          <CCardHeader></CCardHeader>
          <CCardBody>Welcome back, {userMeta.first_name}</CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </>
  )
}

export default Home
