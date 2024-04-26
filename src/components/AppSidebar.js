import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CCol,
  CProgress,
  CRow,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logo_simple } from 'src/assets/brand/logo_simple'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader style={{ justifyContent: 'center' }} className="align-items-center mb-2">
        <CSidebarBrand className="align-items-center">
          <CIcon
            customClassName="align-self-center sidebar-brand-full"
            icon={logo_simple}
            height={20}
          />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={20} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      <CSidebarNav className="pt-0 h-100">
        <SimpleBar
          className="rounded-3 bg-dark m-0 pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            overflow: '-moz-scrollbars-none',
          }}
        >
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>

      <CSidebarFooter style={{ fontSize: 12, color: 'gray' }} className="m-2 p-2 rounded-2">
        Hypersoniq Tech© 2024
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
