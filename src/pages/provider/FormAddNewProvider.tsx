import { nanoid } from '@reduxjs/toolkit';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postProvider } from '../../actions/provider/postProvider';
import { providerType } from '../../features/ProviderSlice';
import './FormAddNewProvider.css'
import { useAppDispatch } from '../../app/store'
import { useSelector } from 'react-redux';
import { selectProvidersState, selectProvidersStatus } from '../../features/ProviderSlice';
import { getAllProviders } from '../../actions/provider/getAllProviders';
import { posibleStatus } from '../../features/posibleStatus';

const FormAddNewProvider: React.FunctionComponent = () => {

    const [name, setName] = useState("");
    const [passport, setPassport] = useState("");

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

        if (name && passport) {
            const newProvider: providerType = {
                id: nanoid(), name: name, passport: passport
            }

            dispatch(postProvider(newProvider))
            navigate("/providers")
        }
    }

    return (
        <div className='newproviderform__body'>
            <div className="newproviderform__container">
                <form onSubmit={(e) => onAdd(e)}>
                    <div className="title">Add new provider</div>
                    <div className="input-box underline">
                        <input type="text" placeholder="Provider Name" required value={name} onChange={(e) => setName(e.target.value)} />
                        <div className="underline"></div>
                    </div>
                    <div className="input-box underline">
                        <input type="text" min="0" placeholder="Provider Passport" required value={passport} onChange={(e) => setPassport(e.target.value)} />
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

export default FormAddNewProvider