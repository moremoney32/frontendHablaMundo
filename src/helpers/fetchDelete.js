const API_BASE_URL = process.env.REACT_APP_HABLA;
export function fetchDelete(endpoint, dataToSend,token) {
    return new Promise((resolve, reject) => {
        fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                 'Accept': 'application/json',
                 'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de l\'élément');
            }
            return response.json();
        })
        .then(result => {
            resolve(result);
        })
        .catch(error => {
            reject({ message: error.message });
        });
    });
}