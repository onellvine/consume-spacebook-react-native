
import axiosInstance from "../../constants/axiosInstance";


const addPost = async (endpoint, post, navigation, user_id) => {
    await axiosInstance
        .post(endpoint, post)
        .then(response => {
            console.log("response ",response.data);
            navigation.navigate('AllPosts', {user_id: user_id});
        })
        .catch(error => {
            console.log(error);
            alert("AddPost Error "+error);                        
        });
}

export default addPost;