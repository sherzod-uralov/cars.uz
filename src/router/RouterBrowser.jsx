import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from '../components/Register'
import Login from '../components/Login'
import Category from '../components/Categoryes'



const RouterBrowser = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' Component={Register}/>
        <Route path='/login' Component={Login}/>
        <Route path='/categores' Component={Category}/>
    </Routes>
    </BrowserRouter>
  )
}

export default RouterBrowser