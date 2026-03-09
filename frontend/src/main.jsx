import ReactDOM from 'react-dom/client'
import axios from 'axios'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Sign_in from './pages/sign_in/sign_in'
import Sign_up from './pages/sign_up/sign_up'
import Main_page from './pages/main_page/main_page'
import Search from './pages/searchandfilter/search/search1'
import Add_marker from './pages/add_marker/addmarker_one'
import NotFound from './pages/notfound/notfound'
import Loading from './pages/loading'
import Review from './pages/add_review/add_review'
import GPS from './pages/main_page/GPS/GPS'
import Settings from './pages/settings/settings'
// import Testpage from './pages/test_page/testpage'
import './index.css'
import Success from './pages/success/success'
import Success_sign_up from './pages/success/success_sign_up'
import Admin_menu from './pages/admin_menu/admin_menu'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main_page />,
    errorElement: <NotFound />,
  },
  {
    path: '/sign_up',
    element: <Sign_up />,
    errorElement: <NotFound />,
  },
  {
    path: '/sign_in',
    element: <Sign_in />,
    errorElement: <NotFound />,
  },
  {
    path: '/search',
    element: <Search />,
    errorElement: <NotFound />,
  },
  {
    path: '/add_marker',
    element: <Add_marker />,
    errorElement: <NotFound />,
  },
  {
    path: '/add_review',
    element: <Review />,
    errorElement: <NotFound />,
  },
  {
    path: '/loading',
    element: <Loading />,
    errorElement: <NotFound />,
  },
  {
    path: '/read_coords',
    element: <GPS />,
    errorElement: <NotFound />,
  },
  {
    path: '/settings',
    element: <Settings />,
    errorElement: <NotFound />,
  },
  // {
  //   path: '/test',
  //   element: <Testpage/>,
  //   errorElement: <NotFound/>,
  // },
  {
    path: '/success',
    element: <Success />,
    errorElement: <NotFound />,
  },
  {
    path: '/success/sign_up',
    element: <Success_sign_up />,
    errorElement: <NotFound />,
  },
  {
    path: '/admin_menu',
    element: <Admin_menu />,
    errorElement: <NotFound />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
