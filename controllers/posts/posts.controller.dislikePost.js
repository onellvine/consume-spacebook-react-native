import axiosInstance from "../../constants/axiosInstance";

const dislikePost = async (user_id, post) => {
    await axiosInstance
        .delete(`/user/${user_id}/post/${post.post_id}/like`)
        .then(response => {
            console.log("remove like"+ response.data);
        })
        .catch(error => {
            if(error.response.status === 403) {
                alert("Forbidden - you have not liked this post");
            } else {
                alert(error);
            }
            console.log(error);        
        });
}

export default dislikePost;