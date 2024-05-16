import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import {createBrowserRouter,createRoutesFromElements,Route,Routes,RouterProvider} from 'react-router-dom'
import store from './store.js';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginScreen from './screens/LoginScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx';
import AdminUserUpdate from './screens/AdminUserUpdate.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminHomeScreen from './screens/AdminHomeScreen.jsx';
import AdminLoginScreen from './screens/AdminLoginScreen.jsx'
import UsersListScreen from './screens/UsersListScreen.jsx';
import AdminAddUser from './screens/AdminAddUser.jsx';
import AdminPrivateRoute from './components/AdminPrivateRoute.jsx';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(


    // usersiderouter
    
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen />}/>
      <Route  path='/login' element={<LoginScreen />}/>
      <Route  path='/register' element={<RegisterScreen/>}/>
      <Route path='' element={<PrivateRoute />}>
      <Route  path='/profile' element={<ProfileScreen/>}/>

      </Route>

  {/* adminside router  */}

      <Route path='/admin/login' element={<AdminLoginScreen />} />

      <Route path='' element={<AdminPrivateRoute />}>
        <Route path='/admin' element={<AdminHomeScreen />} />
        <Route path='/admin/users' element={<UsersListScreen />} />
        <Route path='/admin/users/update/:id' element={<AdminUserUpdate />} />
        <Route path='/admin/users/add' element={<AdminAddUser />} />

      </Route>
    



    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>
)