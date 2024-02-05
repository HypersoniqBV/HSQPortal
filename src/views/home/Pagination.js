import { CButton, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChevronLeft, cilChevronRight } from '@coreui/icons'
import { useState } from 'react'

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
    console.log(currentPage)
    onPageChange(currentPage)
  }

  function paginateRight() {
    if (currentPage < length) {
      setPage(currentPage + 1)
    }
    console.log(currentPage)
    onPageChange(currentPage)
  }

  function buttonColor(value) {
    if (value === currentPage) {
      return { backgroundColor: 'rgb(92,52,52)' }
    } else {
      return { backgroundColor: '#2e3135' }
    }
  }

  //Test
  // eslint-disable-next-line react/react-in-jsx-scope
  return (
    <>
      <CRow>
        <CCol style={{ marginTop: '25px', textAlign: 'center', padding: '0px' }}>
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
          <CButton
            //onClick={buttonClicked}
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
              ...buttonColor(1),
            }}
          >
            1
          </CButton>
          <CButton
            //onClick={buttonClicked}
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
            //onClick={buttonClicked}
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
              ...buttonColor(5),
            }}
          >
            5
          </CButton>
          <CButton
            //onClick={buttonClicked}
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
              ...buttonColor(6),
            }}
          >
            6
          </CButton>
          <CButton
            //onClick={buttonClicked}
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
              ...buttonColor(7),
            }}
          >
            7
          </CButton>
          <CButton
            //onClick={buttonClicked}
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
              ...buttonColor(8),
            }}
          >
            8
          </CButton>
          <CButton
            //onClick={buttonClicked}
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
            9
          </CButton>
          <CButton
            //onClick={buttonClicked}
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
            //onClick={buttonClicked}
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
            18
          </CButton>
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
      </CRow>
    </>
  )
}

export default Pagination

/*


*/
