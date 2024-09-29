import axios from "axios";
const url = import.meta.env.VITE_API_URL;


exports.insertUser =async (data:{rolId:number,firstName:string,lastName:string,email:string,password:string})=>{
    try {
        const result = await axios.post(`${url}/insertUser`, data);
        return result;
    } catch (error) {
        return error
    }
}

exports.loginUser =async (data:{email:string,password:string})=>{
  try {
    const result = await axios.post(`${url}/loginUser`, data);
    return result;
  } catch (error) {
    return error;
  }
}