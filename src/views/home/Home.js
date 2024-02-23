/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
import { React, useState, useReducer, useRef, useEffect } from 'react'

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

import { useDropzone } from 'react-dropzone'
import { ScaleLoader } from 'react-spinners'

import {
  cilTriangle,
  cilMagnifyingGlass,
  cilBeaker,
  cilFilter,
  cilReload,
  cilPlus,
} from '@coreui/icons'
import ExperimentCell from './ExperimentCell'
import Pagination from './Pagination'

ChartJS.register(LinearScale, PointElement, LogarithmicScale, LineElement, Title)

const Home = () => {
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const [currentPage, setCurrentPage] = useState(0)
  const [paginationLength, setPaginationLength] = useState(0)
  const [hasData, setData] = useState(false)

  const [table, setTable] = useState([])
  const [virtualTable, setVirtualTable] = useState([])

  const [visible, setVisible] = useState(false)
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0)

  const commonRef = useRef()

  function upload() {
    setVisible(true)
  }

  subscribe('uploadData', () => upload())

  const [itemsPerPage, setItemsPerPage] = useState(5)
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  useEffect(() => {
    if (!hasData) {
      fetch('https://10.8.0.1:5000/api/portal')
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setVirtualTable(data)
          setTable(data.slice(0, itemsPerPage))
          setData(true)
        })
    } else {
      setTable(virtualTable.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage))
      console.log(itemsPerPage)
    }
    setPaginationLength(Math.ceil(virtualTable.length / itemsPerPage))
  }, [currentPage, hasData, itemsPerPage, virtualTable])

  const resizeTable = (size) => {
    setTable(virtualTable.slice(0 * itemsPerPage, (0 + 1) * itemsPerPage))
    setItemsPerPage(size)
    setData(true)
  }

  function moveContent(page) {
    //setData(false)
    console.log(page)
    setCurrentPage(page)
    //setTable(virtualTable.slice(page * itemsPerPage, (page + 1) * itemsPerPage))

    //commonRef.current.testFunction()
  }

  return (
    <>
      <CModal
        backdrop="static"
        size="lg"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">Upload Wizard</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div style={{ backgroundColor: '#fff', width: '100%', height: '250px' }}></div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Upload</CButton>
        </CModalFooter>
      </CModal>
      <CRow>
        <CCol xs={4}>
          <CCard className="mb-4 relative" style={{ top: '0px', width: '100%' }}>
            <CCardHeader>
              <div>
                <CIcon style={{ marginRight: '10px' }} icon={cilReload} />
                History
              </div>
            </CCardHeader>
            <CCardBody></CCardBody>
          </CCard>
          <CCard className="mb-4 position-sticky" style={{ top: '100px', width: '100%' }}>
            <CCardHeader>
              <div>
                <CIcon style={{ marginRight: '10px' }} icon={cilFilter} />
                Filter
              </div>
            </CCardHeader>
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
          <div>
            <CCard className="mb-4">
              <CCardHeader>
                <CRow>
                  <CCol style={{ marginBottom: '-15px' }}>
                    <CIcon
                      style={{ display: 'inline-block', marginRight: '10px' }}
                      icon={cilBeaker}
                    />
                    <p style={{ display: 'inline-block' }}>Measurement</p>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                {hasData ? (
                  <>
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
                        {table.map((item, index) => (
                          //
                          // Display a table cell
                          //

                          <ExperimentCell data={item} parentRef={commonRef} />
                        ))}
                      </CTableBody>
                    </CTable>
                    <CRow>
                      <CCol xs={8} />
                      <CCol style={{ textAlign: 'right', lineHeight: '2' }}>Items per page</CCol>
                      <CFormSelect
                        onChange={(x) => resizeTable(x.target.value)}
                        id="floatingSelect"
                        style={{
                          width: '70px',
                          float: 'right',
                          marginRight: '10px',
                        }}
                        aria-label="Floating label select example"
                      >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                      </CFormSelect>
                    </CRow>
                  </>
                ) : (
                  <div style={{ padding: '50px', textAlign: 'center' }}>
                    <ScaleLoader color="white" />
                    Fetching Data
                    {/* <CSpinner size="sm" color="primary" style={{ width: '4rem', height: '4rem' }} /> */}
                  </div>
                )}
                {/*
              
                  Pagination item

                */}
              </CCardBody>
              {hasData ? (
                <CCardFooter>
                  <Pagination length={paginationLength} onPageChange={(x) => moveContent(x)} />
                </CCardFooter>
              ) : (
                <></>
              )}
            </CCard>
          </div>
        </CCol>
      </CRow>
    </>
  )
}

export default Home
