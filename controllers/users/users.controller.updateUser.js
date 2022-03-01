import axiosInstance from "../../constants/axiosInstance";

const updateUser = async (values, user, navigation) => {
    const body = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
    };
    
    if (values.password !== "") {
        body.password = values.password;
    }
    await axiosInstance
        .patch(`/user/${user.user_id}`, JSON.stringify(body))
        .then(response => {
            console.log("response ", response.data);
            navigation.push('Profile', {user_id: null});
        })
        .catch(error => {
            console.log(error);
            alert("Update User Info Error "+error);
        });
}

export default updateUser;