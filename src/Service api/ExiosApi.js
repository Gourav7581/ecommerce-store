import axios from "axios";
import { BASE_URL } from "./Baseurl";

export let api =  axios.create({
    baseURL : BASE_URL,
  headers:{
    'Content-Type':'application/json',
  },
});