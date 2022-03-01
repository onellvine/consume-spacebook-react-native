import objects from '../../constants/objects';
import * as SecureStore from 'expo-secure-store';

const uploadPhoto = async (data, user) => {
    console.log('Attempting Profile Photo Upload');

    let res = await fetch(data.uri);
    let blob = await res.blob();
    var reader = new FileReader();

    reader.onload = async () => {
        console.log(reader.result);
        fetch(`${objects.API_URL}/user/${user.user_id}/photo`, {
            method: "POST",
            headers: {
                "Content-Type": "image/png",
                "X-Authorization": await SecureStore.getItemAsync("token")
            },
            body: blob
        })
        .then((response) => {
            alert("Picture added", response);
            // console.log("Picture added", response);
        })
        .catch((error) => {
            alert(error);
            // console.log(err);
        })
    }
    reader.readAsDataURL(blob);
}

export default uploadPhoto;