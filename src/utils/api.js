/**
 * représente une erreur renvoyée par l'API
 */
export class ApiErrors {
    constructor(errors){
        this.errors = errors
    }
}

/**
 * 
 * @param {sting} endpoint 
 * @param {object} options 
 */
export default async function apiFetch (endpoint,options={}){
    const response = await fetch('http://localhost:3333/' + endpoint, {
        Credentials:'include',
        Headers:{
            Aceept:'application/json'
        },
        ...options
    })
    if(response.status === 204){
        return null
    }
    const responseData = await response.json()
    if (response.ok){
        return responseData
    }
    else {
        if(responseData.errors){
            throw new ApiErrors(responseData.errors)
        }
    }

}