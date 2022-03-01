import axiosInstance from "../../constants/axiosInstance";

const getUserProfile = async (user_id, setUser) => {
    await axiosInstance
        .get(`/user/${user_id}`)
        .then(response => {
            console.log(response.data);
            setUser(response.data);
        })
        .catch(error => {
            console.log(error);
            alert("Get User Error: "+error);
        });
}

export default getUserProfile;