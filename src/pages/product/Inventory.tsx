import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../app/store'
import InventoryProductCard from '../../components/product/InventoryProductCard'
import './Inventory.css'
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
  const navigate = useNavigate()
  
  useEffect(() => {
    if (status === posibleStatus.IDLE) {
        dispatch(getAllProducts())
    }
  }, [dispatch])

  const onAdd = () => {
    navigate("/formaddnewproduct")
  }

  return (
    <div>
      
      <div className='spaced__header'>
        <h1>Inventory</h1>
        <input className='btn btn-primary' type="submit" value="Add new product" onClick={() => onAdd()} />
      </div>
      <hr />

      <div className='container'>
        <div className='d-flex flex-wrap'>        
          {
            status === posibleStatus.PENDING ? <Loader /> : 
            
            <div className='card-product d-flex flex-column justify-content-between shadow p-3 mb-2 bg-light rounded'>
              {getInventoryProducts.map((product: inventoryProductType) => {
                return (
                  <div key={product.id} className=''>
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

    </div>
  )
}

export default Inventory

