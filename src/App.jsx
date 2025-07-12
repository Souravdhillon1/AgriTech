import Login from './home/Login'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Register from './home/Register'
import Home from "./home/Home"
import Search from './results/Search'
import ForgotPassword from './home/ForgotPassword'
import ResetPassword from './home/ResetPassword'
import Cart from './results/Cart'
import Address from './home/Address'
import Help from './home/Help'
import You from './home/You'
import Settings from './home/Settings'
import More from './home/More'
import SellForm from './home/SellForm'
import Menu from './home/Menu'
import Payment from './home/Payment'
function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/address" element={<Address/>} />
        <Route path="/help" element={<Help/>} />
        <Route path="/you" element={<You/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/more" element={<More/>} />
        <Route path="/sell" element={<SellForm/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/payment" element={<Payment/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
