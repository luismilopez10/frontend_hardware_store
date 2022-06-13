import { nanoid } from '@reduxjs/toolkit';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postProduct } from '../../actions/product/postProduct';
import { inventoryProductType } from '../../features/InventoryProductSlice';
import './FormAddNewProduct.css'
import { useAppDispatch } from '../../app/store'
import { useSelector } from 'react-redux';
import { selectProvidersState, selectProvidersStatus } from '../../features/ProviderSlice';
import { getAllProviders } from '../../actions/provider/getAllProviders';
import { posibleStatus } from '../../features/posibleStatus';

const FormAddNewProduct: React.FunctionComponent = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [providerId, setProviderId] = useState("");
    const [minimum, setMinimum] = useState(0);
    const [maximum, setMaximum] = useState(0);

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const status = useSelector(selectProvidersStatus())
    const getProviders = useSelector(selectProvidersState())
  
    useEffect(() => {
      if (status === posibleStatus.IDLE) {
          dispatch(getAllProviders())
      }
    }, [dispatch])

    const onAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (name && description && price && providerId && minimum && maximum && minimum < maximum) {
            const newInventoryProduct: inventoryProductType = {
                id: nanoid(), name: name, description: description, stock: 0, price: price, providerId: providerId, minimumAmount: minimum, maximumAmount: maximum
            }

            dispatch(postProduct(newInventoryProduct))
            navigate("/inventory")
        } else if (minimum > maximum) {
            alert("The minimum amount or products can't be greater than the maximum.")
            setMinimum(0)
            setMaximum(0)
        } else if (!providerId) {
            alert('Select the provider')
        }
    }

    return (
        <div className='newproductform__body'>
            <div className="newproductform__container">
                <form onSubmit={(e) => onAdd(e)}>
                    <div className="title">Add new product</div>
                    <div className="input-box underline">
                        <input type="text" placeholder="Product Name" required value={name} onChange={(e) => setName(e.target.value)} />
                        <div className="underline"></div>
                    </div>
                    <div className="input-box underline">
                        <input type="text" placeholder="Product Description" required value={description} onChange={(e) => setDescription(e.target.value)} />
                        <div className="underline"></div>
                    </div>
                    <div className="input-box underline">
                        <input type="number" min="0" placeholder="Product Price" required value={price==0?"":price} onChange={(e) => setPrice(parseInt(e.target.value))} />
                        <div className="underline"></div>
                    </div>
                    <div className="input-box">
                        <select defaultValue={'N/A'} className='form-select' onChange={(e) => setProviderId(e.target.value)}>
                            <option value="N/A" disabled>Select provider</option>
                            {getProviders.map(provider => {
                                return <option value={provider.id}>{provider.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="input-box underline">
                        <input type="number" min="0" placeholder="Product Minimum" required value={minimum==0?"":minimum} onChange={(e) => setMinimum(parseInt(e.target.value))} />
                        <div className="underline"></div>
                    </div>
                    <div className="input-box underline">
                        <input type="number" min="0" placeholder="Product Maximum" required value={maximum==0?"":maximum} onChange={(e) => setMaximum(parseInt(e.target.value))} />
                        <div className="underline"></div>
                    </div>
                    <div className="input-box button">
                        <input type="submit" name="" value="Add" />            
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormAddNewProduct