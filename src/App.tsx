import { useState } from 'react'
import './App.css'
import './Nav.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import POS from './pages/POS'
import Inventory from './pages/Inventory'
import FormAddNewProduct from './pages/FormAddNewProduct'


function App() {

  const logged=true;

  return (
    <div>
      <BrowserRouter>
        {logged ?
          <nav className="nav nav__container">
              <span className="nav__logo"></span>
              <ul className="nav__list">
                  <li className="nav__item">
                      <Link to='/' className="nav__link">POS</Link>
                  </li>
                  <li className="nav__item">
                      <Link to='/providers' className="nav__link">Providers</Link>
                  </li>
                  <li className="nav__item">
                      <Link to='/inventory' className="nav__link">Inventory</Link>
                  </li>
                  <li className="nav__item">
                      <Link to='/login' className="nav__link">Logout</Link>
                  </li>
              </ul>
          </nav>
        : 
          <nav className="nav nav__container">
              <span className="nav__logo"></span>
          </nav>
        }
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/pos" element={<POS />}/>
          <Route path="/inventory" element={<Inventory />}/>
          <Route path="/formaddnewproduct" element={<FormAddNewProduct />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
