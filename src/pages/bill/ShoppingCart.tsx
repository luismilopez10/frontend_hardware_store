import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postBill } from '../../actions/bill/postBill';
import { RootState, useAppDispatch } from '../../app/store';
import { billInCurrentOrderType, editBill } from '../../features/BillSlice';
import BillProductCard from './BillProductCard';
import './ShoppingCart.css'

const ShoppingCart = () => {

  const { user } = useSelector((state: RootState) => state.logged);
  const getProductsInCurrentBill = useSelector((state:RootState) => state.bill.billInCurrentOrder.products);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");

  const getCurrentBill = useSelector((state: RootState) => state.bill.billInCurrentOrder);

  const unicIdOfEachProduct = [...new Set(getCurrentBill.products.map(product => product.id))];

  const finalProductListForBill = unicIdOfEachProduct
    .map(productId => getCurrentBill.products
      .filter(product => product.id === productId)
    );

  const totalCurrentPrice = getCurrentBill.products
    .map(product => product.price*product.amount)
    .reduce((a, b) => a + b, 0);

  const updateTotalBillPrice = () => {
    dispatch(editBill({
      id: "",
      date: "",
      clientName: "",
      employeeName: "",
      products: [...getCurrentBill.products],
      totalPrice: totalCurrentPrice,
    }));
  };


  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
    updateTotalBillPrice();
  }, [dispatch]);


  const onGenerateBill = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(editBill({
      id: nanoid(),
      date: "",
      clientName: clientName === "" ? "Generic Client" : clientName,
      employeeName: user === null ? "Don Raúl" : user,
      products: getProductsInCurrentBill,
      totalPrice: totalCurrentPrice,
    }));    

    // var fechaEnMiliseg = Date.now();

    dispatch(postBill({
      id: nanoid(),
      date: "2022-06-17",
      clientName: clientName === "" ? "Generic Client" : clientName,
      employeeName: user === null ? "Don Raúl" : user,
      products: getProductsInCurrentBill,
      totalPrice: totalCurrentPrice,
    }));
    // setClientName("");

    // dispatch(editBill({
    //   id: "",
    //   date: "",
    //   clientName: "",
    //   employeeName: "",
    //   products: [],
    //   totalPrice: 0,
    // }));

    navigate('/pos');
  }

  return (
    <div className='container'>
      <div className='spaced__header'>
        <AiOutlineShoppingCart className='cart__icon' />
        <h1>Shopping Cart</h1>
        <input type="submit" className='shoppingcart__button rounded' value="Generate Bill" onClick={(e) => onGenerateBill(e)} />
      </div>
      <p className='product__description'><b>Total: </b>${getCurrentBill.totalPrice}</p>

      <div className="newproductform__container">
        <div className="input-box underline">
          <input type="text" placeholder="Client name" required value={clientName} onChange={(e) => setClientName(e.target.value)} />
          <div className="underline"></div>
        </div>
      </div>

      <hr />

      {getCurrentBill.products.map((product: billInCurrentOrderType) => {
        return (
          <div key={product.id} className='card'>
            <BillProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              amount={product.amount}
            />
          </div>)
      })}
    </div>
  )
}

export default ShoppingCart
