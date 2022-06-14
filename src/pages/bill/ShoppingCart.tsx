import React from 'react'
import './ShoppingCart.css'

const ShoppingCart = () => {
  return (
    <div className='newproductform__body'>
        <div className="newproductform__container">
            <form onSubmit={(e) => {}}>
                <div className="title">Generate Bill</div>
                <div className="input-box underline">
                    <input type="text" placeholder="Client Name" required value="" onChange={(e) => {}} />
                    <div className="underline"></div>
                </div>
                <div className="input-box underline">
                    <input type="text" placeholder="Employee Name" required value="" onChange={(e) => {}} />
                    <div className="underline"></div>
                </div>
                <div className="input-box underline">
                    <input type="number" min="0" placeholder="Product Price" required value="" onChange={(e) => {}} />
                    <div className="underline"></div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ShoppingCart