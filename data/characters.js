//import axios, md5
import axios, { all } from "axios"
import md5 from 'blueimp-md5' //you will need to install this module;
import * as helpers from '../helpers.js'

export async function searchCharacterByName (name){
  //check if name is string and not empty
  name = helpers.checkstringtrim(name)

  //Define url
  const publickey = '1bcef14699f7dd2328737b16b239cd97';
  const privatekey = '7b29c11e5c41324c21cfdf89ec51b46e3f392d6b';
  const ts = new Date().getTime();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
  const url = baseUrl + '?nameStartsWith=' + name +'&limit=15' + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
  //console.log(url)


  //Function to search the api and return up to 15 characters matching the name param

  try {
  const CharData = await axios.get(url) 
  const results =  CharData.data.data.results
  //console.log(results.length)
  return results
    
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw 'URL not found'
  }else{
    throw error
  }
  }
  

};

export async function searchCharacterById (id) {
  //Define url
  const publickey = '1bcef14699f7dd2328737b16b239cd97';
  const privatekey = '7b29c11e5c41324c21cfdf89ec51b46e3f392d6b';
  const ts = new Date().getTime();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
  const url = baseUrl + '/' + id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
  console.log(url)


  try {
  //Function to fetch a character from the api matching the id
  const CharDataID = await axios.get(url)
  const results =  CharDataID.data.data.results
  //console.log(results)
  return results
    
  } catch (error) {
    throw error
    
  }

  

};

