import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'
import Home from './pages/Home.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import SignUp from './pages/SignUp.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import ProductPage from './pages/ProductPage.jsx'
import Cart from './pages/Cart.jsx'
import Prompt from './pages/Prompt.jsx'
import OrderComplete from './pages/OrderComplete.jsx'
import Profile from './pages/Profile.jsx'
import ConfirmDelete from './pages/ConfirmDelete.jsx'
import UpdateProfile from './pages/UpdateProfile.jsx'
import RequireAuth from './components/RequireAuth.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/cart' element={<RequireAuth><Cart /></RequireAuth>}/>
      <Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>}/>
      <Route path='/order_complete/:id' element={<RequireAuth><OrderComplete /></RequireAuth>}/>
      <Route path='/prompt' element={<Prompt />}/>
      <Route path='/product/:id' element={<ProductPage />}/>
      <Route path='/confirm_delete' element={<RequireAuth><ConfirmDelete /></RequireAuth>}/>
      <Route path='/update_profile' element={<RequireAuth><UpdateProfile /></RequireAuth>}/>
      <Route path='*' element={<NotFound />}/>
    </Route>
  )
)

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  ) 
}

export default App
