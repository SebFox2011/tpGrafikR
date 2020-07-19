import React, { useState, useEffect } from 'react';
import { LoginForm } from './app/LoginForm';
import { apiFetch, netatmoFetchToken, netatmoFetchAuthorize , netatmoDeviceList} from './utils/api';
import { Site } from './app/site';

export default function App() {
  const [user, setUser] = useState(null)
  const [data, setData] = useState({})


  useEffect(() => {
    
    apiFetch('/me')
      .then(setUser)
      .catch(() => setUser(false))

  }, [])

  useEffect(() => {
    
    netatmoDeviceList()
    .then(setData)
    .catch(() => setData(false))

  }, [])

  return (  
    <div>
      {data.body ? JSON.stringify(data.body.devices[0]._id) : null}
      {user ? <Site /> : <LoginForm onConnect={setUser} />}
    </div>
  )
}