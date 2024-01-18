import { React, useState, useReducer, useRef } from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CProgress,
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
  CCardTitle,
  CImage,
  CForm,
  CFormTextarea,
  CToast,
  CToaster,
  CToastHeader,
  CToastBody,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries } from 'react-vis'

import { cilTriangle, cilMagnifyingGlass } from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import { left } from '@popperjs/core'

const Home = () => {
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0)
  const [row, setRow] = useState([
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
    { height: 0, rotation: '90deg', isOpen: false, color: '' },
  ])

  var start = new Date(2020, 0, 1)
  var end = new Date()
  function randomDate(start, end) {
    return convertDate(
      new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
    )
  }

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? '0' + s : s
    }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
  }

  const operators = ['Sanam', 'Maria', 'Amir', 'Majid', 'Patrick']

  var tableData = []

  const tableExample = [
    // eslint-disable-next-line prettier/prettier
    { id: 1, date: randomDate(start, end), operator: operators[Math.floor(Math.random()*operators.length)], sensor: '-', chip: '-' },
    {
      id: 2,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 3,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 4,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 5,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 6,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 7,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 8,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 9,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 10,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 11,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 12,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 13,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 14,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 15,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 16,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 17,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 18,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 19,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 20,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 22,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 23,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 23,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 24,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 25,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 26,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 27,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 28,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 29,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
    {
      id: 30,
      date: randomDate(start, end),
      operator: operators[Math.floor(Math.random() * operators.length)],
      sensor: '-',
      chip: '-',
    },
  ]

  const tableExample2 = [
    { id: 11, date: '20/12/2023', operator: 'Sanam', sensor: 'Cell', chip: 'Cell' },
    { id: 12, date: '20/12/2023', operator: 'Sanam', sensor: 'Cell', chip: 'Cell' },
    { id: 13, date: '20/12/2023', operator: 'Sanam', sensor: 'Cell', chip: 'Cell' },
    { id: 14, date: '20/12/2023', operator: 'Sanam', sensor: 'Cell', chip: 'Cell' },
    { id: 15, date: '20/12/2023', operator: 'Sanam', sensor: 'Cell', chip: 'Cell' },
    { id: 16, date: '20/12/2023', operator: 'Sanam', sensor: 'Cell', chip: 'Cell' },
    { id: 17, date: '20/12/2023', operator: 'Sanam', sensor: 'Cell', chip: 'Cell' },
    { id: 18, date: '20/12/2023', operator: 'Sanam', sensor: 'Cell', chip: 'Cell' },
    { id: 19, date: '20/12/2023', operator: 'Sanam', sensor: 'Cell', chip: 'Cell' },
    { id: 20, date: '20/12/2023', operator: 'Sanam', sensor: 'Cell', chip: 'Cell' },
  ]

  tableData = tableExample

  /*
  function addRow(i) {
    let newRow = row;
    newRow.push({
      height: 30
    })

  }
  */

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

  function onLoadTest(e) {
    console.log('I am load now!')
  }

  function clickedRow(i) {
    if (!row[i].isOpen) {
      let newRow = row
      newRow[i].height = 300
      newRow[i].rotation = '180deg'
      newRow[i].isOpen = true
      newRow[i].color = 'light'
      setRow(newRow)
    } else {
      let newRow = row
      newRow[i].height = 0
      newRow[i].rotation = '90deg'
      newRow[i].isOpen = false
      newRow[i].color = ''
      setRow(newRow)
    }
    forceUpdate()
  }

  function buttonClicked() {
    tableData = tableExample2
    forceUpdate()

    console.log(tableData)
  }

  return (
    <>
      <CRow>
        <CToaster ref={toaster} push={toast} className="p-4" placement="bottom-start" />
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Filters</CCardHeader>
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
            <CButton onClick={() => addToast(exampleToast)}>Send a toast</CButton>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={4}>
          <CCard className="mb-4 position-sticky" style={{ top: '100px' }}>
            <CCardHeader>Filters</CCardHeader>
            <CCardBody>
              <CRow className="m-0">
                <CFormLabel htmlFor="inputPassword" className="col-sm-3 col-form-label">
                  Search
                </CFormLabel>
                <CCol>
                  <CFormInput id="inputPassword" className="border border-primary rounded-5" />
                  <CCol xs={1} style={{ position: 'absolute', marginTop: -30, marginLeft: 10 }}>
                    <CIcon icon={cilMagnifyingGlass} size={'lg'} />
                  </CCol>
                </CCol>
              </CRow>
              <CRow className="col-form-label border-top border-black mt-3">
                <CCol xs={5}>
                  <CFormCheck id="flexCheckDefault" label="Date" defaultChecked />
                </CCol>
                <CCol>
                  <CBadge color="primary">165</CBadge>
                </CCol>
              </CRow>
              <CRow className="col-form-label">
                <CCol xs={5}>
                  <CFormCheck id="flexCheckDefault" label="Operator" />
                </CCol>
                <CCol>
                  <CBadge color="dark">0</CBadge>
                </CCol>
              </CRow>
              <CRow className="col-form-label">
                <CCol xs={5}>
                  <CFormCheck id="flexCheckDefault" label="Sensor" defaultChecked />
                </CCol>
                <CCol>
                  <CBadge color="primary">234</CBadge>
                </CCol>
              </CRow>
              <CRow className="col-form-label">
                <CCol xs={5}>
                  <CFormCheck id="flexCheckDefault" label="Chip" defaultChecked />
                </CCol>
                <CCol>
                  <CBadge color="primary">65</CBadge>
                </CCol>
              </CRow>
              <CRow className="col-form-label">
                <CCol xs={5}>
                  <CFormCheck id="flexCheckDefault" label="Specimen" defaultChecked />
                </CCol>
                <CCol>
                  <CBadge color="primary">390</CBadge>
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
                      className="bg-body-tertiary justify-content-center"
                      style={{ width: 50 }}
                    />
                    <CTableHeaderCell
                      className="bg-body-tertiary text-center"
                      style={{ width: 50 }}
                    >
                      #
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary" style={{ width: 150 }}>
                      Date
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary" style={{ width: 150 }}>
                      Operator
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary" style={{ width: 150 }}>
                      Sensor
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Chip</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {tableData.map((item, index) => (
                    <>
                      <CTableRow
                        v-for="item in tableItems"
                        key={index}
                        onClick={() => clickedRow(index)}
                        style={{
                          cursor: 'pointer',
                          height: 30,
                        }}
                        color={row[index].color}
                      >
                        <CTableDataCell className="text-center">
                          <CIcon
                            style={{ transform: 'rotate(' + row[index].rotation + ')' }}
                            icon={cilTriangle}
                          />
                        </CTableDataCell>
                        <CTableDataCell className="text-center">{item.id}</CTableDataCell>
                        <CTableDataCell>{item.date}</CTableDataCell>
                        <CTableDataCell>{item.operator}</CTableDataCell>
                        <CTableDataCell>{item.sensor}</CTableDataCell>
                        <CTableDataCell>{item.chip}</CTableDataCell>
                      </CTableRow>
                      {row[index].isOpen ? (
                        <CTableRow className="border">
                          <CTableDataCell
                            className="rounded-bottom-3"
                            style={{ boxShadow: 'none' }}
                            colSpan={6}
                          >
                            <CRow className="m-1 mt-4">
                              <CCol xs={2}>Experiment ID</CCol>
                              <CCol>
                                <CFormTextarea disabled rows={1}>
                                  {'#0000' + item.id}
                                </CFormTextarea>
                              </CCol>
                            </CRow>

                            <CRow className="m-1">
                              <CCol xs={2}>Date</CCol>
                              <CCol>
                                <CFormTextarea disabled rows={1}>
                                  {item.date}
                                </CFormTextarea>
                              </CCol>
                            </CRow>

                            <CRow className="m-1">
                              <CCol xs={2}>Operator</CCol>
                              <CCol>
                                <CFormTextarea disabled rows={1}>
                                  {item.operator}
                                </CFormTextarea>
                              </CCol>
                            </CRow>
                            <CRow className="m-1">
                              <CCol xs={2}>Sensor</CCol>
                              <CCol>
                                <CFormTextarea disabled rows={1}>
                                  {item.sensor}
                                </CFormTextarea>
                              </CCol>
                            </CRow>
                            <CRow className="m-1">
                              <CCol xs={2}>Chip</CCol>
                              <CCol>
                                <CFormTextarea disabled rows={1}>
                                  {item.chip}
                                </CFormTextarea>
                              </CCol>
                            </CRow>
                            <CRow className="m-1">
                              <CCol xs={2}>Remark: </CCol>
                              <CCol>
                                <CForm>
                                  <CFormTextarea rows={3}>
                                    DI water after measurement and cleaning with IPA and DI water.
                                    Soaked in IPA for 5 minutes, then in DI water for 5 minutes.
                                    Results differ from DI water before measurement, but consistent
                                    with exp 0004
                                  </CFormTextarea>
                                </CForm>
                              </CCol>
                            </CRow>
                            <CRow className="m-1">
                              <CCol xs={2}>
                                T<sub>start</sub>
                              </CCol>
                              <CCol>
                                <CFormTextarea disabled rows={1}>
                                  15:01:02
                                </CFormTextarea>
                              </CCol>
                            </CRow>
                            <CRow className="m-1 mb-4">
                              <CCol xs={2}>
                                T<sub>end</sub>
                              </CCol>
                              <CCol>
                                <CFormTextarea disabled rows={1}>
                                  15:32:58
                                </CFormTextarea>
                              </CCol>
                            </CRow>
                            <CRow>
                              <CCol>
                                <CButton className="bg-dark w-100">Edit</CButton>
                              </CCol>
                              <CCol>
                                <CButton className="bg-dark w-100">Apply</CButton>
                              </CCol>
                            </CRow>
                          </CTableDataCell>
                        </CTableRow>
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
                </CTableBody>
              </CTable>
              <CRow>
                <CCol className="" xs={1}>
                  <CButton onClick={buttonClicked} color="primary w-75">
                    1
                  </CButton>
                </CCol>
                <CCol>
                  <CButton color="primary">2</CButton>
                </CCol>
                <CCol>
                  <CButton color="primary">3</CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Home
