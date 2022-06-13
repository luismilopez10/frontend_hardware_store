import { useState } from 'react'
import './App.css'
import './Nav.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import POS from './pages/bill/POS'
import Inventory from './pages/product/Inventory'
import FormAddNewProduct from './pages/product/FormAddNewProduct'
import ProviderList from './components/provider/ProviderList'
import Provider from './pages/provider/Provider'
import FormAddNewProvider from './pages/provider/FormAddNewProvider'
import FormEditProduct from './pages/product/FormEditProduct'
import ShoppingCart from './pages/bill/ShoppingCart'


function App() {

  const logged=true;

  return (
    <div>
      <BrowserRouter>
        {logged ?
          <header>
            <nav className="navbar fixed-top navbar-dark bg-dark nav__container">
              <span className="nav__logo"></span>
              <span className="navbar-brand">Raul's Hardware Store</span>

              <ul className="nav__list">
                  <li className="nav__item">
                      <Link to='/pos' className="nav__link">POS</Link>
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
          </header>
        : 
          <nav className="navbar fixed-top navbar-dark bg-dark nav__container">
              <span className="nav__logo"></span>
              <span className="navbar-brand">Raul's Hardware Store</span>
          </nav>
        }
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/pos" element={<POS />}/>
          <Route path="/providers" element={<Provider />}/>
          <Route path="/inventory" element={<Inventory />}/>
          <Route path="/formaddnewproduct" element={<FormAddNewProduct />}/>
          <Route path="/formeditproduct" element={<FormEditProduct />}/>
          <Route path="/formaddnewprovider" element={<FormAddNewProvider />}/>
          <Route path="/shoppingcart" element={<ShoppingCart />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
