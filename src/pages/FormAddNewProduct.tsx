import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './FormAddNewProduct.css'

const FormAddNewProduct = () => {

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState();
    const [productProvider, setProductProvider] = useState("");
    const [productMinimum, setProductMinimum] = useState();
    const [productMaximum, setProductMaximum] = useState();

    return (
        <div className='newproductform__body'>
        <div className="newproductform__container">
            <form action="#">
            <div className="title">Add new product</div>
            <div className="input-box underline">
                <input type="text" placeholder="Product Name" required value={productName} onChange={(e) => setProductName(e.target.value)} />
                <div className="underline"></div>
            </div>
            <div className="input-box underline">
                <input type="text" placeholder="Product Description" required value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                <div className="underline"></div>
            </div>
            <div className="input-box underline">
                <input type="number" min="0" placeholder="Product Price" required value={productPrice} onChange={(e) => setProductPrice(parseInt(e.target.value))} />
                <div className="underline"></div>
            </div>
            <div className="input-box underline">
                <input type="text" placeholder="Product Provider" required value={productProvider} onChange={(e) => setProductProvider(e.target.value)} />
                <div className="underline"></div>
            </div>
            <div className="input-box underline">
                <input type="number" min="0" placeholder="Product Minimum" required value={productMinimum} onChange={(e) => setProductMinimum(parseInt(e.target.value))} />
                <div className="underline"></div>
            </div>
            <div className="input-box underline">
                <input type="number" min="0" placeholder="Product Maximum" required value={productMaximum} onChange={(e) => setProductMaximum(parseInt(e.target.value))} />
                <div className="underline"></div>
            </div>
            <div className="input-box button">
                <Link to='/inventory'><input type="submit" name="" value="Add" /></Link>            
            </div>
            </form>
        </div>
        </div>
    )
}

export default FormAddNewProduct