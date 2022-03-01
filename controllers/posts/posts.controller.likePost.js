import axiosInstance from "../../constants/axiosInstance";

const likePost = async (user_id, post_id, setLiked, navigation) => {
    await axiosInstance
        .post(`/user/${user_id}/post/${post_id}/like`)
        .then(response => {
            console.log(response.data);
            setLiked(response.status);
            navigation.push("AllPosts", {user_id: user_id});
        })
        .catch(error => {
            if(error.response.status === 403) {
                alert("Forbidden - You have already liked this post");
            }
            console.log(error);  
        });
}

export default likePost;