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

ChartJS.register(LinearScale, PointElement, LogarithmicScale, LineElement, Title)

const Home = () => {

  return (
    <>
    <h1>Welcome back, Jasper</h1>
    <div style={{ borderBottom: "solid" }} />
    <CRow>
        <CCol className='pt-3'>
            <div style={{width: "200px", height: "200px", backgroundColor: "#000", borderRadius: "10px" }} />
            <div style={{width: "200px", height: "200px", backgroundColor: "#000", borderRadius: "10px" }} />
            <div style={{width: "200px", height: "200px", backgroundColor: "#000", borderRadius: "10px" }} />
            <div style={{width: "200px", height: "200px", backgroundColor: "#000", borderRadius: "10px" }} />
            <div style={{width: "200px", height: "200px", backgroundColor: "#000", borderRadius: "10px" }} />
        </CCol>
    </CRow>
    </>
  )
}

export default Home
