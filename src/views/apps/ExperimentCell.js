/* eslint-disable react/prop-types */
import { React, useState, useEffect, useContext } from 'react'
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
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBeaker,
  cilCalendar,
  cilCheck,
  cilClock,
  cilCommentBubble,
  cilDescription,
  cilDrop,
  cilFile,
  cilPencil,
  cilShare,
  cilSquare,
  cilStar,
  cilTrash,
  cilTriangle,
  cilUser,
} from '@coreui/icons'
import { Chart, Scatter } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js'
import zoomPlugin, { zoom } from 'chartjs-plugin-zoom'
import { UserContext } from 'src/App'

//#region Graph options
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
  const data = {
    datasets: [
      ...values.map((item, index) => {
        return {
          data: item,
          backgroundColor: `rgba(${204 - index * 50}, ${57 + index * 10}, 57, 1)`,
          pointRadius: 2,
          pointHoverRadius: 2,
        }
      }),
    ],
  }

  console.log(data)
  return data
}
//#endregion

function ExperimentCell({
  meta,
  onSelectedItemCallBack,
  onClickedCellCallBack,
  toaster,
  selectedList,
}) {
  const [cellState, setCellState] = useState({
    height: 0,
    rotation: '90deg',
    isOpen: false,
    color: '',
  })

  ChartJS.register(zoomPlugin)

  const { user, setUser, token, setToken } = useContext(UserContext)

  //If we want to show all the meta data or not
  const [showAll, setShowAll] = useState(false)
  const [showAllRotation, setShowAllRotation] = useState('90deg')

  //Is the current experiment selected?
  const [isSelected, setSelected] = useState(false)

  //Is the current experiment a user favorite?
  const [isFavorite, setFavorite] = useState(false)

  //Are we editing the current measurement or not
  const [isEditModeEnabled, setEditModeEnabled] = useState(false)

  //Which graph is selected at the current moment
  const [graphMode, setGraphMode] = useState('nyquist')

  //Which repetition is shown at the current moment
  const [graphNum, setGraphNum] = useState(0)

  //Did we generate a copy link and are showing the result
  const [isCopied, setIsCopied] = useState(false)

  const [graphData, setGraphData] = useState([
    { graph_label: [], nyquist_graph: [], bode_graph_gain: [], bode_graph_phase: [] },
  ])

  const [fetchedData, setFetchedData] = useState(false)
  const [fetchingData, setFetchingData] = useState(false)

  function isCellSelected(meta) {
    for (const i in selectedList) {
      //console.log('this is arr ', i)
      for (const j in selectedList[i]) {
        const data = selectedList[i][j]
        console.log(data.id, meta.id)
        //console.log('this is dat ', data.id)
        if (data.id === meta.id) {
          return true
        }
      }
    }
    return false
  }

  useEffect(() => {
    console.log(isSelected)
  }, [setSelected, isSelected])

  useEffect(() => {
    if (fetchedData) {
      setFetchedData(false)
    }
    closeCell()

    if (isCellSelected(meta)) {
      console.log('Setting ', meta.id, ' to true!')
      setSelected(true)
    } else {
      setSelected(false)
    }
  }, [meta])

  useEffect(() => {}, [
    graphMode,
    isCopied,
    showAll,
    showAllRotation,
    isSelected,
    isFavorite,
    cellState,
    setGraphData,
    graphData,
    fetchingData,
    setFetchingData,
  ])

  function openCell() {
    if (!fetchedData) {
      setFetchingData(true)
      console.log(`Looking for measurement ${meta.uuid}`)
      fetch(`http://api.hypersoniqtech.com/data/measurements/${meta.uuid}/experiment-data`)
        .then((res) => res.json())
        .then((data) => {
          console.log('I received this: ', data)
          setGraphData(data)
          setFetchedData(true)
          setCellState({ height: 300, rotation: '180deg', isOpen: true, color: 'light' })
          setFetchingData(false)
        })
        .catch((err) => {
          setFetchedData(false)
          setFetchingData(false)
          toaster('NetworkError', err.toString())
        })
    } else {
      setCellState({ height: 300, rotation: '180deg', isOpen: true, color: 'light' })
    }
  }

  function closeCell() {
    setCellState({ height: 0, rotation: '90deg', isOpen: false, color: '' })
    setIsCopied(false)
  }

  function onClickedCell() {
    if (cellState.isOpen) {
      //Close a currently open experiment cell
      closeCell()
    } else {
      //Open a currently closed experiment cell
      openCell()
    }
  }

  //Toggling the meta data information tab
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

  function shareMeasurement() {
    navigator.clipboard.writeText('http://localhost:3000/#/home/' + meta.id)
    toaster('Copied succesful!', 'A shareable link has been copied to your clipboard.')
    setIsCopied(true)
  }

  function deleteItemFromDataset() {
    var body = { id: meta.id }

    fetch('http://api.hypersoniqtech.com/delete', {
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((dat) => console.log(dat))
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
          onClickedCellCallBack(meta)
        }}
        style={{
          cursor: 'pointer',
          height: 30,
        }}
        className="noselect"
        color={isSelected ? '' : cellState.color}
      >
        <CTableDataCell
          className={'text-center' + (isSelected ? ' bg-primary' : '')}
          style={{ borderRadius: '25% 0% 0% 25%', borderWidth: 0 }}
        >
          {fetchingData ? (
            <CSpinner size="sm" />
          ) : (
            <CIcon
              className={cellState.isOpen ? 'triangle-showing' : 'triangle-hiding'}
              icon={cilTriangle}
            />
          )}
        </CTableDataCell>
        <CTableDataCell className={'text-center border-0' + (isSelected ? ' bg-primary' : '')}>
          {meta.id}
        </CTableDataCell>
        <CTableDataCell className={'border-0' + (isSelected ? ' bg-primary' : '')}>
          {meta.date}
        </CTableDataCell>
        <CTableDataCell className={'border-0' + (isSelected ? ' bg-primary' : '')}>
          {meta.chip}
        </CTableDataCell>
        <CTableDataCell className={'border-0' + (isSelected ? ' bg-primary' : '')}>
          {meta.background_solution}
        </CTableDataCell>
        <CTableDataCell className={'border-0' + (isSelected ? ' bg-primary' : '')}>
          {meta.background_concentration}
        </CTableDataCell>
        <CTableDataCell
          className={'border-0' + (isSelected ? ' bg-primary' : '')}
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
              <CRow style={{ overflow: 'hidden', position: 'relative' }}>
                <CButton
                  className="rounded-pill"
                  color={isSelected ? 'primary' : 'dark'}
                  style={{ width: '15%', marginRight: '5px', marginBottom: '5px' }}
                  onClick={() => {
                    onSelectedItemCallBack(meta, !isSelected)
                    setSelected(!isSelected)
                  }}
                >
                  <CIcon icon={cilSquare} style={{ marginRight: '5px' }} /> Select
                </CButton>
                <CButton
                  className="rounded-pill"
                  color="dark"
                  style={{ width: '15%', marginRight: '5px', marginBottom: '5px' }}
                  onClick={() => toggleMetaData()}
                >
                  <CIcon icon={cilDescription} style={{ marginRight: '5px' }} /> Info
                </CButton>

                {isCopied ? (
                  <CFormTextarea
                    className="bg-dark border-0 rounded-pill"
                    rows={1}
                    style={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      resize: 'none',
                      width: '20%',
                      marginRight: '5px',
                      marginBottom: '5px',
                    }}
                  >
                    {'http://localhost:3000/#/home/' + meta.id}
                  </CFormTextarea>
                ) : (
                  <CButton
                    className="rounded-pill"
                    color="dark"
                    style={{ width: '15%', marginRight: '5px', marginBottom: '5px' }}
                    onClick={() => shareMeasurement()}
                  >
                    <CIcon icon={isCopied ? cilCheck : cilShare} style={{ marginRight: '5px' }} />{' '}
                    Share
                  </CButton>
                )}

                <CButton
                  disabled
                  className="rounded-pill"
                  color={isFavorite ? 'primary' : 'dark'}
                  style={{ width: '15%', marginRight: '5px', marginBottom: '5px' }}
                  onClick={() => setFavorite(!isFavorite)}
                >
                  <CIcon icon={cilStar} style={{ marginRight: '5px' }} /> Favorite
                </CButton>
                <CButton
                  className="rounded-pill"
                  color={isEditModeEnabled ? 'primary' : 'dark'}
                  style={{ width: '15%', marginRight: '5px', marginBottom: '5px' }}
                  onClick={() => enableEditMode()}
                  disabled
                >
                  <CIcon icon={cilPencil} style={{ marginRight: '5px' }} /> Edit
                </CButton>
                <CButton
                  className="rounded-pill"
                  color={isEditModeEnabled ? 'primary' : 'dark'}
                  style={{ width: '15%', marginRight: '5px', marginBottom: '5px' }}
                  onClick={() => deleteItemFromDataset()}
                >
                  <CIcon icon={cilTrash} style={{ marginRight: '5px' }} /> Delete
                </CButton>
              </CRow>

              <CRow className="mt-1 mb-2 p-3 bg-dark rounded-4">
                <CCol style={{ textAlign: 'center' }}>
                  <CIcon icon={cilFile} className="m-2" size="xxl" xs={2} />
                  <div style={{ fontSize: 13 }}>{'EXP#' + meta.id}</div>
                </CCol>
                <CCol style={{ textAlign: 'center' }}>
                  <CIcon icon={cilCalendar} className="m-2" size="xxl" xs={2} />
                  <div style={{ fontSize: 13 }}>{meta.date}</div>
                </CCol>
                <CCol style={{ textAlign: 'center' }}>
                  <CIcon icon={cilClock} className="m-2" size="xxl" xs={4} />
                  <div style={{ fontSize: 13 }}>{meta.time_start}</div>
                </CCol>
                <CCol style={{ textAlign: 'center' }}>
                  <CIcon icon={cilUser} className="m-2" size="xxl" xs={4} />
                  <div style={{ fontSize: 13 }}>{meta.operator}</div>
                </CCol>
                <CCol style={{ textAlign: 'center' }}>
                  <CIcon icon={cilDrop} className="m-2" size="xxl" xs={4} />
                  <div style={{ fontSize: 13 }}>{meta.background_concentration}</div>
                </CCol>
                <CCol style={{ textAlign: 'center' }}>
                  <CIcon icon={cilBeaker} className="m-2" size="xxl" xs={4} />
                  <div style={{ fontSize: 13 }}>{meta.background_solution}</div>
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
                          {meta.sensor}
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
                          {meta.chip}
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
                          {meta.time_start}
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
                          {meta.time_stop}
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
                          {meta.background_batch}
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
                          {meta.background_solution}
                        </CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="m-1">
                      <CCol xs={2}>Concentration</CCol>
                      <CCol>
                        <CFormTextarea
                          disabled={!isEditModeEnabled}
                          rows={1}
                          style={{ resize: 'none' }}
                        >
                          {meta.background_concentration}
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
                    {fetchedData ? (
                      <Scatter
                        options={nyquist_options}
                        data={dataSet([
                          graphData[graphNum].nyquist_graph,
                          graphData[graphNum + 1].nyquist_graph,
                          graphData[graphNum + 2].nyquist_graph,
                        ])}
                        style={{ marginBottom: '25px' }}
                      />
                    ) : (
                      <></>
                    )}
                  </CCol>
                ) : (
                  <>
                    <CCol xs={12} className="" style={{ height: '300px' }}>
                      {fetchedData ? (
                        <Scatter
                          options={bode_options_gain}
                          data={dataSet(graphData[graphNum].bode_graph_gain)}
                          style={{ marginBottom: '25px' }}
                        />
                      ) : (
                        <></>
                      )}
                    </CCol>
                    <CCol xs={12} className="" style={{ height: '300px' }}>
                      {fetchedData ? (
                        <Scatter
                          options={bode_options_phase}
                          data={dataSet(graphData[graphNum].bode_graph_phase)}
                          style={{ marginBottom: '25px' }}
                        />
                      ) : (
                        <></>
                      )}
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
                        onClick={() => setGraphMode('nyquist')}
                        style={{ cursor: 'pointer' }}
                      >
                        Nyquist
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => setGraphMode('bode')}
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
                      {graphData[graphNum].graph_label}
                    </CDropdownToggle>
                    <CDropdownMenu className="w-100 bg-dark" style={{}}>
                      {graphData.map((item, index) => (
                        // eslint-disable-next-line react/jsx-key
                        <CDropdownItem
                          onClick={() => setGraphNum(index)}
                          style={{ cursor: 'pointer' }}
                        >
                          {item.graph_label}
                        </CDropdownItem>
                      ))}
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
                  {meta.comment !== '' ? (
                    <CRow className="bg-primary rounded-4 m-2 p-2 pb-3">
                      <CRow className="">
                        <CCol style={{ fontWeight: 'bold' }}>{meta.operator}</CCol>
                        <CCol style={{ textAlign: 'right' }}>{meta.date}</CCol>
                      </CRow>
                      <CRow>
                        <CCol>{meta.comment}</CCol>
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
