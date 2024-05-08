import React, { useContext, useEffect, useRef } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
  CButton,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
  cilAccountLogout,
  cilSettings,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { publish } from 'src/event'
import AppHeaderData from 'src/views/apps/AppHeaderData'
import { UserContext } from 'src/App'

const AppHeader = () => {
  const headerRef = useRef()
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  const path = useLocation().pathname
  const { user, setUser, token, setToken } = useContext(UserContext)
  const navigate = useNavigate()

  function accountLogOut() {
    setUser(false)
    setToken(null)
    navigate('/home')
  }

  return (
    <CHeader position="sticky" className="mb-2 p-1 shadow-lg" ref={headerRef}>
      <CContainer className="px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav>
          {path === '/apps/explorer' || path === '/apps/explorer/:id' ? <AppHeaderData /> : <></>}
        </CHeaderNav>
        <CHeaderNav className="ms-auto">
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilSettings} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink style={{ cursor: 'pointer' }}>
              <CIcon icon={cilAccountLogout} size="lg" onClick={() => accountLogOut()} />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav></CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
