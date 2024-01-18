import React from 'react'
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
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

const Measurements = () => {
  const columns = [
    { key: 'id', label: '#', _props: { scope: 'col' }, _style: { width: 30 } },
    { key: 'date', label: 'Date', _props: { scope: 'col' }, _style: { width: 80 } },
    { key: 'operator', label: 'Operator', _props: { scope: 'col' }, _style: { width: 80 } },
    { key: 'sensor', label: 'Sensor', _props: { scope: 'col' }, _style: { width: 80 } },
    { key: 'chip', label: 'Chip', _props: { scope: 'col' } },
  ]

  const items = [
    {
      class: 'Default',
      id: '1',
      date: '16/01/2024',
      operator: 'Sanam',
      sensor: 'Cell',
      chip: 'Cell',
      _cellProps: { class: { scope: 'row' } },
    },
    {
      class: 'Default',
      id: '2',
      date: '25/12/2023',
      operator: 'Sanam',
      sensor: 'Cell',
      chip: 'Cell',
      _cellProps: { class: { scope: 'row' } },
    },
    {
      class: 'Default',
      id: '3',
      date: '20/12/2023',
      operator: 'Sanam',
      sensor: 'Cell',
      chip: 'Cell',
      _props: { height: 300 },
      _cellProps: { class: { scope: 'row' } },
    },
    {
      class: 'Default',
      id: '4',
      date: '25/12/2023',
      operator: 'Sanam',
      sensor: 'Cell',
      chip: 'Cell',
      _cellProps: { class: { scope: 'row' } },
    },
    {
      class: 'Default',
      id: '5',
      date: '25/12/2023',
      operator: 'Sanam',
      sensor: 'Cell',
      chip: 'Cell',
      _cellProps: { class: { scope: 'row' } },
    },
  ]

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Measurements</CCardHeader>
            <CCardBody>On this page we can see the last measurements taken</CCardBody>
            <CCol className="m-2 p-0">
              <CTable
                columns={columns}
                items={items}
                hover
                striped
                tableHeadProps={{ color: 'dark' }}
                onClick={(e) => {
                  window.alert(e.target.parentNode.rowIndex)
                }}
              />
            </CCol>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Measurements
