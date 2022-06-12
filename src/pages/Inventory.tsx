import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../app/store'
import InventoryProductCard from '../components/product/InventoryProductCard'
import './Inventory.css'

const Inventory = () => {

  const inventoryProducts = useSelector((state: RootState) => state.inventoryProducts.products)
  
  return (
    <div className='products__body'>
      <h1>Inventory</h1>

      {inventoryProducts.map(product => {
        return <div key={product.id} className='products'>
          <InventoryProductCard 
            id={product.id} 
            name={product.name} 
            description={product.description} 
            stock={product.stock} 
            price={product.price} 
            providerId={product.providerId} 
            minimumAmount={product.minimumAmount} 
            maximumAmount={product.maximumAmount} 
          />
        </div>
      })}
      
      <div>
        <Link to='/formaddnewproduct'>
          <ul className="wrapper">
            <li className="icon facebook">+
              <span className="tooltip">Add new product</span>
              <span><i className="fab fa-facebook-f"></i></span>
            </li>
          </ul>
        </Link>
      </div>
    </div>
  )
}

export default Inventory