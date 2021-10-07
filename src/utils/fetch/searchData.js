/* eslint-disable */

const defaultObject = {
    count: 0,
    next: null,
    results: []
};

const requestObj = {
    method: 'GET',
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
async function request(url) {
    try {
        let obj = JSON.parse(JSON.stringify(defaultObject))
        const response = await fetch(url,requestObj)
        console.log(url,obj)
        console.log("response",response)
        if (!response.ok) {
            return defaultObject
        }
        else {
            const data = await response.text();
            const json = JSON.parse(data);
            if (Array.isArray(json)){
                obj["count"] = json.length
                obj["pages"] = 1
                obj["results"] = json
                return obj
            }
            else{
                return json;
            }
        }
    }
    catch (e) {
        return defaultObject
    }
}
/**
 * 
 * @param {*} labels 
 * @param {*} data 
 * @returns 
 */
function filterDataTable(labels, data) {
    let newData = data.map((obj) => {
        let objData = {}
        labels.forEach((label) => {
            objData[label] = obj[label];
        })
        return objData;
    })
    return newData
}

/**
 * 
 * @param {*} urlBase 
 * @param {*} schema 
 * @param {*} filters 
 */
async function filterD(urlBase = "", schema = "", filters = {}) {
    let newUrl = urlBase + schema
    Object.keys(filters).forEach((element, index) => {
        if (index == 0) {
            newUrl += "/?" + element + "=" + filters[element];
        }
        else {
            newUrl += "&" + element + "=" + filters[element];
        }
    })
    let data = await request(newUrl)
    return data
}

async function getAll(urlBase = "", schema = "", labels) {
    let info = []
    let next = typeof urlBase === "string" ? urlBase + schema : null
    while (next !== null) {
        let data = await request(next)
        next = data.next
        info.push(...filterDataTable(labels, data.results));
    }
    return info;
}

async function character() {
    let data = await request("http://localhost:8000/api/program_pensum/list")
    console.log(data)
    return data.results
}

module.exports = {
    request,
    filterD,
    getAll,
    character,
    filterDataTable
}