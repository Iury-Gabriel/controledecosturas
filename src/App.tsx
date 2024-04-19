import { createBrowserRouter } from 'react-router-dom'
import { Private } from './routes/private'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import NotFound from './pages/NotFound'
import { Login } from './pages/login'
import UpdateCostura from './pages/updateCostura'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Private><Home /></Private>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard/:id",
    element: <Private><UpdateCostura /></Private>
  },
  {
    path: "/dashboard",
    element: <Private><Dashboard /></Private>
  },
  {
    path: "*",
    element: <NotFound />
  }
])

export { router };