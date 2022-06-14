import React, { useState } from 'react'
import './POSProduct.css'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../app/store'
import { editProduct, cartProductType, cartProduct } from '../../features/InventoryProductSlice'
import { useNavigate } from 'react-router-dom'
import { deleteProduct } from '../../actions/product/deleteProduct'
import { editBill } from '../../features/BillSlice'

const POSProductCard = (props: cartProductType) => {

  const [thisProductAmount, setThisProductAmount] = useState(1)
  
  const [thisProduct, setThisProduct] = useState({});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getBillInCurrentOrder = useSelector((state:RootState) => state.bill.billInCurrentOrder);
  
  const onAddToCart = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    setThisProduct({
      // TODO: Crear la <Key, Value> del producto
      "": {thisProductAmount}
    })

    dispatch(editBill({
      id: "",
      date: "",
      clientName: "",
      employeeName: "",
      products: {...getBillInCurrentOrder.products, products: thisProduct},
      totalPrice: 0,
    }));
  }

  const onMinus = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    if (thisProductAmount > 1) {
      setThisProductAmount(thisProductAmount-1);
    }
  }

  const onPlus = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();    
    setThisProductAmount(thisProductAmount+1);      
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

