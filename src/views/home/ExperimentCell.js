/* eslint-disable react/prop-types */
import { React, useState, useReducer, useEffect } from 'react'
import {
  CTableRow,
  CTableDataCell,
  CRow,
  CCol,
  CFormTextarea,
  CForm,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilApplications,
  cilBeaker,
  cilCalendar,
  cilClock,
  cilCommand,
  cilCommentBubble,
  cilDescription,
  cilDrop,
  cilFile,
  cilGraph,
  cilInfo,
  cilPencil,
  cilShare,
  cilSquare,
  cilStar,
  cilTrash,
  cilTriangle,
  cilUser,
} from '@coreui/icons'
import { Scatter } from 'react-chartjs-2'
import zoomPlugin from 'chartjs-plugin-zoom'

const nyquist_options = {
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Nyquist Diagram',
      color: '#FFF',
      font: {
        size: 20,
      },
      padding: {
        top: 10,
        bottom: 30,
      },
    },
    zoom: {
      pan: {
        enabled: true,
        modifierKey: 'ctrl',
      },
      limits: {
        y: { min: 'original', max: 'original' },
        x: { min: 'original', max: 'original' },
      },
      zoom: {
        wheel: {
          enabled: true,
          modifierKey: 'ctrl',
        },
        pinch: {
          enabled: true,
        },
        drag: {
          enabled: true,
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
          backgroundColor: 'rgba(54, 162, 235, 0.3)',
        },
        mode: 'xy',
      },
    },
  },
  animation: {
    duration: 1000,
  },
  responsive: true,
  scales: {
    x: {
      grid: {
        display: true,
        color: '#444',
      },
      beginAtZero: true,
      type: 'linear',
      title: {
        display: true,
        text: 'Real-Axis',
        color: 'white',
      },
      ticks: {
        color: '#FFF',
        callback: function (value) {
          if (Math.floor(value) === value) {
            return value.toExponential()
          }
        },
      },
    },
    y: {
      grid: {
        display: true,
        color: '#444',
      },
      beginAtZero: true,
      type: 'linear',
      title: {
        display: true,
        text: 'Imaginary-Axis',
        color: 'white',
      },
      ticks: {
        color: '#FFF',
        callback: function (value) {
          if (Math.floor(value) === value) {
            return value.toExponential()
          }
        },
      },
      /*
      ticks: {
        callback: (val) => {
          if (Math.log10(val) % 1 === 0) {
            return val.toExponential()
          } else {
            return ' '
          }
        },
      },
      */
    },
  },
}

const bode_options_gain = {
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Bode Diagram',
      color: '#FFF',
      font: {
        size: 20,
      },
      padding: {
        top: 10,
        bottom: 30,
      },
    },
    zoom: {
      pan: {
        enabled: true,
        modifierKey: 'ctrl',
      },
      limits: {
        y: { min: 'original', max: 'original' },
        x: { min: 'original', max: 'original' },
      },
      zoom: {
        wheel: {
          enabled: true,
          modifierKey: 'ctrl',
        },
        pinch: {
          enabled: true,
        },
        drag: {
          enabled: true,
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
          backgroundColor: 'rgba(54, 162, 235, 0.3)',
        },
        mode: 'xy',
      },
    },
  },
  animation: {
    duration: 1000,
  },
  responsive: true,
  scales: {
    x: {
      grid: {
        display: true,
        color: '#444',
      },
      beginAtZero: true,
      type: 'logarithmic',
      title: {
        display: true,
        text: 'Real-Axis',
        color: 'white',
      },
      ticks: {
        color: '#FFF',
        callback: function (value) {
          if (Math.floor(value) === value) {
            if (Math.log10(value) % 1 === 0) {
              return Math.round(value).toExponential()
            } else {
              return ' '
            }
          }
        },
      },
    },
    y: {
      grid: {
        display: true,
        color: '#444',
      },
      beginAtZero: true,
      type: 'logarithmic',
      title: {
        display: true,
        text: 'Imaginary-Axis',
        color: 'white',
      },
      ticks: {
        color: '#FFF',
        callback: function (value) {
          if (Math.floor(value) === value) {
            if (Math.log10(value) % 1 === 0) {
              return Math.round(value).toExponential()
            }
          }
        },
      },
      /*
      ticks: {
        callback: (val) => {
          if (Math.log10(val) % 1 === 0) {
            return val.toExponential()
          } else {
            return ' '
          }
        },
      },
      */
    },
  },
}

const bode_options_phase = {
  maintainAspectRatio: false,
  plugins: {
    zoom: {
      pan: {
        enabled: true,
        modifierKey: 'ctrl',
      },
      limits: {
        y: { min: 'original', max: 'original' },
        x: { min: 'original', max: 'original' },
      },
      zoom: {
        wheel: {
          enabled: true,
          modifierKey: 'ctrl',
        },
        pinch: {
          enabled: true,
        },
        drag: {
          enabled: true,
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
          backgroundColor: 'rgba(54, 162, 235, 0.3)',
        },
        mode: 'xy',
      },
    },
  },
  animation: {
    duration: 1000,
  },
  responsive: true,
  scales: {
    x: {
      grid: {
        display: true,
        color: '#444',
      },
      beginAtZero: true,
      type: 'logarithmic',
      title: {
        display: true,
        text: 'Real-Axis',
        color: 'white',
      },
      ticks: {
        color: '#FFF',
        callback: function (value) {
          if (Math.floor(value) === value) {
            if (Math.log10(value) % 1 === 0) {
              return Math.round(value).toExponential()
            }
          }
        },
      },
    },
    y: {
      grid: {
        display: true,
        color: '#444',
      },
      beginAtZero: true,
      type: 'linear',
      title: {
        display: true,
        text: 'Imaginary-Axis',
        color: 'white',
      },
      ticks: {
        color: '#FFF',
        callback: function (value) {
          if (Math.floor(value) === value) {
            return value.toExponential()
          }
        },
      },
      /*
      ticks: {
        callback: (val) => {
          if (Math.log10(val) % 1 === 0) {
            return val.toExponential()
          } else {
            return ' '
          }
        },
      },
      */
    },
  },
}

function dataSet(values) {
  return {
    datasets: [
      {
        data: values,
        backgroundColor: 'rgba(204, 57, 57, 1)',
        pointRadius: 2,
        pointHoverRadius: 2,
      },
    ],
  }
}

function testFunction() {
  console.log('hello')
}

function ExperimentCell({ data, onClickedCellCB }) {
  const [cellState, setCellState] = useState({
    height: 0,
    rotation: '90deg',
    isOpen: false,
    color: '',
  })

  const [showAll, setShowAll] = useState(false)
  const [showAllRotation, setShowAllRotation] = useState('90deg')
  const [isSelected, setSelected] = useState(false)
  const [isFavorite, setFavorite] = useState(false)
  const [isEditModeEnabled, setEditModeEnabled] = useState(false)
  const [graphMode, setGraphMode] = useState('nyquist')

  useEffect(() => {}, [graphMode])

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0)

  useEffect(() => {}, [showAll, showAllRotation, isSelected, isFavorite])

  useEffect(() => {
    onClickedCell(true)
  }, [data])

  function onClickedCell(forceClosed = false) {
    if (cellState.isOpen || forceClosed) {
      let newCellState = cellState
      newCellState.height = 0
      newCellState.rotation = '90deg'
      newCellState.isOpen = false
      newCellState.color = ''
      setCellState(newCellState)
    } else {
      let newCellState = cellState
      newCellState.height = 300
      newCellState.rotation = '180deg'
      newCellState.isOpen = true
      newCellState.color = 'light'
      setCellState(newCellState)
    }
    forceUpdate()
  }

  function onSelectMode(mode) {
    setGraphMode(mode)
  }

  function toggleMetaData() {
    var newShowAll = !showAll
    setShowAll(newShowAll)

    if (newShowAll) {
      setShowAllRotation('180deg')
    } else {
      setShowAllRotation('90deg')
    }
  }

  function enableEditMode() {
    if (!showAll) toggleMetaData()
    setEditModeEnabled(true)
  }

  return (
    <>
      {/*

        Cell-item

      */}
      <CTableRow
        v-for="item in tableItems"
        onClick={() => {
          onClickedCell()
          onClickedCellCB(data)
        }}
        style={{
          cursor: 'pointer',
          height: 30,
        }}
        className="noselect"
        color={cellState.color}
      >
        <CTableDataCell
          className="text-center"
          style={{ borderRadius: '25% 0% 0% 25%', borderWidth: 0 }}
        >
          <CIcon
            className={cellState.isOpen ? 'triangle-showing' : 'triangle-hiding'}
            icon={cilTriangle}
          />
        </CTableDataCell>
        <CTableDataCell className="text-center border-0">{data.id}</CTableDataCell>
        <CTableDataCell className="border-0">{data.date}</CTableDataCell>
        <CTableDataCell className="border-0">{data.operator}</CTableDataCell>
        <CTableDataCell className="border-0">{data.sensor_type}</CTableDataCell>
        <CTableDataCell className="border-0">{data.chip_type}</CTableDataCell>
        <CTableDataCell
          className="border-0"
          style={{ borderRadius: '0% 25% 25% 0%' }}
        ></CTableDataCell>
      </CTableRow>
      {/*

        Pull-down information

       */}
      {cellState.isOpen ? (
        <CTableRow style={{ position: 'relative' }}>
          <CTableDataCell
            className=""
            style={{
              position: 'relative',
              boxSizing: 'border-box',
              boxShadow: 'none',
              overflow: 'hidden',
              maxHeight: 0,
            }}
            colSpan={7}
          >
            <CCol
              className="rounded-4 p-4 pt-2"
              style={{
                backgroundColor: '',
                borderWidth: '5px',
                borderColor: 'black',
              }}
            >
              <CRow>
                <CButton
                  className="rounded-pill"
                  color={isSelected ? 'primary' : 'dark'}
                  style={{ width: '15%', marginRight: '5px' }}
                  onClick={() => setSelected(!isSelected)}
                >
                  <CIcon icon={cilSquare} style={{ marginRight: '5px' }} /> Select
                </CButton>
                <CButton
                  className="rounded-pill"
                  color="dark"
                  style={{ width: '15%', marginRight: '5px' }}
                  onClick={() => toggleMetaData()}
                >
                  <CIcon icon={cilDescription} style={{ marginRight: '5px' }} /> Info
                </CButton>
                <CButton
                  className="rounded-pill"
                  color="dark"
                  style={{ width: '15%', marginRight: '5px' }}
                >
                  <CIcon icon={cilShare} style={{ marginRight: '5px' }} /> Share
                </CButton>
                <CButton
                  className="rounded-pill"
                  color={isFavorite ? 'primary' : 'dark'}
                  style={{ width: '15%', marginRight: '5px' }}
                  onClick={() => setFavorite(!isFavorite)}
                >
                  <CIcon icon={cilStar} style={{ marginRight: '5px' }} /> Favorite
                </CButton>
                <CButton
                  className="rounded-pill"
                  color={isEditModeEnabled ? 'primary' : 'dark'}
                  style={{ width: '15%', marginRight: '5px' }}
                  onClick={() => enableEditMode()}
                >
                  <CIcon icon={cilPencil} style={{ marginRight: '5px' }} /> Edit
                </CButton>
                <CButton
                  className="rounded-pill"
                  color="dark"
                  style={{ width: '15%', marginRight: '5px' }}
                >
                  <CIcon icon={cilTrash} style={{ marginRight: '5px' }} /> Delete
                </CButton>
              </CRow>

              <CRow className="mt-2 mb-2 p-3 bg-dark rounded-4">
                <CCol style={{ textAlign: 'center' }}>
                  <CIcon icon={cilFile} className="m-2" size="xxl" xs={2} />
                  <div style={{ fontSize: 13 }}>{'EXP#0000' + data.id}</div>
                </CCol>
                <CCol style={{ textAlign: 'center' }}>
                  <CIcon icon={cilCalendar} className="m-2" size="xxl" xs={2} />
                  <div style={{ fontSize: 13 }}>{data.date}</div>
                </CCol>
                <CCol style={{ textAlign: 'center' }}>
                  <CIcon icon={cilClock} className="m-2" size="xxl" xs={4} />
                  <div style={{ fontSize: 13 }}>{data.start_time}</div>
                </CCol>
                <CCol style={{ textAlign: 'center' }}>
                  <CIcon icon={cilUser} className="m-2" size="xxl" xs={4} />
                  <div style={{ fontSize: 13 }}>{data.operator}</div>
                </CCol>
                <CCol style={{ textAlign: 'center' }}>
                  <CIcon icon={cilDrop} className="m-2" size="xxl" xs={4} />
                  <div style={{ fontSize: 13 }}>{data.bg_concentration}</div>
                </CCol>
                <CCol style={{ textAlign: 'center' }}>
                  <CIcon icon={cilBeaker} className="m-2" size="xxl" xs={4} />
                  <div style={{ fontSize: 13 }}>{data.bg_concentration}</div>
                </CCol>
                <CCol xs={2} />
              </CRow>

              {showAll ? (
                <CRow>
                  <CCol
                    className="rounded-3 p-3 mt-2"
                    style={{
                      backgroundColor: '',
                    }}
                  >
                    <CRow className="m-1">
                      <CCol xs={2}>Sensor</CCol>
                      <CCol>
                        <CFormTextarea
                          disabled={!isEditModeEnabled}
                          rows={1}
                          style={{ resize: 'none' }}
                        >
                          {data.sensor_type}
                        </CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="m-1">
                      <CCol xs={2}>Chip</CCol>
                      <CCol>
                        <CFormTextarea
                          disabled={!isEditModeEnabled}
                          rows={1}
                          style={{ resize: 'none' }}
                        >
                          {data.chip_type}
                        </CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="m-1">
                      <CCol xs={2}>
                        T<sub>start</sub>
                      </CCol>
                      <CCol>
                        <CFormTextarea
                          disabled={!isEditModeEnabled}
                          rows={1}
                          style={{ resize: 'none' }}
                        >
                          {data.start_time}
                        </CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="m-1">
                      <CCol xs={2}>
                        T<sub>end</sub>
                      </CCol>
                      <CCol>
                        <CFormTextarea
                          disabled={!isEditModeEnabled}
                          rows={1}
                          style={{ resize: 'none' }}
                        >
                          {data.finish_time}
                        </CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="m-1">
                      <CCol xs={2}>Batch</CCol>
                      <CCol>
                        <CFormTextarea
                          disabled={!isEditModeEnabled}
                          rows={1}
                          style={{ resize: 'none' }}
                        >
                          {data.bg_batch}
                        </CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="m-1">
                      <CCol xs={2}>Solution</CCol>
                      <CCol>
                        <CFormTextarea
                          disabled={!isEditModeEnabled}
                          rows={1}
                          style={{ resize: 'none' }}
                        >
                          {data.bg_solution}
                        </CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="m-1">
                      <CCol xs={2}>
                        T<sub>end</sub>
                      </CCol>
                      <CCol>
                        <CFormTextarea
                          disabled={!isEditModeEnabled}
                          rows={1}
                          style={{ resize: 'none' }}
                        >
                          {data.bg_concentration}
                        </CFormTextarea>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              ) : (
                <></>
              )}

              <CRow style={{ position: 'relative' }} className="m-1 mt-4">
                {graphMode === 'nyquist' ? (
                  <CCol xs={12} className="" style={{ height: '600px' }}>
                    <Scatter
                      options={nyquist_options}
                      data={dataSet(data.nyquist_graph)}
                      style={{ marginBottom: '25px' }}
                    />
                  </CCol>
                ) : (
                  <>
                    <CCol xs={12} className="" style={{ height: '300px' }}>
                      <Scatter
                        options={bode_options_gain}
                        data={dataSet(data.bode_graph_gain)}
                        style={{ marginBottom: '25px' }}
                      />
                    </CCol>
                    <CCol xs={12} className="" style={{ height: '300px' }}>
                      <Scatter
                        options={bode_options_phase}
                        data={dataSet(data.bode_graph_phase)}
                        style={{ marginBottom: '25px' }}
                      />
                    </CCol>
                  </>
                )}
              </CRow>

              <CRow className="" style={{ float: 'left' }}>
                <CCol className="" style={{ padding: 0, paddingRight: '4px' }}>
                  <CDropdown className="bg-dark w-100 rounded-4" style={{ height: '40px' }}>
                    <CDropdownToggle className="" style={{ textAlign: 'left' }}>
                      {graphMode === 'bode' ? 'Bode' : 'Nyquist'}
                    </CDropdownToggle>
                    <CDropdownMenu className="w-100 bg-dark" style={{}}>
                      <CDropdownItem
                        onClick={() => onSelectMode('nyquist')}
                        style={{ cursor: 'pointer' }}
                      >
                        Nyquist
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => onSelectMode('bode')}
                        style={{ cursor: 'pointer' }}
                      >
                        Bode
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CCol>
                <CCol className="" style={{ padding: 0, paddingLeft: '4px' }}>
                  <CDropdown className="bg-dark w-100 rounded-4" style={{ height: '40px' }}>
                    <CDropdownToggle className="" style={{ textAlign: 'left' }}>
                      Measurement 1
                    </CDropdownToggle>
                    <CDropdownMenu className="w-100 bg-dark" style={{}}>
                      <CDropdownItem
                        onClick={() => onSelectMode('nyquist')}
                        style={{ cursor: 'pointer' }}
                      >
                        Measurement 1
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => onSelectMode('bode')}
                        style={{ cursor: 'pointer' }}
                      >
                        Measurement 2
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol className="bg-dark rounded-4 pt-1 pb-1">
                  <CRow className="p-3 pt-0 pb-0">
                    <CCol className="p-1">
                      <CIcon icon={cilCommentBubble} style={{ marginRight: '5px' }} />
                      Comment
                    </CCol>
                  </CRow>
                  {data.remarks !== '' ? (
                    <CRow className="bg-primary rounded-4 m-2 p-2 pb-3">
                      <CRow className="">
                        <CCol style={{ fontWeight: 'bold' }}>{data.operator}</CCol>
                        <CCol style={{ textAlign: 'right' }}>{data.date}</CCol>
                      </CRow>
                      <CRow>
                        <CCol>{data.remarks}</CCol>
                      </CRow>
                    </CRow>
                  ) : (
                    <></>
                  )}
                  <CRow className="m-2 p-0 mt-3" style={{ borderRadius: 15 }}>
                    <CForm className="m-0 p-0 mb-1">
                      <CFormTextarea className="m-0 bg-dark" rows={2}></CFormTextarea>
                    </CForm>
                  </CRow>
                  <CRow className="m-2 p-0" style={{ borderRadius: 15 }}>
                    <CCol xs={8} />
                    <CCol xs={2} style={{ textAlign: 'right', position: 'relative' }}>
                      <div className="center">Cancel</div>
                    </CCol>
                    <CCol
                      xs={2}
                      className="bg-primary rounded-pill mr-5"
                      style={{ height: 35, position: 'relative', cursor: 'pointer' }}
                    >
                      <div className="center">Submit</div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCol>
          </CTableDataCell>
        </CTableRow>
      ) : (
        <></>
      )}
    </>
  )
}

export default ExperimentCell
