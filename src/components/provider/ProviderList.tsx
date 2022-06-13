import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector } from 'react-redux';
import { providerType, selectProvidersState, selectProvidersStatus } from '../../features/ProviderSlice';
import { useAppDispatch } from '../../app/store';
import { posibleStatus } from '../../features/posibleStatus';
import { getAllProviders } from '../../actions/provider/getAllProviders';

const ProviderList = () => {
  
  const status = useSelector(selectProvidersStatus())
  const getProviders = useSelector(selectProvidersState())
  
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if (status === posibleStatus.IDLE) {
        dispatch(getAllProviders())
    }
  }, [dispatch])

  return (
    <div>
      <h1>Providers</h1>

      <table id="dtDynamicVerticalScrollExample" className="table table-striped table-bordered table-sm" width="100%" cellSpacing={0}>
        <thead>
          <tr>
            <th className="th-sm">id
            </th>
            <th className="th-sm">Name
            </th>
            <th className="th-sm">Passport
            </th>
          </tr>
        </thead>
        <tbody>
          {getProviders.map((provider: providerType) => {
            return <tr>
              <td>{provider.id}</td>
              <td>{provider.name}</td>
              <td>{provider.passport}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ProviderList