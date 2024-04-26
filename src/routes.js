import React from 'react'

const Home = React.lazy(() => import('./views/apps/Home'))
const Explorer = React.lazy(() => import('./views/apps/Explorer'))
const ExplorerSimple = React.lazy(() => import('./views/apps/ExplorerSimple'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', element: Home },
  { path: '/apps/explorer', name: 'Explorer', element: Explorer },
  { path: '/apps/explorer/:id', name: 'Explorer', element: ExplorerSimple },
]

export default routes
