import React from 'react'
import ProviderList from '../../components/provider/ProviderList'
import { Link, useNavigate } from 'react-router-dom'

const Provider = () => {

  const navigate = useNavigate()

  const newProvider = () =>{    
    navigate("/formaddnewprovider")
  }

  return (
    <div>
        <ProviderList />
        <input className='btn btn-primary' type="submit" value="Add new provider" onClick={() => newProvider()} />
    </div>
  )
}

export default Provider