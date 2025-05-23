const API_BASE_URL = process.env.REACT_APP_HABLA;
export function fetchDataGetToken(endpoint,token){
    return new Promise((resolve, reject) => {
        const dataToSend = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}` 
        }, 
        
        credentials: "include"
      };
  
        fetch(`${API_BASE_URL}/${endpoint}`,dataToSend).then((response)=>{
  
            return response.json()
  
        }).then((result)=>{
            return resolve(result)
        }).catch((error) => {
            reject({ message: error.message });
          });
    })
  }