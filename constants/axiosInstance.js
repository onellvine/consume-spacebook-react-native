import axios from 'axios';

import objects from './objects';

const baseURL = objects.API_URL;

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: null,
		accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export default axiosInstance;

/*



import objects from '../../constants/objects'

const createUser = async (user) => {
    let response;
    console.log(objects.API_URL+"/user");
    console.log(JSON.stringify(user));
    try{
        response = await fetch(
            objects.API_URL+"/user",
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }
            
        ).then((response) => {
            console.log('response ', JSON.stringify(response));
        })

    } catch(error){
        console.log(error)
    }
}

                    await axios
                        .post(`${objects.API_URL}/user/${user.user_id}/photo`, data, {
                            headers: {
                                'X-Authorization': await SecureStore.getItemAsync("token"),
                                'Content-Type': 'image/png',
                                'Accept': 'application/json',
                            }
                        })
                        .then(response => {
                            console.log(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                            alert(error);
                        });

export default createUser;
*/