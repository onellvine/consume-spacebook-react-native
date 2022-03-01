import axiosInstance from '../../constants/axiosInstance';

const getAllPosts = async (user_id, setPosts) => {
    await axiosInstance
        .get(`/user/${user_id}/post`)
        .then(response => {
            console.log(response.data);
            setPosts(response.data);
        })
        .catch(error => {
            if(error.response.status === 403){
            alert("Can only view the posts of yourself or your friends");
            }
            console.log(error);
        })
}

export default getAllPosts;