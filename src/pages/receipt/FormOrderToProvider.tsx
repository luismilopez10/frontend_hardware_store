import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postProduct } from '../../actions/product/postProduct';
import { editInventoryProductType, editProduct, inventoryProductType, selectInventoryProductsState } from '../../features/InventoryProductSlice';
import './FormOrderProduct.css'
import { RootState, useAppDispatch } from '../../app/store'
import { useSelector } from 'react-redux';
import { selectProvidersState, selectProvidersStatus } from '../../features/ProviderSlice';
import { getAllProviders } from '../../actions/provider/getAllProviders';
import { posibleStatus } from '../../features/posibleStatus';
import { updateProduct } from '../../actions/product/updateProduct';
import { receiptType } from '../../features/ReceiptSlice';
import { nanoid } from '@reduxjs/toolkit';
import { postReceipt } from '../../actions/receipt/postReceipt';

const FormOrderToProvider: React.FunctionComponent = () => {

    const {user} = useSelector((state:RootState) => state.logged);
    
    const [InventoryProductId, setInventoryProductId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [providerId, setProviderId] = useState("");
    const [minimum, setMinimum] = useState(0);
    const [maximum, setMaximum] = useState(0);
    const [amount, setAmount] = useState(0);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const getEditInventoryProduct = useSelector((state:RootState) => state.inventoryProduct.editProduct);
    const status = useSelector(selectProvidersStatus());
    const getProviders = useSelector(selectProvidersState());
  
    useEffect(() => {
        if (user === null) {
            navigate('/login');
        } 
        if (status === posibleStatus.IDLE) {
            dispatch(getAllProviders());
        }

        setInventoryProductId(getEditInventoryProduct.id);
        setName(getEditInventoryProduct.name);
        setDescription(getEditInventoryProduct.description);
        setStock(getEditInventoryProduct.stock);
        setPrice(getEditInventoryProduct.price);
        setProviderId(getEditInventoryProduct.providerId);
        setMinimum(getEditInventoryProduct.minimumAmount);
        setMaximum(getEditInventoryProduct.maximumAmount);
    }, [dispatch]);

    const onOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if ((stock+amount) > maximum) {
            alert("Maximum amount of product reached. You can order up to " + (maximum-stock) + " units of this product.");
        } else if (amount) {            
            const productToOrder: editInventoryProductType = {
                id: InventoryProductId, name: name, description: description, stock: stock+amount, price: price, providerId: providerId, minimumAmount: minimum, maximumAmount: maximum
            }

            const receipt: receiptType = {
                id: nanoid(), date: "", productId: InventoryProductId, productAmount: amount, providerId: providerId
            }
            
            dispatch(postReceipt(receipt));
            dispatch(updateProduct(productToOrder));
            navigate("/inventory");
        }
    }

    return (
        <div className='orderproductform__body'>
            <div className="orderproductform__container">
                <form onSubmit={(e) => onOrder(e)}>
                    <div className="title">Order product</div>

                    <label>{name}</label>
                    <br />
                    <label>{description}</label>
                    <br />
                    <label>stock: <b>{stock}</b></label>
                    <br />

                    <div className="input-box underline">
                        <input type="number" min="0" placeholder="Amount" required value={amount==0?"":amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
                        <div className="underline"></div>
                    </div>                    
                    <div className="input-box button">
                        <input type="submit" name="" value="Order" />            
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormOrderToProvider