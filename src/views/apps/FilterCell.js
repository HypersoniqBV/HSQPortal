/* eslint-disable react/prop-types */
import { cilTriangle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CBadge, CButton, CCol, CFormCheck, CRow } from '@coreui/react'
import { React, useState, useReducer, useEffect } from 'react'

// eslint-disable-next-line react/prop-types
function FilterCell({ cat, onChange, dataset, filter }) {
  const [rotation, setRotation] = useState('90deg')
  const [visible, setVisible] = useState(false)

  const [data, setData] = useState(null)
  const [visibleData, setVisibleData] = useState(null)

  const [selectedFilters, setSelectedFilters] = useState(0)

  const [togglers, setTogglers] = useState([])
  const [visibleTogglers, setVisibleTogglers] = useState([])

  const [togglerUpdated, setTogglerUpdated] = useState(false)

  function onClick(force = false) {
    if (rotation === '90deg' || force) {
      setRotation('180deg')
      setVisible(true)
    } else {
      setRotation('90deg')
      setVisible(false)
    }
  }

  useEffect(() => {}, [dataset])

  useEffect(() => {
    if (filter !== '' && filter.charAt(0) !== '!') {
      onClick(true)
      var filteredData = []
      var filteredTogglers = []
      data.forEach((e, i) => {
        if (e.toLowerCase().includes(filter.toLowerCase())) {
          filteredData.push(e)
          filteredTogglers.push(togglers[i])
        }
      })
      setVisibleData(filteredData)
      //setVisibleTogglers(filteredTogglers)
    } else {
      setVisibleData(data)
      //setVisibleTogglers(togglers)
    }
  }, [filter])

  useEffect(() => {
    if (togglerUpdated) {
      let val = []
      for (var i = 0; i < togglers.length; i++) {
        if (togglers[i] === true) {
          val.push(data[i])
        }
      }
      onChange(cat, val)
      setTogglerUpdated(false)
    }
  }, [cat, data, onChange, togglerUpdated, togglers])

  function onToggle(i) {
    let newTogglers = togglers
    let newSelectedFilters = selectedFilters
    newTogglers[i] = !newTogglers[i]

    if (newTogglers[i]) {
      newSelectedFilters += 1
    } else {
      newSelectedFilters -= 1
    }
    setTogglers(newTogglers)
    setSelectedFilters(newSelectedFilters)
    setTogglerUpdated(true)
  }

  function getIndex(val) {
    return data.indexOf(val)
  }

  function onlyUnique(val, index, array) {
    return array.indexOf(val) === index
  }

  useEffect(() => {}, [rotation, data, selectedFilters])

  useEffect(() => {
    // eslint-disable-next-line react/prop-types

    if (dataset.length === 0) return

    var k = cat
    var l = ''

    if (k === 'Solution') {
      k = 'solution_name'
      l = 'meta'
    }

    if (k === 'Concentration') {
      k = 'solution_concentration'
      l = 'meta'
    }

    if (k === 'Chip') {
      k = 'chip'
    }

    if (k === 'Sensor') {
      k = 'sensor'
    }

    var values = []
    if (l === '') {
      values = dataset.map((a) => a[k.toLowerCase()])
    } else {
      values = dataset.map((a) => a['meta'][k.toLowerCase()])
    }
    values = values.map((item) => item.toString())
    var sorted = values.sort()
    var unq = sorted.filter(onlyUnique)

    setData(unq)
    setVisibleData(unq)
    let e = []

    unq.forEach(() => e.push(false))
    setTogglers(e)
    setVisibleTogglers(e)
    setSelectedFilters(0)
  }, [dataset])

  return (
    <>
      <CRow>
        <CCol xs={2}>
          <CButton
            disabled={togglers.length === 0}
            style={{ borderWidth: '0px', textAlign: 'center' }}
            onClick={() => onClick()}
          >
            <CIcon
              className={visible ? 'triangle-showing' : 'triangle-hiding'}
              icon={cilTriangle}
            />
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
          <div>{cat}</div>
        </CCol>
        <CCol
          xs={2}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <CBadge color={selectedFilters === 0 ? 'dark' : 'primary'}>{selectedFilters}</CBadge>
        </CCol>
        <CRow className={'m-0 ' + (visible ? 'visible' : 'hidden')}>
          <CCol xs={1}></CCol>
          <CCol xs={10} className="mb-2">
            {visibleData !== null && visibleData.length > 0 ? (
              <>
                {visibleData.map((entry, index) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <CFormCheck
                      label={entry}
                      onChange={() => onToggle(getIndex(entry))}
                      style={{ cursor: 'pointer' }}
                      checked={togglers[getIndex(entry)]}
                    />
                  )
                })}
              </>
            ) : (
              <></>
            )}
          </CCol>
        </CRow>
      </CRow>
    </>
  )
}

export default FilterCell
