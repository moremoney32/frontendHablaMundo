export function fetchDataGet(url){
    return new Promise((resolve, reject) => {
        const dataToSend = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
        }, 
        
        credentials: "include"
      };
  
        fetch(url,dataToSend).then((response)=>{
  
            return response.json()
  
        }).then((result)=>{
            return resolve(result)
        }).catch((error) => {
            reject({ message: error.message });
          });
    })
  }