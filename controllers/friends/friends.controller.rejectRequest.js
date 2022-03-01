import axiosInstance from '../../constants/axiosInstance';

const rejectRequest = async (user_id, navigation) => {
    await axiosInstance
        .post(`/friendrequests/${user_id}`)
        .delete(response => {
            console.log(response.data);
            navigation.navigate("AllFriends", {user_id: user_id});
        })
        .catch(error => {
            console.log(error);
            alert("Reject Friend Request Error: "+error);
        });
}
    
export default rejectRequest;