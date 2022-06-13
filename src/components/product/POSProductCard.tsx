import React, { useState } from 'react'
import './POSProduct.css'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../app/store'
import { editProduct, cartProductType, cartProduct } from '../../features/InventoryProductSlice'
import { useNavigate } from 'react-router-dom'
import { deleteProduct } from '../../actions/product/deleteProduct'

const POSProductCard = (props: cartProductType) => {

  const [quantity, setQuantity] = useState(1)

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const onEdit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(cartProduct({
      id: props.id,
      name: props.name,
      description: props.description,
      stock: props.stock,
      price: props.price,
    }));
    
    navigate("/formeditproduct");
  }

  const onMinus = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    if (quantity > 1) {
      setQuantity(quantity-1);
    }
  }

  const onPlus = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();    
    setQuantity(quantity+1);      
  }

  return (
    <div className='product'>
      {/* <img src="https://definicion.de/wp-content/uploads/2014/12/tornillo.jpg" alt="" /> */}
      <h3 className='product__title'><b>{props.name}</b></h3>
      <p className='product__description'>{props.description}</p>
      {/* <p className='product__description'><b>Stock:</b> {props.stock}</p> */}
      <p className='product__description'><b>Price: $</b> {props.price}</p>
      <input type="submit" className='product__button rounded' value="-" onClick={(e) => onMinus(e)} />
      <span>{quantity}</span>
      <input type="submit" className='product__button rounded' value="+" onClick={(e) => onPlus(e)} />
      <input type="submit" className='product__button rounded' value="Add to cart" />
    </div>
  )
}

export default POSProductCard;

