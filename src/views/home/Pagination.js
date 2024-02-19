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
  const [currentPage, setPage] = useState(1)

  function paginateLeft() {
    if (currentPage > 1) {
      setPage(currentPage - 1)
    }
    onPageChange(currentPage)
  }

  function paginateRight() {
    if (currentPage < length) {
      setPage(currentPage + 1)
    }
    onPageChange(currentPage)
  }

  function buttonColor(value) {
    if (value === currentPage) {
      return { backgroundColor: 'rgb(92,52,52)' }
    } else {
      return { backgroundColor: '#2e3135' }
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
      for (var i = length - visiblePaginationButtons; i <= length; i++) {
        temp.push(i)
      }
      return temp
    }

  }

  const [currentArray, setArray] = useState([])
  const [isUpdated, setUpdate] = useState(false)
  //setArray(getPaginationArray(1))

  useEffect(() => {
    setArray(getPaginationArray(1))
    //console.log('Hello World')
  }, [getPaginationArray])

  //Test
  // eslint-disable-next-line react/react-in-jsx-scope
  return (
    <>
      <CRow>
        <CCol>
          <CButton
            onClick={() => paginateLeft()}
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
            }}
          >
            <CIcon icon={cilChevronLeft} />
          </CButton>
          {currentArray.map((item, index) => (
            // eslint-disable-next-line react/jsx-key
            <CButton
              style={{
                width: '35px',
                height: '40px',
                margin: '0px',
                padding: '0px',
                fontSize: '15px',
                borderRadius: '0px',
                borderWidth: '1px',
                borderColor: '',
                ...buttonColor(item),
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
            onClick={() => paginateRight()}
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
