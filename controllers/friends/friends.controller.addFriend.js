import axiosInstance from '../../constants/axiosInstance';

const addFriend = async (user_id) => {
    await axiosInstance
        .post(`/user/${user_id}/friends`)
        .then(response => {
            alert("OK");
        })
        .catch(error => {
            if(error.response.status === 403) {
                alert("User is already added as a friend");
            }else{
                console.log(error);
                alert("Add Friend Error "+error);
            }
        });
}

export default addFriend;
