import objects from '../../constants/objects';
import * as SecureStore from 'expo-secure-store';

const getUserPhoto = async (user_id, setPhoto) => {
    fetch(`${objects.API_URL}/user/${user_id}/photo`, {
        method: 'GET',
        headers: {
        'X-Authorization': await SecureStore.getItemAsync("token")
        }
    })
    .then((res) => {
        return res.blob();
    })
    .then((resBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(resBlob); 
        reader.onload = () => {
            setPhoto(reader.result);
        }
    })
    .catch((err) => {
        console.log("error", err)
    });
}

export default getUserPhoto;