/* eslint-disable prettier/prettier */
import { cilArrowLeft, cilCalendar, cilTriangle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, COffcanvasBody, CRow } from '@coreui/react'
import { React, useEffect, useState } from 'react'

// eslint-disable-next-line react/prop-types
function Calendar( {onDateRangeSelected}) {

    const [date, setDate] = useState(null)
    const [days, setDays] = useState([])

    const [month, setMonth] = useState([])
    const [monthNum, setMonthNum] = useState([])

    const [year, setYear] = useState([])

    const [date1, setDate1] = useState(false)
    const [date2, setDate2] = useState(false)

    const [reachedLimit, setReachedLimit] = useState(true)

    const [isSelecting, setIsSelecting] = useState(false)

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    useEffect(() => {

        const day = new Date().getDate()
        const month = new Date().getMonth()
        const year = new Date().getFullYear()

        const days = getDaysInMonth(month, year)
        
        const now = new Date(year, month, day)
        const then = new Date(year, month - 5, day) 

        setDays(days)
        setMonthNum(month)
        setMonth(months[month])
        setYear(year)

        setDate1(then)
        setDate2(now)
    },[])

    useEffect(() => { },[days, month, monthNum, year, setReachedLimit, reachedLimit])

    useEffect(() => {
        if(date1 !== false && date2 !== false) {
            onDateRangeSelected(date1, date2)
        }
    },[date1, date2])

    function getDaysInMonth(month, year) {
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
            var isOverDate = false
            var isToday = false
            var isFirstWeek = false
            var isLastWeek = false

            if (day.getMonth() === month) {
                inMonth = true
            }

            if (day.getDay() === 1 ) {
                isFirstWeek = true
            }

            if (day.getDay() === 0 ) {
                isLastWeek = true
            }

            if (day > new Date()) {
                isOverDate = true 
            }

            
            if (day.getDate() === new Date().getDate() && 
                day.getMonth() === new Date().getMonth() && 
                day.getFullYear() === new Date().getFullYear()) {
                isToday = true
            }

            days = [...days, [dayNum, inMonth, day, isOverDate, isToday, isFirstWeek, isLastWeek]]
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
        }

        // If next month is later than current month
        if(new Date() < new Date(newYear, nextMonth + 1, 1)) {
            setReachedLimit(true)
        } else {
            setReachedLimit(false)
        }

        setYear(newYear)
        setMonthNum(nextMonth)
        setMonth(months[nextMonth])

        const days = getDaysInMonth(nextMonth, newYear)
        setDays(days)
    }

    function previousMonth() {
        var nextMonth = monthNum - 1
        var newYear = year

        if(new Date().getMonth() < new Date(1, month, year)) {
            setReachedLimit(true)
        } else {
            setReachedLimit(false)
        }

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

    function toMonth(date) {
        
        console.log(date)
        const currDate = new Date()
        console.log(currDate)

        if(date === false) 
            return

        if(date === date1 && date.getMonth() !== currDate.getMonth()) {
            setReachedLimit(false)
        }
        
        if(date === date2 && date.getMonth() === currDate.getMonth()) {
            setReachedLimit(true)
        }

        var nextMonth = date.getMonth()
        var nextYear = date.getFullYear()

        const days = getDaysInMonth(nextMonth, nextYear)

        setDays(days)
        setMonthNum(nextMonth)
        setMonth(months[nextMonth])
        setYear(nextYear)
    }

    function moveToToday() {
        var date = new Date()
        var nextMonth = date.getMonth()
        var nextYear = date.getFullYear()

        const days = getDaysInMonth(nextMonth, nextYear)

        setDays(days)
        setMonthNum(nextMonth)
        setMonth(months[nextMonth])
        setYear(nextYear) 
        setReachedLimit(true)

        if(date2 === false) {
            setDate2(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
        }
    }

    function onClick(date) {

        if(date1 === false) {
            setDate1(date)
            return
        }

        if(date2 === false && date1 !== false) { 
            setDate2(date)
        }

        if(date >= date1 && date < date2) {
            setDate1(date)
            setDate2(false)
        }

        if (date < date1) {
            setDate1(date)
            setDate2(false)
        }

        if(date >= date2) {
            setDate2(date)
        }

    }

    function onHover(date) {
        
    }

    function toDateString(date) {
        
        if(date === false) 
            return ""

        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    }

    function isSelectedDay(day) {

        if ((day - date1) === 0 || (day - date2) === 0) {
            return true
        }

        return false
    }

    function isFirstSelectedDay(day) {
        return (day - date1) === 0
    }

    function isLastSelectedDay(day) {
        return (day - date2) === 0
    }

    function inRange(day) {

        if(date1 === false || date2 === false)
            return false

        return (date1 <= day) && (day <= date2)

    }
    

    return (
    <>
    <CRow>
      <CCol
        className="bg-dark rounded-3 m-3 p-3 mt-1"
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
                <CButton disabled={reachedLimit} onClick={() => nextMonth()} style={{ opacity: reachedLimit ? 0 : 1, borderWidth: '0px' }}>
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
                        {week.map(([day, inMonth, dayObj, overDate, isToday, isFirstWeek, isLastWeek], iDay) => ( 
                            <>
                                { inMonth ? (
                                    <div style={{ position: 'relative', display: 'table-cell', width: '14.2%' }}>
                                        { !overDate ? <div onClick={() => onClick(dayObj)} className={ isSelectedDay(dayObj) ? "text-highlight" : overDate ? "" : "text" } style={{ cursor: 'pointer', zIndex: 2, position: 'absolute', borderRadius: '25%', width: '30px', height: '30px', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }} /> : <></>}
                                        { inRange(dayObj) ? (<div className={"text " + 
                                        ((isFirstWeek) ? "highlight-first " : "") + 
                                        ((isLastWeek) ? "highlight-last " : "") + 
                                        ((isFirstSelectedDay(dayObj)) ? "highlight-first-selected " : "") + 
                                        ((isLastSelectedDay(dayObj)) ? "highlight-last-selected " : "")} 
                                        style={{ borderWidth: 0, opacity: 0.2, backgroundColor: '#ff0000', position: 'absolute', width: '100%', height: '25px', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }} />) : (<></>) }
                                        <div style={{ color: (isToday) ? "#cc4400" : overDate ? "#555" : "#fff", position: 'relative', zIndex: 1 }}>{day}</div>
                                    </div>
                                ) : (
                                    <div style={{ position: 'relative', display: 'table-cell', width: '14.2%' }}>
                                        { !overDate ? <div className={ isSelectedDay(dayObj) ? "text-highlight" : overDate ? "" : "" } style={{ zIndex: 2, position: 'absolute', borderRadius: '25%', width: '30px', height: '30px', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }} /> : <></>}
                                        <div style={{ color: '#555', position: 'relative', zIndex: 1 }}>{day}</div>
                                        { inRange(dayObj) ? (<div className={"text " + 
                                        ((isFirstWeek) ? "highlight-first " : "") + 
                                        ((isLastWeek) ? "highlight-last " : "") + 
                                        ((isFirstSelectedDay(dayObj)) ? "highlight-first-selected " : "") + 
                                        ((isLastSelectedDay(dayObj)) ? "highlight-last-selected " : "")} 
                                        style={{ borderWidth: 0, opacity: 0.2, backgroundColor: '#ff0000', position: 'absolute', width: '100%', height: '25px', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }} />) : (<></>) }         
                                    </div>      
                                )}

                            </>
                        ))}
                    </div>           
                </>
            ))}
        </div>
        <CRow className='mt-3'>
            <CCol xs={2} style={{ position: 'relative' }}>
                <CButton className='w-100 h-100' style={{ borderWidth : 0 }} onClick={() => moveToToday() } >
                    <CIcon className="center" icon={cilCalendar} size="xl" />
                </CButton>
            </CCol>
            <CCol xs={5} className='' style={{ height: 50, position: 'relative'}}>
                <CButton disabled={ date1 === false } style={{ borderWidth: 0 }} onClick={() => toMonth(date1)} className='w-100 h-100 calendar-button'>{toDateString(date1)}</CButton>
            </CCol>
            <CCol xs={5} onClick={() => toMonth(date2)} className='' style={{ height: 50, position: 'relative' }}>
                <CButton disabled={ date2 === false } style={{ borderWidth: 0 }} className='w-100 h-100 calendar-button'>{toDateString(date2)}</CButton>         
            </CCol>
        </CRow>
      </CCol>
    </CRow>
  </>
  )
}

export default Calendar
