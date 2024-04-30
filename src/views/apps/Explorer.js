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

import { useDropzone } from 'react-dropzone'
import { ScaleLoader } from 'react-spinners'
import { useBeforeUnload, useParams, useSearchParams } from 'react-router-dom'

import {
  cilTriangle,
  cilMagnifyingGlass,
  cilBeaker,
  cilFilter,
  cilReload,
  cilPlus,
  cilHistory,
  cilArrowLeft,
  cilWarning,
  cilCheck,
  cilX,
  cilCloudDownload,
  cilPencil,
  cilStar,
  cilShare,
  cilDescription,
  cilSquare,
  cilGraph,
  cilXCircle,
  cilIndentIncrease,
  cilCompass,
} from '@coreui/icons'
import ExperimentCell from './ExperimentCell'
import Pagination from './Pagination'
import FilterCell from './FilterCell'
import BasicDropzone from './Dropzone'
import Calendar from './Calendar'
import HoverCard from './HoverCard'
import { Scatter } from 'react-chartjs-2'
import { UserContext } from 'src/App'

ChartJS.register(LinearScale, PointElement, LogarithmicScale, LineElement, Title)

const Explorer = () => {
  const [networkError, setNetworkError] = useState(false)
  const [sessionID, setSessionID] = useState(0)
  const [needsSessionID, setNeedsSessionID] = useState(true)

  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const [currentPage, setCurrentPage] = useState(0)
  const [paginationLength, setPaginationLength] = useState(0)
  const [hasData, setData] = useState(false)

  const [table, setTable] = useState([])
  const [filteredTable, setFilteredTable] = useState([])
  const [dataset, setDataset] = useState([])

  const [uploadWindowVisible, setUploadWindowVisible] = useState(false)
  const [uploadingData, setUploadingData] = useState(false)
  const [waitingUploadingData, setWaitingUploadData] = useState(false)

  const [compareWindowVisible, setCompareWindowVisible] = useState(false)

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0)

  const [isLoading, setIsLoading] = useState(false)

  const [history, setHistory] = useState([])
  const [filterInput, setFilterInput] = useState('')
  const commonRef = useRef()

  const { user, setUser, token, setToken, userMeta, setUserMeta } = useContext(UserContext)

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: {
      mpt: ['.mpt'],
    },
  })

  function toasterFabricator(status, msg) {
    return (
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
            <rect width="100%" height="100%" fill="#A41F13"></rect>
          </svg>
          <div className="fw-bold me-auto">{status}</div>
          <small>Now</small>
        </CToastHeader>
        <CToastBody>{msg}</CToastBody>
      </CToast>
    )
  }

  function upload() {
    setUploadWindowVisible(true)
  }

  function compare() {
    setCompareWindowVisible(true)
  }

  function warnThroughToaster(status, msg) {
    addToast(toasterFabricator(status, msg))
  }

  subscribe('uploadData', () => upload())
  subscribe('compareData', () => compare())

  const [itemsPerPage, setItemsPerPage] = useState(15)
  const fileUpload = useRef('')

  var [filters, setFilter] = useState([])
  var [updateFilters, setUpdateFilters] = useState(false)
  var [uploadFiles, setUploadFiles] = useState([])
  const [isIdRequest, setIsIdRequest] = useState(false)

  var Buffer = require('buffer/').Buffer

  useEffect(() => {
    if (!hasData) {
      //Test
    } else {
      setTable(filteredTable.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage))
    }
    setPaginationLength(Math.ceil(filteredTable.length / itemsPerPage))
  }, [currentPage, dataset, filteredTable, hasData, itemsPerPage])

  useEffect(() => {
    if (needsSessionID) {
      generateSessionID()
    }
  }, [needsSessionID])

  useEffect(() => {
    if (updateFilters) {
      let data = dataset

      for (var id in filters) {
        var key = filters[id].key
        var value = filters[id].value

        if (value.length > 0) {
          let filteredData = []
          let k = key.toLowerCase()

          if (k === 'sensor') {
            k = 'sensor_type'
          }

          if (k === 'chip') {
            k = 'chip_type'
          }

          if (k === 'solution') {
            k = 'bg_solution'
          }

          if (k === 'concentration') {
            k = 'bg_concentration'
          }

          for (var idx in value) {
            const filterVal = value[idx]
            // eslint-disable-next-line no-loop-func
            filteredData.push(
              ...data.filter(
                // eslint-disable-next-line no-loop-func
                (item) => item[k] === filterVal,
              ),
            )
          }
          data = filteredData
        }
      }
      data.sort((a, b) => a.id - b.id)

      setCurrentPage(0)
      setFilteredTable(data)
      setUpdateFilters(false)
    }
  }, [dataset, filters, updateFilters])

  useEffect(() => {}, [hasData, isLoading, networkError])

  function onDateRangeSelected(date1, date2) {
    if (!isIdRequest) {
      //Reset the current loaded data
      setData(false)
      setFilteredTable([])
      setDataset([])
      setIsLoading(true)

      var time1 = date1.getTime() - date1.getTimezoneOffset() * 1000 * 60
      var time2 = date2.getTime() - date2.getTimezoneOffset() * 1000 * 60

      //Get the new data
      fetch('https://10.8.0.1:5000/api/portal?t1=' + time1 + '&t2=' + time2, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)

          setDataset(data)
          setFilteredTable(data)
          setTable(filteredTable.slice(0, itemsPerPage))
          setData(true)
          setIsLoading(false)
        })
        .catch((res) => {
          addToast(toasterFabricator('Network Error', res.toString()))
          setNetworkError(true)
        })
    }
  }

  const resizeTable = (size) => {
    setTable(filteredTable.slice(0 * itemsPerPage, (0 + 1) * itemsPerPage))
    setItemsPerPage(size)
    setData(true)
  }

  const replaceOrAppend = (arr, val, compFn) => {
    const res = [...arr]
    const i = arr.findIndex((v) => compFn(v, val))
    if (i === -1) res.push(val)
    else res.splice(i, 1, val)
    return res
  }

  function onClickedCellCallBack(val) {
    console.log(val)
  }

  function onFiltercallBack(cat, val) {
    const containsItem = filters.some((item) => item.key === cat)
    console.log(containsItem)

    var newFilter = filters
    if (!containsItem) {
      newFilter.push({
        key: cat,
        value: val,
      })
    } else {
      const objIndex = newFilter.findIndex((item) => item.key === cat)
      newFilter[objIndex].value = val
    }
    setFilter(newFilter)
    setUpdateFilters(true)
  }

  function moveContent(page) {
    //setData(false)
    setCurrentPage(page)
    //setTable(virtualTable.slice(page * itemsPerPage, (page + 1) * itemsPerPage))

    //commonRef.current.testFunction()
  }

  function generateSessionID() {
    var id = (Math.random() + 1).toString(36).substring(2)
    setSessionID(id)
    console.log(id)
    setNeedsSessionID(false)
    return id
  }

  async function handleFileUpload(e) {
    const files = Array.from(e.target.files)

    var id = sessionID

    if (needsSessionID) {
      id = generateSessionID()
    }

    async function sendFiles(files, id) {
      var respondData = []

      for await (const file of files) {
        //const blob = await file.arrayBuffer()
        //const buffer = new Uint8Array(blob)
        //console.log(buffer)

        const txt = await file.text()
        const encodedString = Buffer.from(txt).toString('base64')
        // const str = Buffer.from(encodedString, 'base64')

        var enc = new TextDecoder('utf-8')

        var body = {
          data: encodedString,
          file_name: file.name,
          session_id: id,
        }

        // console.log(encodedString)

        await fetch('https://10.8.0.1:5000/api/process', {
          method: 'POST',
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          // eslint-disable-next-line no-loop-func
          .then((data) => {
            setUploadingData(true)
            if (!uploadFiles.some((x) => x.uuid === data.uuid)) {
              respondData = [...respondData, data]
            }
            console.log(respondData)
          })
          .catch((res) => {
            addToast(toasterFabricator('Network Error', res.statusText))
            setNetworkError(true)
            console.log(res)
          })
      }
      return respondData
    }

    setWaitingUploadData(true)
    await sendFiles(files, id).then((res) => setUploadFiles([...uploadFiles, ...res]))
    setWaitingUploadData(false)
  }

  function removeUploadItem(item) {
    setUploadFiles(uploadFiles.filter((i) => i !== item))
  }

  function uploadFilesFinal() {
    //Test
    var meta_data = {}
    var labels = [
      'date',
      'operator',
      'start_time',
      'finish_time',
      'sensor_type',
      'chip_type',
      'chip_number',
      'solution',
      'bg_solution',
      'bg_batch',
      'bg_concentration',
      'remarks',
      'device',
      'conductivity',
    ]

    labels.forEach((e) => {
      const element = document.getElementById(e)
      meta_data[e] = element.value
    })

    var body = {
      session_id: sessionID,
      meta: meta_data,
    }

    fetch('https://10.8.0.1:5000/api/submit', {
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((dat) => {
        if (dat.status === 'OK') {
          closeUploadWindow()
        }
      })
  }

  function closeUploadWindow() {
    var body = {
      session_id: sessionID,
    }

    fetch('https://10.8.0.1:5000/api/empty', {
      method: 'POST',
      body: JSON.stringify(body),
    }).then((res) => console.log(res))

    setNeedsSessionID(true)
    setUploadFiles([])
    setUploadWindowVisible(false)
    setUploadingData(false)
  }

  function closeCompareWindow() {
    setCompareWindowVisible(false)
  }

  function onDateEnter(e) {
    //console.log(e.target.value)
    console.log(e.target.value.length)
  }

  useBeforeUnload(() => closeUploadWindow())

  useEffect(() => {}, [uploadFiles, waitingUploadingData])

  return (
    <>
      <CToaster className="p-3" placement="bottom-start" push={toast} ref={toaster} />

      <CModal
        backdrop="static"
        size="lg"
        visible={uploadWindowVisible}
        onClose={() => closeUploadWindow()}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">Upload Wizard</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol className="rounded p-3 pt-0 m-3 mt-0">
              <div className="pl-2 fw-bold fs-3 mb-3">New Experiment</div>

              <div
                className={uploadingData ? 'meta-visible' : 'meta-hidden'}
                style={{ overflow: 'hidden' }}
              >
                <CRow className="m-0 mb-2">
                  <CButton
                    className="rounded-pill"
                    color="dark"
                    style={{ width: '15%', marginRight: '5px' }}
                  >
                    <CIcon icon={cilDescription} style={{ marginRight: '5px' }} /> Info
                  </CButton>
                  <CButton
                    className="rounded-pill"
                    color={'dark'}
                    style={{ width: '15%', marginRight: '5px' }}
                  >
                    <CIcon icon={cilGraph} style={{ marginRight: '5px' }} /> Graph
                  </CButton>
                </CRow>
                <CRow className="m-0 rounded-4">
                  <CCol
                    className="rounded-3  p-3"
                    style={{
                      backgroundColor: '',
                    }}
                  >
                    <CRow className="m-1 pb-2 mb-2 border-bottom border-light">
                      <CCol xs={4}>UIN</CCol>
                      <CCol>
                        <CFormTextarea disabled rows={1} style={{ resize: 'none' }}>
                          {sessionID}
                        </CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="m-1 pb-2 mb-2 border-bottom border-light">
                      <CCol xs={4}>Date</CCol>
                      <CCol>
                        <CFormInput
                          id="date"
                          placeholder="DD / MM / YYYY"
                          rows={1}
                          style={{ resize: 'none' }}
                          type="date"
                        ></CFormInput>
                      </CCol>
                    </CRow>
                    <CRow className="m-1 pb-2 mb-2 border-bottom border-light">
                      <CCol xs={4}>Operator</CCol>
                      <CCol>
                        <CFormTextarea disabled id="operator" rows={1} style={{ resize: 'none' }}>
                          {String(userMeta.first_name) + ' ' + String(userMeta.last_name)}
                        </CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="m-1 pb-2 mb-2 border-bottom border-light">
                      <CCol xs={4}>Device</CCol>
                      <CCol>
                        <CFormTextarea disabled id="device" rows={1} style={{ resize: 'none' }}>
                          {uploadFiles.length > 0 ? uploadFiles[0].device : ''}
                        </CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="m-1 pb-2 mb-2 border-bottom border-light">
                      <CCol xs={4}>Comment</CCol>
                      <CCol>
                        <CFormTextarea
                          id="remarks"
                          rows={3}
                          style={{ resize: 'none' }}
                        ></CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="m-1 pb-2 mb-2 border-bottom border-light">
                      <CCol xs={4}>Start Time</CCol>
                      <CCol>
                        <CFormInput
                          id="start_time"
                          placeholder="MM:HH"
                          rows={1}
                          style={{ resize: 'none' }}
                          type="time"
                        ></CFormInput>
                      </CCol>
                    </CRow>
                    <CRow className="m-1 pb-2 mb-2 border-bottom border-light">
                      <CCol xs={4}>Finish Time</CCol>
                      <CCol>
                        <CFormInput
                          id="finish_time"
                          placeholder="MM:HH"
                          rows={1}
                          style={{ resize: 'none' }}
                          type="time"
                        ></CFormInput>
                      </CCol>
                    </CRow>
                    <CRow className="m-1 pb-2 mb-2 border-bottom border-light">
                      <CCol xs={4}>Sensor</CCol>
                      <CCol>
                        <CFormTextarea
                          id="sensor_type"
                          rows={1}
                          style={{ resize: 'none' }}
                        ></CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="m-1 pb-2 mb-2 border-bottom border-light">
                      <CCol xs={4}>Chip</CCol>
                      <CCol>
                        <CFormTextarea
                          id="chip_type"
                          rows={1}
                          style={{ resize: 'none' }}
                        ></CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="m-1 pb-2 mb-2 border-bottom border-light">
                      <CCol xs={4}>Chip Number</CCol>
                      <CCol>
                        <CFormTextarea
                          id="chip_number"
                          rows={1}
                          style={{ resize: 'none' }}
                        ></CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="m-1 pb-2 mb-2 border-bottom border-light">
                      <CCol xs={4}>Solution</CCol>
                      <CCol>
                        <CFormTextarea
                          id="solution"
                          rows={1}
                          style={{ resize: 'none' }}
                        ></CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="m-1 pb-2 mb-2 border-bottom border-light">
                      <CCol xs={4}>Background Solution</CCol>
                      <CCol>
                        <CFormTextarea
                          id="bg_solution"
                          rows={1}
                          style={{ resize: 'none' }}
                        ></CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="m-1 pb-2 mb-2 border-bottom border-light">
                      <CCol xs={4}>Background Solution Date</CCol>
                      <CCol>
                        <CFormInput
                          id="bg_batch"
                          placeholder="DD / MM / YYYY"
                          rows={1}
                          style={{ resize: 'none' }}
                          type="date"
                        ></CFormInput>
                      </CCol>
                    </CRow>
                    <CRow className="m-1 pb-2 mb-2 border-bottom border-light">
                      <CCol xs={4}>Background Solution Concentration</CCol>
                      <CCol>
                        <CFormInput
                          id="bg_concentration"
                          rows={1}
                          style={{ resize: 'none' }}
                        ></CFormInput>
                      </CCol>
                    </CRow>
                    <CRow className="m-1 pb-2 mb-2">
                      <CCol xs={4}>Conductivity</CCol>
                      <CCol>
                        <CFormTextarea
                          id="conductivity"
                          rows={1}
                          style={{ resize: 'none' }}
                        ></CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="m-1 pb-2 mb-2">
                      <CCol xs={4} className="p-0">
                        <CDropdown autoClose="outside" className="w-100 bg-dark">
                          <CDropdownToggle style={{ textAlign: 'left' }}></CDropdownToggle>
                          <CDropdownMenu className="w-100">
                            <CDropdownHeader>Filter Categories</CDropdownHeader>
                            <CForm className="px-2">
                              <CFormInput></CFormInput>
                            </CForm>
                            <CDropdownDivider />
                            <CDropdownItem>Background Solution</CDropdownItem>
                            <CDropdownItem>Background Solution Date</CDropdownItem>
                            <CDropdownItem>Background Solution Concentration</CDropdownItem>
                            <CDropdownItem>Background 6</CDropdownItem>
                            <CDropdownItem>Background 9</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </CCol>
                      <CCol>
                        <CFormTextarea
                          id="conductivity"
                          rows={1}
                          style={{ resize: 'none' }}
                          disabled
                        ></CFormTextarea>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
                <div className="pl-2 fw-bold fs-3 mb-2"></div>
                {uploadFiles.map((item, index) => (
                  <HoverCard msg={item.warning}>
                    <div>
                      <CIcon
                        icon={item.status === 'OK' ? cilCheck : cilX}
                        size="xl"
                        style={{ marginLeft: '5px', marginRight: '20px' }}
                      />
                    </div>
                    <div className="">{item.file}</div>
                    <div
                      onMouseDown={() => removeUploadItem(item)}
                      style={{ cursor: 'pointer', marginLeft: 'auto', marginRight: 0 }}
                    >
                      <CIcon
                        icon={cilPlus}
                        size="xl"
                        style={{
                          transform: 'rotateZ(45deg)',
                        }}
                      />
                    </div>
                  </HoverCard>
                ))}
              </div>

              <HoverCard>
                {waitingUploadingData ? (
                  <CCol className="text-center">
                    <CSpinner style={{ width: '25px', height: '25px' }} />
                  </CCol>
                ) : (
                  <CCol
                    {...getRootProps({ isFocused, isDragAccept, isDragReject })}
                    className="w-100 h-100 p-0 text-center"
                    style={{ cursor: 'pointer' }}
                  >
                    <input {...getInputProps()} type="file" onChange={handleFileUpload} />
                    <CIcon
                      icon={cilPlus}
                      size="xl"
                      style={{ marginRight: '10px', height: '25px' }}
                    />
                  </CCol>
                )}
              </HoverCard>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => closeUploadWindow()}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={() => uploadFilesFinal()}>
            Upload
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        backdrop="static"
        size="xl"
        visible={compareWindowVisible}
        onClose={() => closeCompareWindow()}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">Compare Wizard</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="m-2">
            <CCol style={{ height: 500 }} xs={8} className="bg-dark rounded border-right"></CCol>
            <CCol className="bg-dark rounded"></CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => closeCompareWindow()}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CRow>
        <CCol xs={4}>
          <CCard className="position-sticky" style={{ top: '90px' }}>
            <CCardHeader>
              <div>
                <CIcon style={{ marginRight: '10px' }} icon={cilFilter} />
                Filter
              </div>
            </CCardHeader>
            <CCardBody>
              <Calendar onDateRangeSelected={onDateRangeSelected} />
              <CRow className="m-0">
                <CFormLabel className="col-sm-3 col-form-label">Search</CFormLabel>
                <CCol>
                  <CFormInput
                    style={{ paddingLeft: 40 }}
                    className="border border-primary rounded-5 search"
                    placeholder=""
                    onChange={(value) => setFilterInput(value.target.value)}
                  />
                  <CCol xs={1} style={{ position: 'absolute', marginTop: -30, marginLeft: 10 }}>
                    <CIcon icon={cilMagnifyingGlass} size={'lg'} />
                  </CCol>
                </CCol>
              </CRow>
              <CRow className="col-form-label border-top" />
              {['Operator', 'Sensor', 'Chip', 'Solution', 'Concentration'].map((item, index) => (
                <FilterCell
                  cat={item}
                  onChange={onFiltercallBack}
                  dataset={dataset}
                  filter={filterInput}
                />
              ))}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
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
                {!networkError ? (
                  <>
                    {filteredTable.length > 0 ? (
                      <>
                        <CTable align="top" className="mb-2" responsive striped hover>
                          <CTableHead className="text-nowrap">
                            <CTableRow>
                              <CTableHeaderCell
                                className="justify-content-center"
                                style={{
                                  borderRadius: '25% 0% 0% 25%',
                                  backgroundColor: '#571f1f',
                                  width: 50,
                                }}
                              />
                              <CTableHeaderCell
                                className="text-center"
                                style={{
                                  backgroundColor: '#571f1f',
                                  width: 50,
                                  margin: 0,
                                  padding: 0,
                                }}
                              >
                                <CButton
                                  className="fw-bold"
                                  style={{ width: '100%', textAlign: 'center' }}
                                >
                                  #
                                </CButton>
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                style={{
                                  backgroundColor: '#571f1f',
                                  width: 120,
                                  padding: 0,
                                  margin: 0,
                                }}
                              >
                                <CButton
                                  className="fw-bold"
                                  style={{ width: '100%', textAlign: 'left' }}
                                >
                                  Date
                                </CButton>
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                style={{
                                  backgroundColor: '#571f1f',
                                  width: 100,
                                  margin: 0,
                                  padding: 0,
                                }}
                              >
                                <CButton
                                  className="fw-bold"
                                  style={{ width: '100%', textAlign: 'left' }}
                                >
                                  Operator
                                </CButton>
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                style={{
                                  backgroundColor: '#571f1f',
                                  width: 120,
                                  margin: 0,
                                  padding: 0,
                                }}
                              >
                                <CButton
                                  className="fw-bold"
                                  style={{ width: '100%', textAlign: 'left' }}
                                >
                                  Sensor
                                </CButton>
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                style={{
                                  width: '40%',
                                  backgroundColor: '#571f1f',
                                }}
                              >
                                Chip
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="justify-content-center"
                                style={{
                                  borderRadius: '0% 25% 25% 0%',
                                  backgroundColor: '#571f1f',
                                  width: 50,
                                }}
                              />
                            </CTableRow>
                          </CTableHead>

                          <CTableBody>
                            {table.map((item, index) => (
                              //
                              // Display a table cell
                              //

                              <ExperimentCell
                                data={item}
                                onClickedCellCallBack={onClickedCellCallBack}
                                parentRef={commonRef}
                                toaster={warnThroughToaster}
                              />
                            ))}
                          </CTableBody>
                        </CTable>
                        <CRow>
                          <CCol style={{ lineHeight: '2' }} xs={8}>
                            {filteredTable.length > 1
                              ? 'Found ' + filteredTable.length + ' results'
                              : 'Found 1 result'}
                          </CCol>
                          <CCol style={{ textAlign: 'right', lineHeight: '2' }}>
                            Items per page
                          </CCol>
                          <CFormSelect
                            onChange={(x) => resizeTable(x.target.value)}
                            id="floatingSelect"
                            style={{
                              width: '70px',
                              float: 'right',
                              marginRight: '10px',
                            }}
                            value={itemsPerPage}
                            aria-label="Floating label select example"
                          >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </CFormSelect>
                        </CRow>
                      </>
                    ) : !hasData && isLoading ? (
                      <div style={{ height: 200, textAlign: 'center', position: 'relative' }}>
                        <div className="center">
                          <ScaleLoader color="white" />
                          Fetching Data
                        </div>
                        {/* <CSpinner size="sm" color="primary" style={{ width: '4rem', height: '4rem' }} /> */}
                      </div>
                    ) : (
                      <div> No results found </div>
                    )}
                  </>
                ) : (
                  <>
                    <div style={{ position: 'relative', textAlign: 'center', height: 200 }}>
                      <div className="center">
                        <CIcon icon={cilWarning} size="3xl" />
                        <div className="m-1">No connection with the database</div>
                      </div>
                    </div>
                  </>
                )}
                {/*
              
                  Pagination item

                */}
              </CCardBody>
              {paginationLength ? (
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

export default Explorer
