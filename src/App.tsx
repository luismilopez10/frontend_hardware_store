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
import SignIn from './SignIn'
import { app } from './firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { logInInReducer, logOutInReducer } from './app/loggedInSlice'
import { RootState } from './app/store'


function App() {

  const {user} = useSelector((state:RootState) => state.logged)
  const dispatch = useDispatch();
  
  const logout = () => {
    console.log("hola");
    dispatch(logOutInReducer())    
  }

  return (
    <div>
      <BrowserRouter>
        {user === null ?
          <header>
            <nav className="navbar fixed-top navbar-dark bg-dark nav__container">
                <span className="nav__logo"></span>
                <span className="navbar-brand">Raul's Hardware Store</span>
            </nav>
          </header>
        : 
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
                      <Link to='/' className="nav__link" onClick={()=>{logout()}}>Logout</Link>
                  </li>
              </ul>
            </nav>
          </header>
        }
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="SignIn" element={<SignIn />}/>
          <Route path="logIn" element={<Login />}/>
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
