import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import './Product.css'
import { InventoryProductType } from '../../features/InventoryProductSlice'

const InventoryProductCard = (props: InventoryProductType) => {

  return (
    <div className='product'>
      <h3 className='product__title'>{props.name}</h3>
      <p className='product__description'>{props.description}</p>
      <p className='product__description'>In stock: {props.stock}</p>
      <p className='product__description'>Price: ${props.price}</p>
      <p className='product__description'>Provider Id: {props.providerId}</p>
      <p className='product__description'>Minumim: {props.minimumAmount}</p>
      <p className='product__description'>Maximum: {props.maximumAmount}</p>
      <input type="submit" className='product__button' value="Order" />
    </div>
  )
}

export default InventoryProductCard
