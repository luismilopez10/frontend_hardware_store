import React, { useState } from 'react'
import { billInCurrentOrderType } from '../../features/BillSlice'
import './BillProductCard.css'


const BillProductCard = (props: billInCurrentOrderType) => {
    
    const [thisProductAmount, setThisProductAmount] = useState(1);
    
    const [totalPrice, setTotalPrice] = useState(0);

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
    <div className='bill__product'>
      <h3 className='bill__product__title'>
      <input type="submit" className='bill__deletebutton' value="Delete" onClick={(e) => {}} /><b>{props.name}</b> </h3>
      <p className='bill__product__description'><b>Total amount:</b> {props.amount}</p>
      <p className='bill__product__description'><b>Total: $</b>{props.price*props.amount}</p>
      {/* <input type="submit" className='bill__product__button rounded' value="-" onClick={(e) => onMinus(e)} />
      <span>{thisProductAmount}</span>
      <input type="submit" className='bill__product__button rounded' value="+" onClick={(e) => onPlus(e)} /> */}
    </div>
  )
}

export default BillProductCard