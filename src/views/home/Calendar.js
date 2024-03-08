/* eslint-disable prettier/prettier */
import { cilArrowLeft, cilTriangle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CRow } from '@coreui/react'
import { React, useEffect, useState } from 'react'

function Calendar() {

    const [date, setDate] = useState(null)
    const [days, setDays] = useState([])

    const [month, setMonth] = useState([])
    const [monthNum, setMonthNum] = useState([])

    const [year, setYear] = useState([])

    const [date1, setDate1] = useState(false)
    const [date2, setDate2] = useState(false)

    const [isSelecting, setIsSelecting] = useState(false)

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    useEffect(() => {

        const month = new Date().getMonth()
        const year = new Date().getFullYear()

        const days = getDaysInMonth(month, year)
        setDays(days)
        setMonthNum(month)
        setMonth(months[month])

        setYear(year)
    },[])

    useEffect(() => { console.log(month, year) },[days, month, monthNum, year])

    function getDaysInMonth(month, year, date1=false, date2=false) {
        const firstDay = new Date(year, month, 1, 0, 0, 0, 0)
        const lastDay = new Date(year, month + 1, 0, 0, 0, 0)
        
        var iStart = -firstDay.getDay() + 2

        if(firstDay.getDay() === 0) {
            iStart = -5
        }

        var allDays = []
        var days  = []
        var count = 0

        for(var i = iStart; i < 42 + iStart; i++) {
            
            var day = new Date(year, month, i, 0, 0, 0, 0)
            var dayNum = day.getDate()
            var inMonth = false

            if (day.getMonth() === month) {
                inMonth = true
            }

            console.log(date1)

            if (date1 !== false && date1 === day) {
                console.log("test")
            }

            days = [...days, [dayNum, inMonth, day]]
            count += 1

            if (count >= 7) {
                allDays = [...allDays, days ]
                days = []
                count = 0
            }
        }

        return allDays
    }

    function nextMonth() {
        var nextMonth = monthNum + 1
        var newYear = year

        if(nextMonth > 11) {
            nextMonth = 0
            newYear = year + 1
            setYear(newYear)
        }

        const days = getDaysInMonth(nextMonth, newYear)

        setDays(days)
        setMonthNum(nextMonth)
        setMonth(months[nextMonth])
    }

    function previousMonth() {
        var nextMonth = monthNum - 1
        var newYear = year

        if(nextMonth < 0) {
            nextMonth = 11
            newYear = year - 1
            setYear(newYear)
        }

        const days = getDaysInMonth(nextMonth, newYear)

        setDays(days)
        setMonthNum(nextMonth)
        setMonth(months[nextMonth])
    }

    function onClick(date) {

        if(date1 === false) {
            setDate1(date)
            console.log("first day selected: ", date)
            return
        }

        if(date2 === false && date1 !== false) { 
            setDate2(date)
            console.log("second day selected: ", date)
        }

        if(date >= date1 && date < date2) {
            setDate1(date)
            setDate2(false)
            console.log("first day selected: ", date)
        }

        if (date < date1) {
            setDate1(date)
            setDate2(false)
            console.log("first day selected: ", date)
        }

        if(date >= date2) {
            setDate2(date)
            console.log("second day selected: ", date)
        }

        console.log("testing testing")
        const days = getDaysInMonth(month, year, date1, date2)
        //setDays(days)
    }

    function onHover(date) {

    }

    return (
    <>
    <CRow>
      <CCol
        className="bg-dark rounded-3 m-3 p-3"
        style={{ paddingBottom: 15, height: '200px', textAlign: 'center', display: 'table' }}
      >
        <CRow>
            <CCol />
            <CCol>
                <CButton onClick={() => previousMonth()} style={{ borderWidth: '0px' }}>
                    <CIcon icon={cilTriangle} style={{ rotate: '-90deg' }}/>
                </CButton>
            </CCol>
            <CCol xs={6} className="mb-2 mt-2 fw-bold">{month} {year}</CCol>
            <CCol>
                <CButton onClick={() => nextMonth()} style={{ borderWidth: '0px' }}>
                    <CIcon icon={cilTriangle} style={{ rotate: '90deg' }}/>
                </CButton>
            </CCol>
            <CCol />
        </CRow>
        <div style={{ display: 'table', width: '100%' }}>
            <div style={{marginBottom: 20, display: 'table-row' }}>
                <div style={{ display: 'table-cell' }}>Mo</div>
                <div style={{ display: 'table-cell' }}>Tu</div>
                <div style={{ display: 'table-cell' }}>We</div>
                <div style={{ display: 'table-cell' }}>Th</div>
                <div style={{ display: 'table-cell' }}>Fr</div>
                <div style={{ display: 'table-cell' }}>Sa</div>
                <div style={{ display: 'table-cell' }}>Su</div>
            </div>
            {days.map((week, iWeek) => (
                <>
                    <div style={{ display: 'table-row', height: '30px' }}>
                        {week.map(([day, inMonth, dayObj], iDay) => ( 
                            <>
                                { inMonth ? (
                                    <div style={{ position: 'relative', display: 'table-cell', width: '14.2%' }}>
                                        <div onClick={() => onClick(dayObj)} className={ (date1 === dayObj || date2 === dayObj) ? "text-highlight" : "text"} style={{ cursor: 'pointer', zIndex: 2, position: 'absolute', borderRadius: '25%', width: '30px', height: '30px', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }} />
                                        <div className="text" style={{ borderWidth: 0, opacity: 0.2, backgroundColor: '#ff0000', position: 'absolute', borderRadius: '0', width: '100%', height: '25px', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }} />
                                        <div style={{ position: 'relative', zIndex: 1 }}>{day}</div>
                                    </div>
                                ) : (
                                    <div style={{ display: 'table-cell', color: '#555' }} >{day}</div>                  
                                )}

                            </>
                        ))}
                    </div>           
                </>
            ))}
        </div>
      </CCol>
    </CRow>
  </>
  )
}

export default Calendar
