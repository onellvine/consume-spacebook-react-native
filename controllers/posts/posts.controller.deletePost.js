import axiosInstance from "../../constants/axiosInstance";

const deletePost = async (user_id, post, navigation) => {
    await axiosInstance
        .delete(`/user/${user_id}/post/${post.post_id}`)
        .then(response => {
            console.log(response);
            navigation.navigate('AllPosts', {user_id: user_id});
        })
        .catch(error => {
            console.log(error);
            alert("Delete Post Error "+error);
        });
}

export default deletePost;