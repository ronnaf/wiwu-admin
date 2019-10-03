import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router'

import { setCurrentUser } from './actions/admin/setCurrentUser.action'

import { auth } from './firebase'

import PrivateRoute from './routes/PrivateRoute'
import AuthRoute from './routes/AuthRoute'
import AuthPage from './pages/AuthPage'
import AdminPage from './pages/AdminPage'
import NoMatch from './screens/NoMatch'
import Spinner from './components/Spinner'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const [loading, setLoadingStatus] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged(async user => {
      await dispatch(setCurrentUser(user))
      setLoadingStatus(false)
    })
  }, [])

  if (loading) {
    return <Spinner tip='Please wait for a while...' height={800} />
  }

  return (
    <div className='App'>
      <Switch>
        <Redirect exact from='/' to='/admin-page' />
        <PrivateRoute path='/admin-page' component={AdminPage} />
        <AuthRoute path='/auth-page' component={AuthPage} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  )
}

export default App
