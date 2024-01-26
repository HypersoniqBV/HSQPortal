/* eslint-disable react/no-unescaped-entities */
import { React, useState, useReducer, useRef, useEffect } from 'react'
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
  CSpinner,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries } from 'react-vis'

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LogarithmicScale,
  LineElement,
  Legend,
  Title,
} from 'chart.js'
import { Scatter } from 'react-chartjs-2'
import zoomPlugin from 'chartjs-plugin-zoom'
import faker from 'faker'

import {
  cilTriangle,
  cilMagnifyingGlass,
  cilArrowThickLeft,
  cilArrowThickRight,
  cilChevronDoubleRight,
  cilChevronRight,
  cilChevronLeft,
  cilCloudUpload,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import { bottom, left } from '@popperjs/core'

ChartJS.register(LinearScale, PointElement, LogarithmicScale, LineElement, Title, zoomPlugin)

export const nyquist_options = {
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

export const bode_options_gain = {
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

export const bode_options_phase = {
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

const Home = () => {
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const [currentPage, setCurrentPage] = useState(1)

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

  const operators = ['Sanam', 'Maria', 'Zahra', 'Ursa']

  var tableData = []

  const [hasData, setData] = useState(false)
  const [table, setTable] = useState([])

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

  function buttonClicked(i) {
    //tableData = tableExample2
    //setTable(tableDate2)
    forceUpdate()

    console.log(tableData)
  }

  useEffect(() => {
    fetch('https://10.8.0.1:5000/api/portal')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setTable(data)
        setData(true)
      })
  }, [])

  const [visible, setVisible] = useState(false)

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
                  backgroundColor: 'rgba(50, 50, 50, 20)',
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
                    <CIcon icon={cilCloudUpload} size={'lg'} />
                    <div>Upload Data</div>
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
                        <CTableDataCell>{item.sensor_type}</CTableDataCell>
                        <CTableDataCell>{item.chip_type}</CTableDataCell>
                      </CTableRow>
                      {row[index].isOpen ? (
                        <CTableRow className="border">
                          <CTableDataCell
                            className="rounded-bottom-3"
                            style={{ boxShadow: 'none', overflow: 'hidden' }}
                            colSpan={6}
                          >
                            <CRow className="m-1 mt-4">
                              <CCol xs={2}>Experiment ID</CCol>
                              <CCol>
                                <CFormTextarea disabled rows={1} style={{ resize: 'none' }}>
                                  {'EXP#0000' + item.id}
                                </CFormTextarea>
                              </CCol>
                            </CRow>

                            <CRow className="m-1">
                              <CCol xs={2}>Date</CCol>
                              <CCol>
                                <CFormTextarea disabled rows={1} style={{ resize: 'none' }}>
                                  {item.date}
                                </CFormTextarea>
                              </CCol>
                            </CRow>

                            <CRow className="m-1">
                              <CCol xs={2}>Operator</CCol>
                              <CCol>
                                <CFormTextarea disabled rows={1} style={{ resize: 'none' }}>
                                  {item.operator}
                                </CFormTextarea>
                              </CCol>
                            </CRow>
                            <CRow className="m-1">
                              <CCol xs={2}>Sensor</CCol>
                              <CCol>
                                <CFormTextarea disabled rows={1} style={{ resize: 'none' }}>
                                  {item.sensor_type}
                                </CFormTextarea>
                              </CCol>
                            </CRow>
                            <CRow className="m-1">
                              <CCol xs={2}>Chip</CCol>
                              <CCol>
                                <CFormTextarea disabled rows={1} style={{ resize: 'none' }}>
                                  {item.chip_type}
                                </CFormTextarea>
                              </CCol>
                            </CRow>
                            <CRow className="m-1">
                              <CCol xs={2}>Remark: </CCol>
                              <CCol>
                                <CForm>
                                  <CFormTextarea disabled rows={3}>
                                    {item.remarks}
                                  </CFormTextarea>
                                </CForm>
                              </CCol>
                            </CRow>
                            <CRow className="m-1">
                              <CCol xs={2}>
                                T<sub>start</sub>
                              </CCol>
                              <CCol>
                                <CFormTextarea disabled rows={1} style={{ resize: 'none' }}>
                                  {item.start_time}
                                </CFormTextarea>
                              </CCol>
                            </CRow>
                            <CRow className="m-1 mb-4">
                              <CCol xs={2}>
                                T<sub>end</sub>
                              </CCol>
                              <CCol>
                                <CFormTextarea disabled rows={1} style={{ resize: 'none' }}>
                                  {item.finish_time}
                                </CFormTextarea>
                              </CCol>
                            </CRow>
                            <CRow style={{ position: 'relative' }} className="m-1">
                              <CCol xs={12} className="" style={{ height: '600px' }}>
                                <Scatter
                                  options={nyquist_options}
                                  data={dataSet(item.nyquist_graph)}
                                  style={{ marginBottom: '25px' }}
                                />
                              </CCol>
                              {/*
                              <CCol
                                className=""
                                style={{
                                  padding: '0px',
                                  textAlign: 'center',
                                  verticalAlign: 'text-bottom',
                                }}
                                xs={2}
                              >
                                <CButton
                                  color="primary m-3"
                                  style={{ width: '40%', aspectRatio: '1/1' }}
                                >
                                  1
                                </CButton>
                                <CButton
                                  color="primary m-3"
                                  style={{ width: '40%', aspectRatio: '1/1' }}
                                >
                                  2
                                </CButton>
                                <CButton
                                  color="primary m-3"
                                  style={{ width: '40%', aspectRatio: '1/1' }}
                                >
                                  3
                                </CButton>
                                <CButton
                                  color="primary m-3"
                                  style={{ width: '40%', aspectRatio: '1/1' }}
                                >
                                  4
                                </CButton>
                                <CButton
                                  color="primary m-3"
                                  style={{ width: '40%', aspectRatio: '1/1' }}
                                >
                                  5
                                </CButton>
                              </CCol>
                              */}
                            </CRow>
                            <CRow className="mb-4">
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
                  {!hasData ? (
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
                  ) : (
                    <></>
                  )}
                </CTableBody>
              </CTable>
              <CRow>
                <CCol style={{ marginTop: '25px', textAlign: 'center', padding: '0px' }}>
                  <CButton
                    onClick={buttonClicked}
                    color="dark"
                    style={{
                      width: '40px',
                      height: '40px',
                      margin: '0px',
                      borderRadius: '0px',
                      borderTopLeftRadius: '10px',
                      borderBottomLeftRadius: '10px',
                    }}
                  >
                    <CIcon icon={cilChevronLeft} />
                  </CButton>
                  <CButton
                    onClick={buttonClicked}
                    //color="light"
                    style={{
                      width: '35px',
                      height: '40px',
                      margin: '0px',
                      padding: '0px',
                      fontSize: '15px',
                      borderRadius: '0px',
                      borderWidth: '1px',
                      borderColor: '',
                      backgroundColor: 'rgb(92,52,52)',
                    }}
                  >
                    1
                  </CButton>
                  <CButton
                    onClick={buttonClicked}
                    disabled
                    color="dark"
                    style={{
                      width: '35px',
                      height: '40px',
                      margin: '0px',
                      padding: '0px',
                      fontSize: '15px',
                      borderRadius: '0px',
                      borderWidth: '1px',
                      borderColor: '',
                    }}
                  >
                    ...
                  </CButton>
                  <CButton
                    onClick={buttonClicked}
                    color="dark"
                    style={{
                      width: '35px',
                      height: '40px',
                      margin: '0px',
                      padding: '0px',
                      fontSize: '15px',
                      borderRadius: '0px',
                      borderWidth: '1px',
                      borderColor: '',
                    }}
                  >
                    5
                  </CButton>
                  <CButton
                    onClick={buttonClicked}
                    color="dark"
                    style={{
                      width: '35px',
                      height: '40px',
                      margin: '0px',
                      padding: '0px',
                      fontSize: '15px',
                      borderRadius: '0px',
                      borderWidth: '1px',
                      borderColor: '',
                    }}
                  >
                    6
                  </CButton>
                  <CButton
                    onClick={buttonClicked}
                    color="dark"
                    style={{
                      width: '35px',
                      height: '40px',
                      margin: '0px',
                      padding: '0px',
                      fontSize: '15px',
                      borderRadius: '0px',
                      borderWidth: '1px',
                      borderColor: '',
                    }}
                  >
                    7
                  </CButton>
                  <CButton
                    onClick={buttonClicked}
                    color="dark"
                    style={{
                      width: '40px',
                      height: '40px',
                      margin: '0px',
                      borderRadius: '0px',
                      borderTopRightRadius: '10px',
                      borderBottomRightRadius: '10px',
                    }}
                  >
                    <CButton
                      onClick={buttonClicked}
                      disabled
                      color="dark"
                      style={{
                        width: '35px',
                        height: '40px',
                        margin: '0px',
                        padding: '0px',
                        fontSize: '15px',
                        borderRadius: '0px',
                        borderWidth: '1px',
                        borderColor: '',
                      }}
                    >
                      ...
                    </CButton>
                    <CIcon icon={cilChevronRight} />
                  </CButton>
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
