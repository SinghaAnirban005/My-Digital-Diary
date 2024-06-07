import React, { useState, useEffect } from 'react'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import Header from './components/Header/Header'
import './App.css'
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer.jsx'

function App() {

  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
       
      }
      else{
        dispatch(logout())
      }
    } )
    .finally(() => setLoading(false))
  }, [])

  //We shall conditionally render .. 
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main>
      {/* TODO:  <Outlet /> */}
      <Outlet />
      </main>
      <Footer />
    </div>
  </div>
  ) : null

}

export default App