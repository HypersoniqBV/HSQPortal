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
  cilHistory,
  cilArrowLeft,
} from '@coreui/icons'
import ExperimentCell from './ExperimentCell'
import Pagination from './Pagination'
import FilterCell from './FilterCell'
import BasicDropzone from './Dropzone'
import Calendar from './Calendar'

ChartJS.register(LinearScale, PointElement, LogarithmicScale, LineElement, Title)

const Home = () => {
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const [currentPage, setCurrentPage] = useState(0)
  const [paginationLength, setPaginationLength] = useState(0)
  const [hasData, setData] = useState(false)

  const [table, setTable] = useState([])
  const [filteredTable, setFilteredTable] = useState([])
  const [dataset, setDataset] = useState([])

  const [visible, setVisible] = useState(false)
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0)

  const [isLoading, setIsLoading] = useState(false)

  const [history, setHistory] = useState([])
  const [filterInput, setFilterInput] = useState('')
  const commonRef = useRef()

  function upload() {
    setVisible(true)
  }

  subscribe('uploadData', () => upload())

  const [itemsPerPage, setItemsPerPage] = useState(15)
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  var [filters, setFilter] = useState([])
  var [updateFilters, setUpdateFilters] = useState(false)

  useEffect(() => {
    if (!hasData) {
      //Test
    } else {
      setTable(filteredTable.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage))
    }
    setPaginationLength(Math.ceil(filteredTable.length / itemsPerPage))
  }, [currentPage, dataset, filteredTable, hasData, itemsPerPage])

  useEffect(() => {
    if (updateFilters) {
      let data = dataset
      console.log(filters)

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

  useEffect(() => {}, [hasData, isLoading])

  function onDateRangeSelected(date1, date2) {
    //Reset the current loaded data
    setData(false)
    setFilteredTable([])
    setDataset([])
    setIsLoading(true)

    var time1 = date1.getTime() - date1.getTimezoneOffset() * 1000 * 60
    var time2 = date2.getTime() - date2.getTimezoneOffset() * 1000 * 60

    //Get the new data
    fetch('https://10.8.0.1:5000/api/portal?t1=' + time1 + '&t2=' + time2)
      .then((response) => response.json())
      .then((data) => {
        setDataset(data)
        setFilteredTable(data)
        setTable(filteredTable.slice(0, itemsPerPage))
        setData(true)
        setIsLoading(false)
      })
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
          <CRow>
            <CCol className="bg-black m-3" style={{ height: 500, borderRadius: '10px' }}>
              Hello
            </CCol>
          </CRow>
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
                <CIcon style={{ marginRight: '10px' }} icon={cilHistory} />
                History
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable align="top" className="mb-2" responsive striped hover>
                <CTableBody>
                  {/*}
                  {table.map((item, index) => (
                    //
                    // Display a table cell
                    //

                    <ExperimentCell
                      data={item}
                      onClickedCellCB={onClickedCellCallBack}
                      parentRef={commonRef}
                    />
                  ))}
                  */}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
          <CCard className="mb-4 position-sticky" style={{ top: '100px', width: '100%' }}>
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
                            style={{ backgroundColor: '#571f1f', width: 50, margin: 0, padding: 0 }}
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
                      <CCol style={{ textAlign: 'right', lineHeight: '2' }}>Items per page</CCol>
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
                  <div style={{ padding: '50px', textAlign: 'center' }}>
                    <ScaleLoader color="white" />
                    Fetching Data
                    {/* <CSpinner size="sm" color="primary" style={{ width: '4rem', height: '4rem' }} /> */}
                  </div>
                ) : (
                  <div> No results found </div>
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

export default Home
