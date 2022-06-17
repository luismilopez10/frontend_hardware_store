import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../app/store';
import { billInCurrentOrderType, deleteProductInCurrentBill, editBill } from '../../features/BillSlice'
import './BillProductCard.css'


const BillProductCard = (props: billInCurrentOrderType) => {

    const [thisProductAmount, setThisProductAmount] = useState(props.amount);

    const getPruductsInCurrentBill = useSelector((state: RootState) => state.bill.billInCurrentOrder.products);

    const dispatch = useAppDispatch();

    const onDelete = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault();

        const newListOfProducts = getPruductsInCurrentBill.filter(product => product.id !== props.id)
        console.log(newListOfProducts);

        dispatch(deleteProductInCurrentBill({
            id: "",
            date: "",
            clientName: "",
            employeeName: "",
            products: [...newListOfProducts],
            totalPrice: 0,
        }));

        const totalCurrentPrice = getPruductsInCurrentBill
            .map(product => product.price * product.amount)
            .reduce((a, b) => a + b, 0);

            dispatch(deleteProductInCurrentBill({
                id: "",
                date: "",
                clientName: "",
                employeeName: "",
                products: [...newListOfProducts],
                totalPrice: totalCurrentPrice,
            }));
    }

    // const onMinus = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    //     e.preventDefault();

    //     if (thisProductAmount > 1) {
    //         setThisProductAmount(thisProductAmount - 1);
    //     }
    // }

    // const onPlus = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    //     e.preventDefault();
    //     setThisProductAmount(thisProductAmount + 1);
    // }

    return (
        <div className='bill__product'>
            <h3 className='bill__product__title'>
                <input type="submit" className='bill__deletebutton' value="Delete" onClick={(e) => { onDelete(e) }} />
                <b>{props.name}</b>
            </h3>
            <p className='bill__product__description'><b>Total amount: </b>{thisProductAmount}</p>
            <p className='bill__product__description'><b>Price: </b>${props.price}</p>
            <p className='bill__product__description'><b>Total: </b>${props.price * thisProductAmount}</p>
            {/* <input type="submit" className='bill__product__button rounded' value="-" onClick={(e) => onMinus(e)} />
            <span>{thisProductAmount}</span>
            <input type="submit" className='bill__product__button rounded' value="+" onClick={(e) => onPlus(e)} /> */}
        </div>
    )
}

export default BillProductCard