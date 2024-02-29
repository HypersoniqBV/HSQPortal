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
import { cilTriangle } from '@coreui/icons'
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

  const [graphMode, setGraphMode] = useState('nyquist')

  useEffect(() => console.log(graphMode), [graphMode])

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0)

  function onClickedCell() {
    if (!cellState.isOpen) {
      let newCellState = cellState
      newCellState.height = 300
      newCellState.rotation = '180deg'
      newCellState.isOpen = true
      newCellState.color = 'light'
      setCellState(newCellState)
    } else {
      let newCellState = cellState
      newCellState.height = 0
      newCellState.rotation = '90deg'
      newCellState.isOpen = false
      newCellState.color = ''
      setCellState(newCellState)
    }
    forceUpdate()
  }

  function onSelectMode(mode) {
    setGraphMode(mode)
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
        color={cellState.color}
      >
        <CTableDataCell className="text-center">
          <CIcon style={{ transform: 'rotate(' + cellState.rotation + ')' }} icon={cilTriangle} />
        </CTableDataCell>
        <CTableDataCell className="text-center">{data.id}</CTableDataCell>
        <CTableDataCell>{data.date}</CTableDataCell>
        <CTableDataCell>{data.operator}</CTableDataCell>
        <CTableDataCell>{data.sensor_type}</CTableDataCell>
        <CTableDataCell>{data.chip_type}</CTableDataCell>
      </CTableRow>
      {/*

        Pull-down information

       */}
      {cellState.isOpen ? (
        <CTableRow className="">
          <CTableDataCell
            className=""
            style={{
              boxSizing: 'border-box',
              boxShadow: 'none',
              overflow: 'hidden',
            }}
            colSpan={6}
          >
            <CCol
              className="p-2 m-2 rounded-4"
              style={{
                backgroundColor: '',
                borderWidth: '5px',
                borderColor: 'black',
              }}
            >
              <CRow className="m-1 mt-4">
                <CCol xs={2}>Experiment ID</CCol>
                <CCol>
                  <CFormTextarea disabled rows={1} style={{ resize: 'none' }}>
                    {'EXP#0000' + data.id}
                  </CFormTextarea>
                </CCol>
              </CRow>

              <CRow className="m-1">
                <CCol xs={2}>Date</CCol>
                <CCol>
                  <CFormTextarea disabled rows={1} style={{ resize: 'none' }}>
                    {data.date}
                  </CFormTextarea>
                </CCol>
              </CRow>

              <CRow className="m-1">
                <CCol xs={2}>Operator</CCol>
                <CCol>
                  <CFormTextarea disabled rows={1} style={{ resize: 'none' }}>
                    {data.operator}
                  </CFormTextarea>
                </CCol>
              </CRow>
              <CRow className="m-1">
                <CCol xs={2}>Sensor</CCol>
                <CCol>
                  <CFormTextarea disabled rows={1} style={{ resize: 'none' }}>
                    {data.sensor_type}
                  </CFormTextarea>
                </CCol>
              </CRow>
              <CRow className="m-1">
                <CCol xs={2}>Chip</CCol>
                <CCol>
                  <CFormTextarea disabled rows={1} style={{ resize: 'none' }}>
                    {data.chip_type}
                  </CFormTextarea>
                </CCol>
              </CRow>
              <CRow className="m-1">
                <CCol xs={2}>
                  T<sub>start</sub>
                </CCol>
                <CCol>
                  <CFormTextarea disabled rows={1} style={{ resize: 'none' }}>
                    {data.start_time}
                  </CFormTextarea>
                </CCol>
              </CRow>
              <CRow className="m-1">
                <CCol xs={2}>
                  T<sub>end</sub>
                </CCol>
                <CCol>
                  <CFormTextarea disabled rows={1} style={{ resize: 'none' }}>
                    {data.finish_time}
                  </CFormTextarea>
                </CCol>
              </CRow>
              <CRow className="m-1">
                <CCol xs={2}>Batch</CCol>
                <CCol>
                  <CFormTextarea disabled rows={1} style={{ resize: 'none' }}>
                    {data.bg_batch}
                  </CFormTextarea>
                </CCol>
              </CRow>
              <CRow className="m-1">
                <CCol xs={2}>Solution</CCol>
                <CCol>
                  <CFormTextarea disabled rows={1} style={{ resize: 'none' }}>
                    {data.bg_solution}
                  </CFormTextarea>
                </CCol>
              </CRow>
              <CRow className="m-1">
                <CCol xs={2}>
                  T<sub>end</sub>
                </CCol>
                <CCol>
                  <CFormTextarea disabled rows={1} style={{ resize: 'none' }}>
                    {data.bg_concentration}
                  </CFormTextarea>
                </CCol>
              </CRow>
              <CRow className="m-1">
                <CCol xs={2}>Remark: </CCol>
                <CCol>
                  <CForm>
                    <CFormTextarea disabled rows={3}>
                      {data.remarks}
                    </CFormTextarea>
                  </CForm>
                </CCol>
              </CRow>
              <CRow className="m-1 mb-3">
                <CCol xs={2}>Graph:</CCol>
                <CCol className="">
                  <CDropdown style={{ paddingLeft: 0, paddingRight: 0, width: '100%' }}>
                    <CDropdownToggle style={{ textAlign: 'left', backgroundColor: '#2e3135' }}>
                      {graphMode === 'bode' ? 'Bode' : 'Nyquist'}
                    </CDropdownToggle>
                    <CDropdownMenu
                      color="secondary"
                      style={{ backgroundColor: '#222', left: 0, width: '100%' }}
                    >
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
              </CRow>
              <CRow style={{ position: 'relative' }} className="m-1">
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

              {/*
            <CRow className="mb-4">
              <CCol>
                <CButton className="bg-dark w-100">Edit</CButton>
              </CCol>
              <CCol>
                <CButton className="bg-dark w-100">Apply</CButton>
              </CCol>
            </CRow>
            */}
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
