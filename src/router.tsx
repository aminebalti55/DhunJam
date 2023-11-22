
import DefaultLayout from './components/layout'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children:[
{
    element: <LoginPage />,
    path: '/'
  },{
    element: <Dashboard />,
    path: '/dashboard'
  }
    ]}
])

export default router
