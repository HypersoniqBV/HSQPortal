import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilHome,
  cilFolder,
  cilCode,
  cilCloudUpload,
  cilFile,
  cilMediaPlay,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    href: '#/home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    /*
    badge: {
      color: 'info',
      text: 'NEW',
    },
    */
  },
  {
    component: CNavTitle,
    name: 'Data',
  },
  {
    component: CNavGroup,
    name: 'Measurements',
    icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Inspector',
        href: '#/measurements',
      },
      {
        component: CNavItem,
        name: 'Favorites',
        href: '#/measurements',
      },
      {
        component: CNavItem,
        name: 'History',
        href: '#/measurements',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Model',
    href: '#/data/model',
    icon: <CIcon icon={cilMediaPlay} customClassName="nav-icon" />,
    /*
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        href: '#/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        href: '#/base/breadcrumbs',
      },
    ],
    */
  },
  {
    component: CNavTitle,
    name: 'Code',
  },
  {
    component: CNavItem,
    name: 'Documentation',
    href: '#/code/documentation',
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },
]

export default _nav
