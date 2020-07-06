import React, { useState, useEffect } from 'react';
import { LoginForm } from './app/LoginForm';
import apiFetch from './utils/api';

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    apiFetch('/me')
      .then(setUser)
      .catch(() => setUser(false))
  }, [])

  if (user === null) { return null }
  return (

    user ? <div >Connecté</div> : <LoginForm onConnect={setUser} />
  )
}
