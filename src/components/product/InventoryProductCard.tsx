import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../app/store'
import './Product.css'
import { editProduct, inventoryProductType } from '../../features/InventoryProductSlice'
import { useNavigate } from 'react-router-dom'

const InventoryProductCard = (props: inventoryProductType) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const onEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    console.log("aquíiiiii");
    
    dispatch(editProduct({
      name: props.name,
      description: props.description,
      price: props.price,
      providerId: props.providerId,
      minimumAmount: props.minimumAmount,
      maximumAmount: props.maximumAmount,
    }))
    
    navigate("/formaddnewprovider")
  }

  return (
    <div className='product'>
      <h3 className='product__title'>{props.name}</h3>
      <p className='product__description'>{props.description}</p>
      <p className='product__description'>In stock: {props.stock}</p>
      <p className='product__description'>Price: ${props.price}</p>
      <p className='product__description'>Provider Id: {props.providerId}</p>
      <p className='product__description'>Minimum: {props.minimumAmount}</p>
      <p className='product__description'>Maximum: {props.maximumAmount}</p>
      <input type="submit" className='product__button' value="Edit" onClick={() => onEdit} />
      <input type="submit" className='product__button' value="Delete" />
    </div>
  )
}

export default InventoryProductCard
