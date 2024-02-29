import { cilTriangle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CBadge, CButton, CCol, CFormCheck, CRow } from '@coreui/react'
import { React, useState, useReducer, useEffect } from 'react'

// eslint-disable-next-line react/prop-types
function FilterCell({ cat, onChange }) {
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

  useEffect(() => {}, [rotation, data, selectedFilters])

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    var k = cat
    if (k === 'Solution') {
      k = 'background_solution'
    }

    if (k === 'Concentration') {
      k = 'background_concentration'
    }
    fetch('https://10.8.0.1:5000/api/cat/' + k.toLowerCase())
      .then((res) => res.json())
      .then((dat) => {
        let d = dat.sort()
        setData(d)
        let e = []

        d.forEach(() => e.push(false))
        setTogglers(e)
      })
  }, [])

  return (
    <>
      <CRow>
        <CCol xs={2}>
          <CButton style={{ borderWidth: '0px', textAlign: 'center' }} onClick={() => onClick()}>
            <CIcon style={{ rotate: rotation }} icon={cilTriangle} />
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
        {visible ? (
          <CRow className="m-0">
            <CCol xs={1}></CCol>
            <CCol xs={10} className="mb-2">
              {data.map((val, index) => (
                // eslint-disable-next-line react/jsx-key
                <CFormCheck
                  label={val.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())}
                  onChange={() => onToggle(index)}
                  style={{ cursor: 'pointer' }}
                  checked={togglers[index]}
                />
              ))}
            </CCol>
          </CRow>
        ) : (
          <></>
        )}
      </CRow>
    </>
  )
}

export default FilterCell
