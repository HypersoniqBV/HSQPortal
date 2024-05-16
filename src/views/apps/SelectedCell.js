/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import { cilTriangle } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CBadge, CCol, CFormCheck, CRow } from "@coreui/react"
import { useState } from "react"


const SelectedCell = ({ selectedList}) => {

    console.log("hello world")
    const [selectedCount, setSelectedCount] = useState(0)
    const [rotation, setRotation] = useState('180deg')
    const [visible, setVisible] = useState(true)
    
    function onClick(force = false) {
        if (rotation === '90deg' || force) {
        setRotation('180deg')
        setVisible(true)
        } else {
        setRotation('90deg')
        setVisible(false)
        }
    }

    return (
    <>
        <CRow className="p-1 pt-0 pb-1 mb-2">
        <CCol xs={2} className="" style={{ position: 'relative' }}>
            <div className={"center " + (visible ? 'triangle-showing' : 'triangle-hiding')}>
            <CIcon className="center" icon={cilTriangle} style={{ cursor: 'pointer' }} onClick={() => onClick()}/>
            </div>
        </CCol>
        <CCol xs={5} className="">
            <div>{selectedList[0].date}</div>
        </CCol>
            <CCol
                xs={2}
                style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                }}
            >
                <CBadge color={selectedList.length > 0 ? 'primary' : 'dark' }>{selectedList.length}</CBadge>
            </CCol>
        </CRow>
        {visible ? (
        <CRow className="p-3 pt-0 pb-0 mb-3">
            <div className="w-100 bg-dark rounded rounded-3 p-3 pb-0 pt-2">
                {selectedList.map((item, index) => (
                    <>
                        <CRow className="m-0 p-0 pb-2">
                        <CCol xs={1}>
                            <CFormCheck checked={true} />
                        </CCol>
                        <CCol>
                            <p
                                className="bg-subtle-primary rounded-pill p-4 pt-0 pb-0 m-0"
                                style={{ display: 'inline-block', cursor: 'pointer' }}
                            >
                            EXP#{item.id}
                            </p>
                        </CCol>
                        <CCol>{item.background_solution}</CCol>
                        </CRow>                  
                    </>
                ))}
            </div>
        </CRow> ) : (<></>)}
    </>
    )}

export default SelectedCell
