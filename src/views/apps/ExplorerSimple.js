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
  CForm,
  CHeader,
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
} from '@coreui/icons'
import ExperimentCell from './ExperimentCell'
import Pagination from './Pagination'
import FilterCell from './FilterCell'
import BasicDropzone from './Dropzone'
import Calendar from './Calendar'
import HoverCard from './HoverCard'

ChartJS.register(LinearScale, PointElement, LogarithmicScale, LineElement, Title)

const ExplorerSimple = () => {
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

  const [visible, setVisible] = useState(false)
  const [uploadingData, setUploadingData] = useState(false)
  const [waitingUploadingData, setWaitingUploadData] = useState(false)

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0)

  const [isLoading, setIsLoading] = useState(false)

  const [history, setHistory] = useState([])
  const [filterInput, setFilterInput] = useState('')
  const commonRef = useRef()

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
    setVisible(true)
  }

  function warnThroughToaster(status, msg) {
    addToast(toasterFabricator(status, msg))
  }

  subscribe('uploadData', () => upload())

  const [itemsPerPage, setItemsPerPage] = useState(15)
  const fileUpload = useRef('')

  var [filters, setFilter] = useState([])
  var [updateFilters, setUpdateFilters] = useState(false)
  var [uploadFiles, setUploadFiles] = useState([])
  const [isIdRequest, setIsIdRequest] = useState(false)

  var Buffer = require('buffer/').Buffer

  const { id } = useParams()

  useEffect(() => {
    setIsIdRequest(id !== undefined)

    if (id !== undefined) {
      fetch('http://api.hypersoniqtech.com/portal/id?id=' + id)
        .then((response) => response.json())
        .then((data) => {
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
  }, [id])

  useEffect(() => {
    if (!hasData) {
      //Test
    } else {
      setTable(filteredTable.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage))
    }
    setPaginationLength(Math.ceil(filteredTable.length / itemsPerPage))
  }, [currentPage, dataset, filteredTable, hasData, itemsPerPage])

  useEffect(() => {}, [sessionID, needsSessionID])

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
      fetch('http://api.hypersoniqtech.com/portal?t1=' + time1 + '&t2=' + time2)
        .then((response) => response.json())
        .then((data) => {
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

  async function handleFileUpload(e) {
    const files = Array.from(e.target.files)

    var id = sessionID

    if (needsSessionID) {
      id = (Math.random() + 1).toString(36).substring(2)
      setSessionID(id)
      console.log(id)
      setNeedsSessionID(false)
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

        await fetch('http://api.hypersoniqtech.com/process', {
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

    fetch('http://api.hypersoniqtech.com/submit', {
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

    fetch('http://api.hypersoniqtech.com/empty', {
      method: 'POST',
      body: JSON.stringify(body),
    }).then((res) => console.log(res))

    setNeedsSessionID(true)
    setUploadFiles([])
    setVisible(false)
    setUploadingData(false)
  }

  useBeforeUnload(() => closeUploadWindow())

  useEffect(() => {}, [uploadFiles, waitingUploadingData])

  return (
    <>
      <CToaster className="p-3" placement="bottom-start" push={toast} ref={toaster} />
      <CModal
        backdrop="static"
        size="lg"
        visible={visible}
        onClose={() => closeUploadWindow()}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">Upload Wizard</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {!uploadingData ? (
            <CRow>
              <CCol
                {...getRootProps({ isFocused, isDragAccept, isDragReject })}
                className="border upload bg-primary-25 border-primary glow-effect"
                style={{
                  height: 500,
                  borderRadius: '10px',
                  borderWidth: 2,
                  marginLeft: 100,
                  marginRight: 100,
                }}
              >
                <div className="center">Drop or click *here* to upload .mpt file</div>
                <input {...getInputProps()} type="file" onChange={handleFileUpload} />
              </CCol>
            </CRow>
          ) : (
            <>
              <CRow>
                <CCol className="rounded p-3 pt-0 m-3 mt-0">
                  <div className="pl-2 fw-bold fs-3 mb-3">New Experiment</div>
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
                          <CFormTextarea
                            id="date"
                            placeholder="DD / MM / YYYY"
                            rows={1}
                            style={{ resize: 'none' }}
                          ></CFormTextarea>
                        </CCol>
                      </CRow>
                      <CRow className="m-1 pb-2 mb-2 border-bottom border-light">
                        <CCol xs={4}>Operator</CCol>
                        <CCol>
                          <CFormTextarea
                            id="operator"
                            rows={1}
                            style={{ resize: 'none' }}
                          ></CFormTextarea>
                        </CCol>
                      </CRow>
                      <CRow className="m-1 pb-2 mb-2 border-bottom border-light">
                        <CCol xs={4}>Device</CCol>
                        <CCol>
                          <CFormTextarea
                            id="device"
                            rows={1}
                            style={{ resize: 'none' }}
                          ></CFormTextarea>
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
                          <CFormTextarea
                            id="start_time"
                            placeholder="MM:HH"
                            rows={1}
                            style={{ resize: 'none' }}
                          ></CFormTextarea>
                        </CCol>
                      </CRow>
                      <CRow className="m-1 pb-2 mb-2 border-bottom border-light">
                        <CCol xs={4}>Finish Time</CCol>
                        <CCol>
                          <CFormTextarea
                            id="finish_time"
                            placeholder="MM:HH"
                            rows={1}
                            style={{ resize: 'none' }}
                          ></CFormTextarea>
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
                          <CFormTextarea
                            id="bg_batch"
                            placeholder="DD / MM / YYYY"
                            rows={1}
                            style={{ resize: 'none' }}
                          ></CFormTextarea>
                        </CCol>
                      </CRow>
                      <CRow className="m-1 pb-2 mb-2 border-bottom border-light">
                        <CCol xs={4}>Background Solution Concentration</CCol>
                        <CCol>
                          <CFormTextarea
                            id="bg_concentration"
                            rows={1}
                            style={{ resize: 'none' }}
                          ></CFormTextarea>
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
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => closeUploadWindow()}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => uploadFilesFinal()}>
            Upload
          </CButton>
        </CModalFooter>
      </CModal>
      <CRow className="">
        <CCol xs={2} />
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
                                onClickedCellCB={onClickedCellCallBack}
                                parentRef={commonRef}
                                toaster={warnThroughToaster}
                              />
                            ))}
                          </CTableBody>
                        </CTable>
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
            </CCard>
          </div>
        </CCol>
        <CCol xs={2} />
      </CRow>
    </>
  )
}

export default ExplorerSimple
