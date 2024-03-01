import { CButton, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilChevronLeft,
  cilChevronRight,
  cilChevronDoubleLeft,
  cilChevronDoubleRight,
} from '@coreui/icons'
import { useEffect, useState } from 'react'

// < 1 2 3 4 5 >
// < 1 2 .. 8 9 >

/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line react/prop-types
function Pagination({ length, onPageChange }) {
  const [currentPage, setPage] = useState(0)

  useEffect(() => {
    onPageChange(currentPage)
    let arr = getPaginationArray(currentPage)
    setArray(arr)
  }, [currentPage])

  useEffect(() => {
    setPage(0)
    let arr = getPaginationArray(currentArray)
    setArray(arr)
  }, [length])

  function paginateFirst() {
    if (currentPage > 0) {
      setPage(0)
    }
  }

  function paginateLast() {
    if (currentPage < length) {
      setPage(length - 1)
    }
  }

  function paginateLeft() {
    if (currentPage > 0) {
      setPage(currentPage - 1)
    }
  }

  function paginateRight() {
    if (currentPage < length - 1) {
      setPage(currentPage + 1)
    }
  }

  function paginateTo(page) {
    setPage(page - 1)
  }

  function buttonColor(value) {
    if (value === currentPage) {
      return { backgroundColor: 'rgb(92,52,52)' }
    } else {
      return {}
    }
  }

  function buttonBackground(value) {
    if (value === currentPage) {
      return ''
    } else {
      return 'dark'
    }
  }

  const visiblePaginationButtons = 7

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getPaginationArray(pos) {
    let median = Math.floor(visiblePaginationButtons / 2)

    // We are on the beginning of the page
    if (pos <= median) {
      var temp = []
      if (length >= visiblePaginationButtons) {
        for (var i = 1; i <= visiblePaginationButtons; i++) {
          temp.push(i)
        }
      } else {
        for (var i = 1; i <= length; i++) {
          temp.push(i)
        }
      }
      return temp
    }

    // We are on the end of the page
    if (pos >= length - median) {
      var temp = []
      console.log('Pos: ' + pos)
      if (length >= visiblePaginationButtons) {
        for (var i = length + 1 - visiblePaginationButtons; i <= length; i++) {
          temp.push(i)
        }
      } else {
        for (var i = 1; i <= length; i++) {
          temp.push(i)
        }
      }
      return temp
    }

    var temp = []
    for (var i = pos - median + 1; i <= pos + median + 1; i++) {
      temp.push(i)
    }
    return temp
  }

  const [currentArray, setArray] = useState([])
  const [isUpdated, setUpdate] = useState(false)
  //setArray(getPaginationArray(1))

  useEffect(() => {
    //setArray(getPaginationArray(1))
    //console.log('Hello World')
    if (currentArray.length === 0) {
      let arr = getPaginationArray(0)
      setArray(arr)
    }
  }, [currentArray])

  //Test
  // eslint-disable-next-line react/react-in-jsx-scope
  return (
    <>
      <CRow>
        <CCol>
          <CButton
            onClick={() => paginateFirst()}
            color="dark"
            style={{
              width: '40px',
              height: '40px',
              margin: '0px',
              borderRadius: '10px',
            }}
          >
            <CIcon icon={cilChevronDoubleLeft} />
          </CButton>
        </CCol>
        <CCol xs={10} style={{ textAlign: 'center', padding: '0px' }}>
          <CButton
            onClick={() => paginateLeft()}
            color="dark"
            style={{
              width: '40px',
              height: '40px',
              margin: '0px',
              borderRadius: '0px',
              borderTopLeftRadius: '10px',
              borderBottomLeftRadius: '10px',
              cursor: 'pointer',
            }}
          >
            <CIcon icon={cilChevronLeft} />
          </CButton>
          {currentArray.map((item, index) => (
            // eslint-disable-next-line react/jsx-key
            <CButton
              onClick={() => paginateTo(item)}
              color={buttonBackground(item - 1)}
              style={{
                width: '35px',
                height: '40px',
                margin: '0px',
                padding: '0px',
                fontSize: '15px',
                borderRadius: '0px',
                borderWidth: '1px',
                borderColor: '',
                ...buttonColor(item - 1),
              }}
            >
              {item}
            </CButton>
          ))}
          <CButton
            onClick={() => paginateRight()}
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
            <CIcon icon={cilChevronRight} />
          </CButton>
        </CCol>
        <CCol>
          <CButton
            onClick={() => paginateLast()}
            color="dark"
            style={{
              width: '40px',
              height: '40px',
              margin: '0px',
              borderRadius: '10px',
            }}
          >
            <CIcon icon={cilChevronDoubleRight} />
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default Pagination

/*


*/
