/**
 * représente une erreur renvoyée par l'API
 */
export class ApiErrors {
    constructor(errors) {
        this.errors = errors
    }
}

export async function netatmoDeviceList() {
    var myHeaders = new Headers();
    myHeaders.append("Content-type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Bearer 5c73be686899990f008b7e3f|055757242e808715726a630c31e35ed5");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch("https://api.netatmo.net/api/devicelist", requestOptions)
    const responseData = await response.json()
    if (response.ok) {
        console.log(responseData)
        return responseData
    }
    else {
        if (responseData.errors) {
            throw new ApiErrors(responseData.errors)
        }
    }
}

export async function netatmoFetchToken() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "5d9b4ca436935972482157a9");
    urlencoded.append("client_secret", "4uGqWvV5RWfixddNXcd0YO4W28mZEHL6UhfLxT7hTSt6w");
    urlencoded.append("grant_type", "password");
    urlencoded.append("username", "sebastien.philippe5@gmail.com");
    urlencoded.append("password", "Clem2007");
    urlencoded.append("scope", "read_station");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://api.netatmo.com/oauth2/token", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result.access_token))
        .catch(error => console.log('error', error));
}

export async function netatmoFetchAuthorize() {
    const obj = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'api.netatmo.com'
        },
        body: JSON.stringify({
            client_id: '5d9b4ca436935972482157a9',
            client_secret: '4uGqWvV5RWfixddNXcd0YO4W28mZEHL6UhfLxT7hTSt6w',
            username: 'sebastien.philippe5@gmail.com',
            password: 'Clem2007',
            grant_type: 'password',
            scope: 'read_station'
        })
    }

    const response = fetch("https://api.netatmo.net/oauth2/authorize?", obj)
        .then(response => response.text())
        .then(result => console.log('authorize ' + result))
        .catch(error => console.log('error', error))
}


/**
 * 
 * @param {sting} endpoint 
 * @param {object} options 
 */
export async function apiFetch(endpoint, options = {}) {
    const response = await fetch('http://localhost:3333' + endpoint, {
        credentials: 'include',
        headers: {
            Aceept: 'application/json'
        },
        ...options
    })
    if (response.status === 204) {
        return null
    }
    const responseData = await response.json()
    if (response.ok) {
        return responseData
    }
    else {
        if (responseData.errors) {
            throw new ApiErrors(responseData.errors)
        }
    }

}