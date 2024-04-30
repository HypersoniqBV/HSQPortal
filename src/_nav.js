import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilStar,
  cilHome,
  cilFile,
  cilMediaPlay,
  cilCompass,
  cilStorage,
  cilUser,
  cilSettings,
  cilClock,
  cilMonitor,
  cilBeaker,
  cilBrowser,
  cilTag,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    href: '#/home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Apps',
  },
  {
    component: CNavItem,
    name: 'Explorer',
    href: '#/apps/explorer',
    icon: <CIcon icon={cilCompass} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Scanner',
    href: '#/apps/scanner',
    icon: <CIcon icon={cilBeaker} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Monitor',
    href: '#/apps/monitor',
    icon: <CIcon icon={cilMonitor} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Datasets',
  },
  {
    component: CNavItem,
    name: 'Favorites',
    href: '#/datasets/favorites',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: '10',
    },
  },
  {
    component: CNavItem,
    name: 'History',
    href: '#/datasets/history',
    icon: <CIcon icon={cilClock} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Storage',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Hypersoniq',
        href: '#/datasets/storage/hypersoniq',
        badge: {
          color: 'black',
          text: '10',
        },
      },
      {
        component: CNavItem,
        name: 'TU Delft',
        href: '#/datasets/storage/tu_delft',
        badge: {
          color: 'black',
          text: '10',
        },
      },
      {
        component: CNavItem,
        name: 'KWR',
        href: '#/datasets/storage/kwr',
        badge: {
          color: 'black',
          text: '10',
        },
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Projects',
    href: '#/datasets/projects',
    icon: <CIcon icon={cilTag} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Tools',
  },
  {
    component: CNavItem,
    name: 'PalmSens',
    href: '#/tools/palmsens',
    icon: <CIcon icon={cilMediaPlay} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Extra',
  },
  {
    component: CNavItem,
    name: 'Account',
    href: '#/extra/account',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Settings',
    href: '#/extra/settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
]

export default _nav
