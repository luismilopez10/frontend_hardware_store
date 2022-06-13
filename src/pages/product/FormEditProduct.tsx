import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postProduct } from '../../actions/product/postProduct';
import { editInventoryProductType, editProduct, inventoryProductType, selectInventoryProductsState } from '../../features/InventoryProductSlice';
import './FormAddNewProduct.css'
import { RootState, useAppDispatch } from '../../app/store'
import { useSelector } from 'react-redux';
import { selectProvidersState, selectProvidersStatus } from '../../features/ProviderSlice';
import { getAllProviders } from '../../actions/provider/getAllProviders';
import { posibleStatus } from '../../features/posibleStatus';
import { updateProduct } from '../../actions/product/updateProduct';

const FormEditProduct: React.FunctionComponent = () => {

    const {user} = useSelector((state:RootState) => state.logged);
    
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [providerId, setProviderId] = useState("");
    const [minimum, setMinimum] = useState(0);
    const [maximum, setMaximum] = useState(0);

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

        setId(getEditInventoryProduct.id);
        setName(getEditInventoryProduct.name);
        setDescription(getEditInventoryProduct.description);
        setStock(getEditInventoryProduct.stock);
        setPrice(getEditInventoryProduct.price);
        setProviderId(getEditInventoryProduct.providerId);
        setMinimum(getEditInventoryProduct.minimumAmount);
        setMaximum(getEditInventoryProduct.maximumAmount);
    }, [dispatch]);

    const onEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name && description && price && providerId && minimum && maximum && minimum < maximum) {
            const editedInventoryProduct: editInventoryProductType = {
                id: id, name: name, description: description, stock: stock, price: price, providerId: providerId, minimumAmount: minimum, maximumAmount: maximum
            }

            dispatch(updateProduct(editedInventoryProduct));
            navigate("/inventory");
        } else if (minimum > maximum) {
            alert("The minimum amount or products can't be greater than the maximum.");
            setMinimum(0);
            setMaximum(0);
        }
    }

    return (
        <div className='newproductform__body'>
            <div className="newproductform__container">
                <form onSubmit={(e) => onEdit(e)}>
                    <div className="title">Edit product</div>
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
                        <select className='form-select' onChange={(e) => setProviderId(e.target.value)}>
                            {getProviders.map(provider => {
                                return provider.id === providerId ? 
                                <option value={provider.id} selected>{provider.name}</option>
                                :<option value={provider.id}>{provider.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="input-box underline">
                        <input type="number" min="0" placeholder="Product Minimum" required value={minimum} onChange={(e) => setMinimum(parseInt(e.target.value))} />
                        <div className="underline"></div>
                    </div>
                    <div className="input-box underline">
                        <input type="number" min="0" placeholder="Product Maximum" required value={maximum} onChange={(e) => setMaximum(parseInt(e.target.value))} />
                        <div className="underline"></div>
                    </div>
                    <div className="input-box button">
                        <input type="submit" name="" value="Commit Edit" />            
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormEditProduct