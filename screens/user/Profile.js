import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    Image, 
    ScrollView, 
    TextInput, 
    Dimensions, 
    Platform
} from 'react-native';

import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import objects from '../../constants/objects';
import colors from '../../constants/colors';
import Buttonx from '../../components/common/Buttonx';
import Action from '../../components/common/Action';
import axiosInstance from '../../constants/axiosInstance';

/* 
* This screen will show a users profile (API equivalent is /user/{user_id})
* for "Get user information". It will also include the a user photo, The 
* user may update their infomation here (API equivalent PATCH /user/{user_id})
* A User may also view the profile of friends, excluding (email and password)
* and choose to add them as a new friend (API equivalent POST /user/{user_id}/friends)
*/ 

let hasProfilePhoto = false;

const Profile = ({navigation, route, status}) => {
  const isFocused = useIsFocused();
  // state to set selected photo in the Image Component
  const [photo, setPhoto] = useState(null);
  
  // determine friendship to render the correct action
  let user_id = route.params.user_id;
  const friendShip = route.params.friendShip;
  const [user, setUser] = useState(null);
  const [relu, setRelu] = useState(null);

  useEffect(async () => {
    if(user_id == null) {
        user_id = await SecureStore.getItemAsync('user_id');
        setRelu(true);
    }
    if(isFocused) {
      if(user_id != 0) {
        // ge the user to display on the profile screen
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

        // get the photo of the user to profile display
        await axios
            .get(`${objects.API_URL}/user/${user_id}/photo`, {
                responseType: 'arraybuffer',
                headers: {
                    'X-Authorization': await SecureStore.getItemAsync("token"),
                    'Content-Type': 'image/png'
                }
            })
            .then(response => {
                console.log(response.data);
                setPhoto(response.data);
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
      }
    }

  }, [isFocused]);

  const _pickImage = async (setFieldValue, field) => {

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
    })

    if (!result.cancelled) {
        setFieldValue(field, result.uri)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.containerFluid} keyboardShouldPersistTaps={'handled'}>
      <Formik
            initialValues={{ 
                photo: photo != null ? photo : null,
                first_name: '', 
                last_name: '', 
                email: '', 
                password: '', 
                password1: '' 
            }}
            onSubmit={async (values) => {
                if (photo) {
                    const splits = values.photo.split('.')
                    const imageType = splits[splits.length - 1]
                    const photoData = {
                        uri: values.photo,
                        type: `image/${imageType}`,
                        name: `profile.${imageType}`
                    };

                    const data = new FormData();
                    data.append('profile_photo', photoData);
                    console.log("Data: ", data);

                    await axios
                        .post(`${objects.API_URL}/user/${user.user_id}/photo`, data, {
                            headers: {
                                'X-Authorization': await SecureStore.getItemAsync("token"),
                                'Content-Type': 'image/png',
                                'Accept': 'application/json',
                            }
                        })
                        .then(response => {
                            console.log(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                            alert(error);
                        });
                    
                }
            }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
            <View style={styles.userInfo}>
                <View style={styles.imageContainer}>
                    {values.photo && <Image source={{ uri: values.photo }} style={styles.image} />}
                    <Text style={[styles.friendsCount, {
                        position: route.params.user_id != null ? 'relative' : 'absolute', 
                        marginBottom: route.params.user_id != null ? 20 : 0,
                        }]}>
                        {user == null? 0: user.friend_count} Friends
                    </Text>
                    {relu && 
                    <View style={styles.infoGroup}>
                        <Action title="Choose Photo" 
                            onPress={() => {_pickImage(setFieldValue, 'photo')}}
                        />
                    </View>}
                </View>
                <View style={styles.infoGroup}>
                    <Text style={styles.infoTitle}>First Name</Text>
                    <TextInput 
                        style={styles.infoValue}
                        onChangeText={handleChange('first_name')} 
                        onBlur={handleBlur('first_name')}
                        value={(user != null? user.first_name: '')}                                                   
                     />
                </View>
                <View style={styles.infoGroup}>
                    <Text style={styles.infoTitle}>Last Name</Text>
                    <TextInput 
                        style={styles.infoValue} 
                        onChangeText={handleChange('last_name')} 
                        onBlur={handleBlur('last_name')}
                        value={(user != null? user.last_name: '')}                        
                         />
                </View>
                {relu && 
                    <View>
                        <View style={styles.infoGroup}>
                            <Text style={styles.infoTitle}>Email</Text>
                            <TextInput 
                                style={styles.infoValue} 
                                placeholder='ashley.williams@mmu.ac.uk'
                                onChangeText={handleChange('email')} 
                                onBlur={handleBlur('email')}
                                value={(user != null? user.email: '')}                         
                                />
                        </View>                        
                        <Buttonx 
                            style={styles.btnProfile} 
                            onPress={handleSubmit} 
                            title="update my info" />
                    </View>
                }
                {!relu &&
                    <Buttonx style={styles.btnProfile} onPress={handleSubmit} title="Add Friend" />
                }
            </View>
        )}
      </Formik>
      <Text 
            style={styles.info} 
            onPress={() => { navigation.navigate('Home')}}
            > Exit </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    containerFluid: {
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'transparent'
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 0.55,
        resizeMode: 'cover', 
    },
    friendsCount: {
        textAlign: 'left',
        fontSize: 18,
        width: Dimensions.get('window').width,
        paddingLeft: 18,
        position: 'absolute',
        top: hasProfilePhoto ? (Dimensions.get('window').width / 2) - 10 : 10,
        color: hasProfilePhoto ?'#fff' : colors.themes.accent,
    },

    infoGroup: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: colors.themes.accent,
        marginBottom: 20,
        paddingBottom: 10,
        marginHorizontal: 10
    },
    infoTitle: {
        fontSize: 20,
        color: colors.text.accent,
    },
    infoValue: {
        fontSize: 20,
        color: colors.text.accent,
        marginHorizontal: 0,
        padding: 0,
        width: 100,
    },
    info: {
        fontSize: 15,
        color: colors.text.accent,
        textAlign: 'center',
        marginTop: 20,
    },
    btnProfile: {
        color: 'white', 
        textTransform: 'uppercase',
    }
})

export default Profile;