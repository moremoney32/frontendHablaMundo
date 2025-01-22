const API_BASE_URL = process.env.REACT_APP_HABLA;
export function fetchData(endpoint, data, token) {
  return new Promise((resolve, reject) => {
      const dataToSend = {
          method: 'POST',
          headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json',
                'Authorization': `Bearer ${token}`  
          },
          body: JSON.stringify(data),
          credentials: "include"
      };

      fetch(`${API_BASE_URL}/${endpoint}`, dataToSend).then((response)=>{
        console.log(`${API_BASE_URL}/${endpoint}`)
          return response.json();
      }).then((result) => {
          return resolve(result);
      }).catch((error) => {
          reject({message: error.message});
      });
  });
}
