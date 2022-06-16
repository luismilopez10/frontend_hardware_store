import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../app/store';
import { billInCurrentOrderType } from '../../features/BillSlice';
import BillProductCard from './BillProductCard';
import './ShoppingCart.css'

const ShoppingCart = () => {
    
  const {user} = useSelector((state:RootState) => state.logged);

  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const getAllProductsInCurrentBill = useSelector((state:RootState) => state.bill.billInCurrentOrder.products);

  const unicIdOfEachProduct = [...new Set(getAllProductsInCurrentBill.map(product => product.id))];
    
  const totalBillPrice = (unicIdOfEachProduct.map(productId => getAllProductsInCurrentBill
      .filter(product => product.id === productId)
      .reduce((a,b) => a+b.price,0))
      .reduce((a,b) => a+b,0)
  );
  

    // const finalProductListForBill = getUnicIdOfEachProduct.map(productId => {
    //     getAllProductsInCurrentBill
    //     .filter(product => product.id === productId)
    //     .map(unicProduct => {
    //         var productList = new Map();
    //         productList.set("id", unicProduct.id);
    //         productList.set("name", unicProduct.name);
    //         productList.set("price", unicProduct.price);
    //         productList.set("amount", unicProduct.amount);
    //     })
    // });


    const finalProductListForBill = unicIdOfEachProduct
        .map(productId => getAllProductsInCurrentBill
            .filter(product => product.id === productId)
    );


  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
    console.log(getAllProductsInCurrentBill);
    console.log(unicIdOfEachProduct);
    console.log(finalProductListForBill);
  }, [dispatch]);



  const onDelete = () => {
    
  }

  return (
    <div className='container'>
      {getAllProductsInCurrentBill.flatMap((product: billInCurrentOrderType) => {
        return (
          <div key={product.id} className=''>
            <BillProductCard 
              id={product.id} 
              name={product.name} 
              price={product.price} 
              amount={product.amount}
            />
          </div>)
      })}
      <div>
        <p className='bill__product__description'>Total: <b>$</b>{totalBillPrice}</p>
        <input type="submit" className='bill__product__button rounded' value="Confirm Sell" onClick={(e) => onDelete()} />
      </div>
    </div>
  )
}

export default ShoppingCart
