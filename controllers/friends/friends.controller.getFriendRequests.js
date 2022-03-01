import axiosInstance from '../../constants/axiosInstance';

const getAllFriendRequests = async (setFriends) => {
    await axiosInstance
        .get("/friendrequests")
        .then(response => {
            console.log(response.data);
            setFriends(response.data);
        })
        .catch(error => {
            console.log(error);
            alert("FriendRqeuests Error: "+error);
        });
}

export default getAllFriendRequests;