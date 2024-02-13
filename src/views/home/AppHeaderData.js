/* eslint-disable prettier/prettier */
import React from 'react'
import { CButton } from '@coreui/react'
import { publish } from 'src/event'
import CIcon from '@coreui/icons-react'

import { cilCloudUpload } from '@coreui/icons'

function AppHeaderData() {
  return (
    <>
    <div style={{ width: "50px" }} />
      <CButton
        color="dark"
        style={{
          borderTopLeftRadius: '10px',
          borderBottomLeftRadius: '10px',
          borderTopRightRadius: '0px',
          borderBottomRightRadius: '0px',
          paddingLeft: '30px',
          paddingRight: '30px',
          marginRight: '0px',
          borderRightWidth: '1px',
          borderRightColor: '#222',
        }}
        onClick={() => publish('uploadData', '')}
      >
        Upload
      </CButton>
      <CButton
        color="dark"
        style={{
          borderRadius: '0px',
          paddingLeft: '30px',
          paddingRight: '30px',
          marginRight: '0px',
          borderRightWidth: '1px',
          borderRightColor: '#222',
        }}
      >
        Edit
      </CButton>
      <CButton
        color="dark"
        style={{
          borderTopRightRadius: '10px',
          borderBottomRightRadius: '10px',
          borderTopLeftRadius: '0px',
          borderBottomLeftRadius: '0px',
          paddingLeft: '30px',
          paddingRight: '30px',
          marginRight: '0px',
        }}
      >
        Delete
      </CButton>
    </>
  )
}

export default AppHeaderData
