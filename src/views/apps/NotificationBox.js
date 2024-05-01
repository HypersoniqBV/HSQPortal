/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import CIcon from "@coreui/icons-react"

const { CRow, CCol } = require("@coreui/react")

const NotificationBox = () => {
  return (

    <CRow key={index} className='m-2'>
        <div ref={b => notificationRef.current.push(b)} className="shadow rounded-3 pt-2 pb-2 notification-box" style={{ height: "70px", verticalAlign: "middle" }}>
            <CRow>
            <CCol xs={1} style={{ position: 'relative' }}>
                <div className='bg-white rounded-circle center' style={{ width: '10px', height: '10px' }} />
            </CCol>
            <CCol>
                <CRow className='fw-bold'>{item.msg}</CRow>
                <CRow style={{fontSize: 2}}>{item.time}</CRow>
            </CCol>
            <CCol xs={1} style={{ position: 'relative' }}>
                <CIcon className='center notification-cross' item={item} icon={cilX} style={{width: 20, height: 20 }} 
                onClick={() => startRemoveNotificationAnimation(item, index)}/>
            </CCol>
        </CRow>
      </div>
    </CRow>

    )
}

export default NotificationBox
