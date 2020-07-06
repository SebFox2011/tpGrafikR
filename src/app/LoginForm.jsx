import React, {useState} from 'react'
import PropTypes from 'prop-types'

export function LoginForm() {

    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const  handleSubmit = async (event) => {
        setError(null)
        setLoading(true)
        event.preventDefault()
        const data = new FormData(event.target)
        const response = await fetch('http://localhost:3333/login',{
            method:'POST',
            body:data,
            credentials:'include',
            headers:{
                Accept: 'application/json'
            }
        })
        const responseData = await response.json()
        if (response.ok) {

        }
        else {
            setError(responseData.errors[0].message)
        }
        setLoading(false)
    }

    return <form className='container mt-4' onSubmit={handleSubmit}>
        <h2>Se connecter</h2>
        {error && <Alert>{error}</Alert>}
        <div className="group-form">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input name="email" type="text" id='username' className='form-control' required/>
        </div>
        <div className="group-form">
            <label htmlFor="password">Mot de passe</label>
            <input name="password" type="password" id='password' className='form-control' required/>
        </div>
        <button disabled={isLoading} type='submit' className='btn btn-primary'>Se connecter</button>
    </form>
}
LoginForm.propTypes = {
    onConnect: PropTypes.func.isRequired
}

function Alert ({children}) {

    return <div className='alert alert-danger'>{children}</div>
}