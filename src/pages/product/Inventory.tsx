import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../app/store'
import InventoryProductCard from '../../components/product/InventoryProductCard'
import './Inventory.css'
import { GrFormAdd } from 'react-icons/gr'
import { posibleStatus } from '../../features/posibleStatus';
import { getAllProducts } from '../../actions/product/getAllProducts';
import { useAppDispatch } from '../../app/store'
import { inventoryProductType, selectInventoryProductsFetchError, selectInventoryProductsState, selectInventoryProductsStatus } from '../../features/InventoryProductSlice'
import Loader from '../../components/Loader'

const Inventory = () => {

  const error = useSelector(selectInventoryProductsFetchError())
  const status = useSelector(selectInventoryProductsStatus())
  const getInventoryProducts = useSelector(selectInventoryProductsState())

  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if (status === posibleStatus.IDLE) {
        dispatch(getAllProducts())
    }
  }, [dispatch])

  return (
    <div>
      <div className='products__body'>
        <h1>Inventory</h1>        
        <div>
          <Link to='/formaddnewproduct'>
            <ul className="wrapper">
              <li className="icon facebook">
                <GrFormAdd />
                <span className="tooltip">Add new product</span>
                <span><i className="fab fa-facebook-f"></i></span>
              </li>
            </ul>
          </Link>
        </div>
      </div>

      <div className='inventory__container container'>        
      {
        status === posibleStatus.PENDING ? <Loader /> : 
        <div>
          {getInventoryProducts.map((product: inventoryProductType) => {
            return (
              <div key={product.id} className='products'>
                <InventoryProductCard 
                  id={product.id} 
                  name={product.name} 
                  description={product.description} 
                  stock={product.stock} 
                  price={product.price} 
                  providerId={product.providerId} 
                  minimumAmount={product.minimumAmount} 
                  maximumAmount={product.maximumAmount} 
                />
              </div>)
          })}
        </div>
      }       
      </div>

    </div>
  )
}

export default Inventory

