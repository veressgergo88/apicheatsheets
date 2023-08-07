//Szimpla GET request a Fetch API-val

fetch('url')
    .then(response => console.log(response))

//Szimpla POST request a Fetch API-val

fetch('url', {
    method: 'post'
})
    .then(response => console.log(response))

//A FETCH API kérés feldolgozása

fetch('url')
    .then(response => "a válasz feldolgozása...")

// ASYNC-AWAIT függvénnyel fetch

async function getData(){
    let data = await fetch('url')
     //a válasz feldolgozása...
}

//GET engedélyezési tokennel (Bearer)

fetch('url', {
    headers: {
        'Authorization': 'Basic {token}'
    }
})
    .then(response => console.log(response))

// GET CORS-al

fetch('url', {
    mode: 'cors'
})
    .then(response => console.log(response))

// GET querystring data

fetch('url?var1=value1&var2=value2')
    .then(response => console.log(response))

//POST engedélyezési kérelemmel és querystring data

fetch('url?var1=value1&var2=value2', {
    method: 'post',
    headers: {
        'Authorization': 'Bearer {token}'
    }
})
    .then(response => console.log(response))

//POST űrlap adat

let formData = new FormData()
formData.append('field1', 'value1')
formData.append('field2', 'value2')

fetch('url', {
    method: 'post',
    body: formData
})
    .then(response => console.log(response))

//POST JSON adattal

fetch('url', {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'field1': 'value1',
        'field2': 'value2'
    })
})
    .then(response => console.log(response))

//POST JSON adattal CORS

fetch('url', {
    method: 'post',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'field1': 'value1',
        'field2': 'value2'
    })
})
    .then(response => console.log(response))

//A fetch státusz kódjának ellenőrzése

fetch('url')
    .then(response => {
        if(response.status == 200){
            //minden oké...
        } else {
            console.log(response.statusText)
        }
    })

//Hogyan kapsz meg egy szimpla értéket a fetch API válaszból

let userId

fetch('url')
    .then(response => response.text())
    .then(id => {
        userId = id
        console.log(userId)
    })

//Hogyan konvertáld át JSON adattá a fetch API választ

let dataObj

fetch('url')
    .then(response => response.json())
    .then(data => {
        dataObj = data
        console.log(dataObj)
    })

//Javasolt alkalmazás

async function getData(){
    let dataObj

    const response = await fetch('url')
    const data = await response.json()
    dataObj = data
    console.log(dataObj)
}