/* eslint-disable */

const requestObj = {
    method: '',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ localStorage.getItem('token')
    }
}


/**
 * 
 * @param {*} url 
 * @returns 
 */
async function requestDB(method, url, body = null) {
    try {
        let obj = requestObj
        obj["method"] = method
        const response = await body ? fetch(url,obj) : fetch(url,obj,body)
        return response
    }
    catch (e) {
        return e.toString()
    }
}

module.exports = {
    requestDB
}