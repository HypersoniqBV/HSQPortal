/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
import { React, useState, useReducer, useRef, useEffect } from 'react'

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

import { cilTriangle, cilMagnifyingGlass, cilCloudUpload } from '@coreui/icons'
import ExperimentCell from './ExperimentCell'
import Pagination from './Pagination'

ChartJS.register(LinearScale, PointElement, LogarithmicScale, LineElement, Title)

const Home = () => {
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const [currentPage, setCurrentPage] = useState(1)
  const [hasData, setData] = useState(false)

  const [table, setTable] = useState([])
  const [virtualTable, setVirtualTable] = useState([])

  const [visible, setVisible] = useState(false)
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0)

  const commonRef = useRef()

  const exampleToast = (
    <CToast>
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <div className="fw-bold me-auto">Upload Succesful</div>
      </CToastHeader>
      <CToastBody>Measurement successfully added to database!</CToastBody>
    </CToast>
  )

  const itemsPerPage = 10

  useEffect(() => {
    fetch('https://10.8.0.1:5000/api/portal')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setVirtualTable(data)
        setTable(data.slice(0, itemsPerPage))
        setData(true)
      })
  }, [])

  function moveContent(page) {
    //setData(false)
    setTable(virtualTable.slice(page * itemsPerPage, (page + 1) * itemsPerPage))

    commonRef.current.testFunction()
  }

  return (
    <>
      <CRow>
        <CToaster ref={toaster} push={toast} className="p-4" placement="bottom-start" />
        <CCol xs={6} style={{ display: 'flex', flexDirection: 'column' }}>
          <CCard className="mb-4">
            <CCardHeader>Quick Select</CCardHeader>
            <CCardBody>
              Welcome to the EIS Data Submission Platform, a dedicated portal for efficiently
              submitting your Electrochemical Impedance Spectroscopy (EIS) measurements. This
              platform streamlines the process – simply select your file, provide optional
              eslint-disable-next-line react/no-unescaped-entities experiment details, and execute a
              prompt upload to our meticulous database. It is important to note that the text
              provided here is solely generated for the purpose of filling space, ensuring a refined
              and efficient submission process through direct access. This enables you to
              effortlessly contribute to our comprehensive EIS database. Simplify your data
              submission with our user-friendly interface tailored for professionalism. For any
              assistance or inquiries, our dedicated support team is readily available. We
              appreciate your commitment to enhancing our EIS database through the use of our
              platform.
            </CCardBody>
            <CModal
              visible={visible}
              onClose={() => setVisible(false)}
              aria-labelledby="LiveDemoExampleLabel"
            >
              <CModalHeader onClose={() => setVisible(false)}>
                <CModalTitle id="LiveDemoExampleLabel">Submit current experiment</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <p>Woohoo, you're reading this text in a modal!</p>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Close
                </CButton>
                <CButton color="primary">Confirm</CButton>
              </CModalFooter>
            </CModal>
          </CCard>
        </CCol>
        <CCol xs={6} style={{ display: 'flex', flexDirection: 'column' }}>
          <CCard className="mb-4 h-100">
            <CCardHeader>Upload Data</CCardHeader>
            <CCardBody style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  marginBottom: '20px',
                  padding: '15px',
                  //backgroundColor: 'rgba(50, 50, 50, 20)',
                }}
              >
                <div className="block" style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <CIcon style={{ color: '#AEAEAE' }} icon={cilCloudUpload} size={'3xl'} />
                    <div style={{ color: '#AEAEAE' }}>
                      <b>Choose a file</b> <br />
                      or drag it here
                    </div>
                  </div>
                </div>
              </div>
              <CButton
                color="primary"
                style={{ bottom: '0px' }}
                onClick={() => setVisible(!visible)}
              >
                Submit
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={4}>
          <CCard className="mb-4 position-sticky" style={{ top: '100px', width: '100%' }}>
            <CCardHeader>Filters</CCardHeader>
            <CCardBody>
              <CRow className="m-0">
                <CFormLabel className="col-sm-3 col-form-label">Search</CFormLabel>
                <CCol>
                  <CFormInput
                    style={{ paddingLeft: 40 }}
                    className="border border-primary rounded-5 search"
                  />
                  <CCol xs={1} style={{ position: 'absolute', marginTop: -30, marginLeft: 10 }}>
                    <CIcon icon={cilMagnifyingGlass} size={'lg'} />
                  </CCol>
                </CCol>
              </CRow>
              <CRow className="col-form-label border-top border-black mt-3" />
              <CRow>
                <CCol xs={2}>
                  <CButton style={{ textAlign: 'center' }}>
                    <CIcon style={{ rotate: '180deg' }} icon={cilTriangle} />
                  </CButton>
                </CCol>
                <CCol
                  xs={5}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <div>Operator</div>
                </CCol>
                <CCol
                  xs={2}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <CBadge color="primary">165</CBadge>
                </CCol>
                <CRow className="m-0">
                  <CCol xs={1}></CCol>
                  <CCol xs={5} className="mb-2">
                    <CFormCheck primary label="Sanam" />
                    <CFormCheck label="Maria" />
                    <CFormCheck label="Zahra" />
                    <CFormCheck label="Amir" />
                  </CCol>
                </CRow>
              </CRow>
              <CRow>
                <CCol xs={2}>
                  <CButton style={{ textAlign: 'center' }}>
                    <CIcon style={{ rotate: '90deg' }} icon={cilTriangle} />
                  </CButton>
                </CCol>
                <CCol
                  xs={5}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <div>Date</div>
                </CCol>
                <CCol
                  xs={2}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <CBadge color="primary">165</CBadge>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Measurements</CCardHeader>
            <CCardBody>
              <CTable align="top" className="mb-2" responsive striped hover>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell
                      className="justify-content-center"
                      style={{
                        borderTopLeftRadius: '10px',
                        backgroundColor: '#571f1f',
                        width: 50,
                      }}
                    />
                    <CTableHeaderCell
                      className="text-center"
                      style={{ backgroundColor: '#571f1f', width: 50 }}
                    >
                      #
                    </CTableHeaderCell>
                    <CTableHeaderCell style={{ backgroundColor: '#571f1f', width: 100 }}>
                      Date
                    </CTableHeaderCell>
                    <CTableHeaderCell style={{ backgroundColor: '#571f1f', width: 100 }}>
                      Operator
                    </CTableHeaderCell>
                    <CTableHeaderCell style={{ backgroundColor: '#571f1f', width: 100 }}>
                      Sensor
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      style={{ backgroundColor: '#571f1f', borderTopRightRadius: '10px' }}
                    >
                      Chip
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {hasData ? (
                    table.map((item, index) => (
                      //
                      // Display a table cell
                      //
                      <ExperimentCell data={item} parentRef={commonRef} />
                    ))
                  ) : (
                    <CTableRow style={{ height: '170px', pointerEvents: 'none' }}>
                      <CTableDataCell
                        colSpan={6}
                        style={{ textAlign: 'center', verticalAlign: 'middle' }}
                      >
                        <CSpinner
                          size="sm"
                          color="primary"
                          style={{ width: '4rem', height: '4rem' }}
                        />
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
              {/*
              
                  Pagination item

                */}
              <Pagination length={18} onPageChange={(x) => moveContent(x)} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Home
