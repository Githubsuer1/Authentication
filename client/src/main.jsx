import './index.css'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import Home from './Components/General/Home.jsx'
import Login from './Components/Authentication/Login.jsx';
import Signup from './Components/Authentication/Signup.jsx';
import User from './Components/General/User.jsx';
import ProtectedRoute from './Components/General/Protected.jsx';
import { Provider } from 'react-redux';
import Store from './Store/Store.js';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {path:'/',element:<Home />},
      {path:'/login',element:<Login />},
      {path:'/register',element:<Signup />},

      {
        element:<ProtectedRoute />,
        children:[{path:'/getuser',element:<User />}]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>

)

