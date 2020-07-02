import React, {useState} from 'react';
import { LoginForm } from './app/LoginForm';

export default function App() {
  const [user, setUser] = useState(null)
  return (
    
    user ?<div >Bonjour tout le monde</div> : <LoginForm onConnect={setUser}/>
  )
}
