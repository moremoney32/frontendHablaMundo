export function fetchData(url,data){
    return new Promise((resolve, reject) => {
        const dataToSend = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        }, 
        
        body: JSON.stringify(data),
          credentials:"include"
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