import axios from "axios";


export const api = axios.create({
    baseURL: 'https://api-evoluir.bugaapps.com/api/',
    timeout: 100000,
    headers: {'X-Custom-Header': 'foobar'}
  });