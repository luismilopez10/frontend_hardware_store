import React, { useEffect } from 'react'
import ProviderList from '../../components/provider/ProviderList'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProvidersFetchError, selectProvidersState, selectProvidersStatus } from '../../features/ProviderSlice'
import { posibleStatus } from '../../features/posibleStatus'
import Loader from '../../components/Loader'
import { RootState } from '../../app/store'

const Provider = () => {

  const {user} = useSelector((state:RootState) => state.logged);
  
  const error = useSelector(selectProvidersFetchError())
  const status = useSelector(selectProvidersStatus())
  const getProviders = useSelector(selectProvidersState())
  
  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) {
        navigate('/login');
    } 
  })

  const onAdd = () =>{    
    navigate("/formaddnewprovider")
  }

  return (
    <div>

      <div>
        <div className='spaced__header'>
          <h1>Providers</h1>
          <input className='btn btn-primary' type="submit" value="Add new provider" onClick={() => onAdd()} />
        </div>
      </div>
      <hr />

      <div className='container'>
        {
          status === posibleStatus.PENDING ? <Loader /> :
          <ProviderList />          
        }
      </div>

    </div>
  )
}

export default Provider