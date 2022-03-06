import axios from "axios"
export function setTokenHeader(token){
  if(token){
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }
  else {
    delete axios.defaults.headers.common["Autorization"]
  }
}

export const apiCall = async(method,path,raw_data) => {
    try {
      
      return await axios[method](path,raw_data).then(data=>data.data)

    } catch (err) {

       return err.response.data.error
    }
  
}