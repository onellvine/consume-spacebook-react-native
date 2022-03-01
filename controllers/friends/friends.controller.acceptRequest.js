import axiosInstance from '../../constants/axiosInstance';

const acceptRequest = async (user_id, navigation) => {
    await axiosInstance
        .post(`/friendrequests/${user_id}`)
        .then(response => {
            console.log(response.data);
            navigation.navigate("AllFriends", {user_id: user_id});
        })
        .catch(error => {
            console.log(error);
            alert("Accept Friend Request Error: "+error);
        });
}

export default acceptRequest;