import axios from "axios";
const url = "http://localhost:3000";


export const insertUser =async (data:{rolId:number,firstName:string,lastName:string,email:string,password:string})=>{
    try {
        const result = await axios.post(`${url}/insertUser`, data);
        return result;
    } catch (error) {
        return error
    }
}

export const loginUser =async (data:{email:string,password:string})=>{
  try {
    const result = await axios.post(`${url}/loginUser`, data);
    return result;
  } catch (error) {
    return error;
  }
}