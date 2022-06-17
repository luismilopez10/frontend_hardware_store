import React, { useEffect, useState } from 'react'
import './POSProduct.css'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../app/store'
import { cartProductType } from '../../features/InventoryProductSlice'
import { editBill } from '../../features/BillSlice'

const POSProductCard = (props: cartProductType) => {

  const dispatch = useAppDispatch();
  
  const [thisProductAmount, setThisProductAmount] = useState(1)

  const onAddToCart = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    if (props.stock > 0) {
      const newProductToAdd = {
        "id": props.id,
        "name": props.name,
        "price": props.price,
        "amount": thisProductAmount
      }
  
      dispatch(editBill({
        id: "",
        date: "",
        clientName: "",
        employeeName: "",
        products: [newProductToAdd],
        totalPrice: 0,
      }));
    }
  }

  const onMinus = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    if (thisProductAmount > 1) {
      setThisProductAmount(thisProductAmount-1);
    }
  }

  const onPlus = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();    props.stock
    if (thisProductAmount < props.stock) {
      setThisProductAmount(thisProductAmount+1); 
    }     
  }

  return (
    <div className='pos__product'>
      <h3 className='pos__product__title'><b>{props.name}</b></h3>
      <p className='pos__product__description'>{props.description}</p>
      <p className='product__description'><b>Stock:</b> {props.stock}</p>
      <p className='pos__product__description'><b>Price: $</b> {props.price}</p>
      <input type="submit" className='pos__product__button rounded' value="-" onClick={(e) => onMinus(e)} />
      <span>{thisProductAmount}</span>
      <input type="submit" className='pos__product__button rounded' value="+" onClick={(e) => onPlus(e)} />
      <input type="submit" className='pos__product__button rounded' value="Add to cart" onClick={(e) => onAddToCart(e)} />
    </div>
  )
}

export default POSProductCard;

