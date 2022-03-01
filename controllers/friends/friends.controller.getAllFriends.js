import axiosInstance from '../../constants/axiosInstance';

const getAllFriends = async (user_id, passedFriends, setFriends) => {
    await axiosInstance
        .get(`/user/${user_id}/friends`)
        .then(response => {
            console.log(response.data);
            if(passedFriends == null) {
                setFriends(response.data);
            } else {
                setFriends(passedFriends);
            }
        })
        .catch(error => {
            console.log(error);
        })
}

export default getAllFriends;