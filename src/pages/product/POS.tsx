import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../app/store'
import InventoryProductCard from '../../components/product/InventoryProductCard'
import './POS.css'
import { posibleStatus } from '../../features/posibleStatus';
import { getAllProducts } from '../../actions/product/getAllProducts';
import { useAppDispatch } from '../../app/store'
import { inventoryProductType, selectInventoryProductsFetchError, selectInventoryProductsState, selectInventoryProductsStatus } from '../../features/InventoryProductSlice'
import Loader from '../../components/Loader'
import POSProductCard from '../../components/product/POSProductCard'
import { AiOutlineShoppingCart } from 'react-icons/ai'

type Props = {}

const POS = (props: Props) => {

  const {user} = useSelector((state:RootState) => state.logged);

  const error = useSelector(selectInventoryProductsFetchError())
  const status = useSelector(selectInventoryProductsStatus())
  const getInventoryProducts = useSelector(selectInventoryProductsState())

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (user === null) {
      navigate('/login');
    } 
    if (status === posibleStatus.IDLE) {
        dispatch(getAllProducts());
    }
  }, [dispatch])

  const onShoppingCart = () => {
    navigate("/shoppingcart")
  }

  return (
    <div>
      <div className='spaced__header'>
        <h1>Point of sale</h1>        
        <AiOutlineShoppingCart className='cart__icon' onClick={() => onShoppingCart()} />
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
                    <POSProductCard 
                      id={product.id} 
                      name={product.name} 
                      description={product.description} 
                      stock={product.stock} 
                      price={product.price} 
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

export default POS