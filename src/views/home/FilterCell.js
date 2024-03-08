/* eslint-disable react/prop-types */
import { cilTriangle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CBadge, CButton, CCol, CFormCheck, CRow } from '@coreui/react'
import { React, useState, useReducer, useEffect } from 'react'

// eslint-disable-next-line react/prop-types
function FilterCell({ cat, onChange, dataset }) {
  const [rotation, setRotation] = useState('90deg')
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState(0)
  const [togglers, setTogglers] = useState([])
  const [togglerUpdated, setTogglerUpdated] = useState(false)

  function onClick() {
    if (rotation === '90deg') {
      setRotation('180deg')
      setVisible(true)
    } else {
      setRotation('90deg')
      setVisible(false)
    }
  }

  useEffect(() => console.log(dataset), [dataset])

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

  function onlyUnique(val, index, array) {
    return array.indexOf(val) === index
  }

  useEffect(() => {}, [rotation, data, selectedFilters])

  useEffect(() => {
    // eslint-disable-next-line react/prop-types

    if (dataset.length === 0) return

    var k = cat
    if (k === 'Solution') {
      k = 'bg_solution'
    }

    if (k === 'Concentration') {
      k = 'bg_concentration'
    }

    if (k === 'Chip') {
      k = 'chip_type'
    }

    if (k === 'Sensor') {
      k = 'sensor_type'
    }

    var values = dataset.map((a) => a[k.toLowerCase()])
    var sorted = values.sort()
    var unq = sorted.filter(onlyUnique)

    setData(unq)
    let e = []

    sorted.forEach(() => e.push(false))
    setTogglers(e)

    /*
    fetch('https://10.8.0.1:5000/api/cat/' + k.toLowerCase())
      .then((res) => res.json())
      .then((dat) => {
        let d = dat.sort()
        setData(d)
        let e = []

        d.forEach(() => e.push(false))
        setTogglers(e)
      })
    */
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
            {data !== null && data.length > 0 ? (
              <>
                {data.map((val, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <CFormCheck
                    label={val.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())}
                    onChange={() => onToggle(index)}
                    style={{ cursor: 'pointer' }}
                    checked={togglers[index]}
                  />
                ))}
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
