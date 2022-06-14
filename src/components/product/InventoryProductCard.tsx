import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../app/store'
import './Product.css'
import { editProduct, inventoryProductType } from '../../features/InventoryProductSlice'
import { useNavigate } from 'react-router-dom'
import { deleteProduct } from '../../actions/product/deleteProduct'

const InventoryProductCard = (props: inventoryProductType) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const onEdit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(editProduct({
      id: props.id,
      name: props.name,
      description: props.description,
      stock: props.stock,
      price: props.price,
      providerId: props.providerId,
      minimumAmount: props.minimumAmount,
      maximumAmount: props.maximumAmount,
    }));
    
    navigate("/formeditproduct");
  }
  
  const onDelete = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    
    dispatch(deleteProduct(props.id));
  }

  const onOrderToProvider = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(editProduct({
      id: props.id,
      name: props.name,
      description: props.description,
      stock: props.stock,
      price: props.price,
      providerId: props.providerId,
      minimumAmount: props.minimumAmount,
      maximumAmount: props.maximumAmount,
    }));

    navigate('/formordertoprovider');
  }

  return (
    <div className='product'>
      <h3 className='product__title'>
      <input type="submit" className='product__orderbutton' value="Order" onClick={(e) => onOrderToProvider(e)} /><b>{props.name}</b></h3>
      <p className='product__description'>{props.description}</p>
      <p className='product__description'><b>Stock:</b> {props.stock}</p>
      <p className='product__description'><b>Price: $</b> {props.price}</p>
      <p className='product__description'><b>Provider:</b> {props.providerId}</p>
      <p className='product__description'><b>Minimum:</b> {props.minimumAmount}</p>
      <p className='product__description'><b>Maximum:</b> {props.maximumAmount}</p>
      <input type="submit" className='product__button' value="Edit" onClick={(e) => onEdit(e)} />
      <input type="submit" className='product__button' value="Delete" onClick={(e) => onDelete(e)} />
    </div>
  )
}

export default InventoryProductCard;
