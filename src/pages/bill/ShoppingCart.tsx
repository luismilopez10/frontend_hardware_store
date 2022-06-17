import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postBill } from '../../actions/bill/postBill';
import { updateProduct } from '../../actions/product/updateProduct';
import { RootState, useAppDispatch } from '../../app/store';
import { billInCurrentOrderType, editBill } from '../../features/BillSlice';
import { inventoryProductType } from '../../features/InventoryProductSlice';
import BillProductCard from './BillProductCard';
import './ShoppingCart.css'

const ShoppingCart = () => {

  const { user } = useSelector((state: RootState) => state.logged);
  const getProductsInCurrentBill = useSelector((state: RootState) => state.bill.billInCurrentOrder.products);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");

  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
    updateTotalBillPrice();
  }, [dispatch]);

  const getCurrentBill = useSelector((state: RootState) => state.bill.billInCurrentOrder);
  const getAllProductsInInventory = useSelector((state: RootState) => state.inventoryProduct.products);

  const totalCurrentPrice = getCurrentBill.products
    .map(product => product.price * product.amount)
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


  const productsOfInventoryToSell: inventoryProductType[] = [];

  const onGenerateBill = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    getAllProductsInInventory.forEach(productInventory => {
      getCurrentBill.products.forEach(productBill => {
        if (productInventory.id === productBill.id) {
          productsOfInventoryToSell.push(productInventory);
        }
      })
    })

    const productsAboveMinimum: string[] = [];
    var sellConfirmed= false;

    productsOfInventoryToSell.forEach(productInventory => {
      getProductsInCurrentBill.forEach(ProductBill => {

        if ((productInventory.stock - ProductBill.amount) < productInventory.minimumAmount) {
          productsAboveMinimum.push(ProductBill.name);
        }

        if ((productInventory.stock - ProductBill.amount) < 0) {
          alert("You don't have enough of " + productInventory.name + ". You have " + productInventory.stock + " units in stock.");
        } else {
          sellConfirmed = true;

          const productWithStockModified = {
            id: productInventory.id, name: productInventory.name, description: productInventory.description, stock: productInventory.stock - ProductBill.amount, price: productInventory.price, providerId: productInventory.providerId, minimumAmount: productInventory.minimumAmount, maximumAmount: productInventory.maximumAmount
          }

          dispatch(updateProduct(productWithStockModified));
        }
      })
    });

    if (productsAboveMinimum.length > 0) {
      productsAboveMinimum.forEach(productName => {
        alert("Minimum amount of product (" + productName + ") reached. Consider ordering more units from your provider.");
      })
    }

    const copyOfProductsInCurrentBill = [...getProductsInCurrentBill];

    if (sellConfirmed) {
      const finalBill = {
        id: nanoid(),
        date: "",
        clientName: clientName === "" ? "Generic Client" : clientName,
        employeeName: user === null ? "Don Raúl" : user,
        products: copyOfProductsInCurrentBill,
        totalPrice: totalCurrentPrice,
      }
  
      dispatch(editBill(finalBill));
  
      dispatch(postBill(finalBill));
      
      // dispatch(editBill({
      //   id: "",
      //   date: "",
      //   clientName: "",
      //   employeeName: "",
      //   products: [],
      //   totalPrice: 0,
      // }));

      alert("Bill generated.")

      navigate('/pos');
    } else {
      alert("An error ocurred while creating the bill.")
    }


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
