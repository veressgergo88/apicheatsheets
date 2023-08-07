//telepítés: 
//npm i axios vagy npm install axios

//importálás a kódunkba:
import "axios" from axios
//vagy
import "http" from axios //(ha így hívjuk meg, akkor a http szót kell használnunk az axios helyett)

//Axios Shorthand metódusok:-------------------------------------
axios.request(config) //--> Egy REQUEST request-et küld
axios.get(url, config) //--> Egy GET request-et küld
axios.delete(url, config) //--> Egy DELETE request-et küld
axios.head(url, config) //--> Egy HEAD request-et küld
axios.options(url,config) //--> Egy OPTIONS request-et küld
axios.post(url, data, config) //--> Egy POST request-et küld
axios.put(url, data, config) //--> Egy PUT request-et küld
axios.patch(url, data, config) //--> Egy PATCH request-et küld
//-----------------------------------------------------------------

//Axios request Promises -el-------------------------------------
const axios = require("axios")
const url = "https://jsonplaceholder.typicode.com/todos/1"

axios.get(url)
    .then((response) => response)
    .then((responseObject) => console.log(responseObject.data))
    .catch((err) => console.log(err))
//---------------------------------------------------------------

//Axios request async/await -el
const axios = require("axios")

const getData = async (url) => {
    const res = await axios.get(url)
    const json = await res.data
    console.log(json)
}

const url = "https://jsonplaceholder.typicode.com/todos/1"
getData(url)
//-----------------------------------------------------------------

//Axios több request egyidejüleg-----------------------------------
const axios = require("axios");

const getData = async (url, id) => {
  console.log("Making request to id ", id);
  const res = await axios.get(url + id);
  const json = await res.data;
  console.log(json);
  return json;
};

const url = "https://jsonplaceholder.typicode.com/posts/";
const ids = [1, 2, 3, 4, 5, 6, 7];
axios
  .all(ids.map((id) => getData(url, id)))
  .then(
    (res) => console.log(res) // Array of all the json data
    //[ {userId:1} , {userId:2} , {userId:3}...........]
  )
  .catch((err) => console.log(err));
//--------------------------------------------------------------------

//Axios Paraméterek---------------------------------------------------
const getData = async (url) => {
  const res = await axios.get(url);
  const json = await res.data;
  console.log(json);
};
const url = "https://jsonplaceholder.typicode.com/posts?userId=1";
getData(url);

const getData = async (url,params) => {
  const res = await axios.get(url,{
    params: params
  });
  const json = await res.data;
  console.log(json);
};
const url = "https://jsonplaceholder.typicode.com/posts";
const params  = {
  userId: 1
}
getData(url,params);
//--------------------------------------------------------------------

//Axios POST request--------------------------------------------------
const postData = async (url, data) => {
  const res = await axios.post(url, {
    ...data,
  });
  const json = await res.data;
  console.log(json);
};

const url = "https://jsonplaceholder.typicode.com/posts";
const data = {
  title: "test Data",
  body: "this is a test post request",
  userId: 120,
};

postData(url, data);
//-----------------------------------------------------------------------

//Válasz Object--------------------------------------------------------
const getData = async (url) => {
  const res = await axios.get(url);
  const json = await res.data
  console.log(json); // The JSON data
  console.log(res.status) // 200
  console.log(res.statusText) // OK
  /**
   * The below provide more info about your request
   * such as url, request type, redirects, protocols etc
   */
  console.log(res.headers)
  console.log(res.config) 
  console.log(res.request) 
};
//-----------------------------------------------------------------------