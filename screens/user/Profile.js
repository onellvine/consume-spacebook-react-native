import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    Image, 
    ScrollView, 
    TextInput, 
    Dimensions,
} from 'react-native';

import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

import colors from '../../constants/colors';
import Buttonx from '../../components/common/Buttonx';
import Action from '../../components/common/Action';

import getUserProfile from '../../controllers/users/users.controller.getUserProfile';
import getUserPhoto from '../../controllers/users/users.controller.getUserPhoto';
import uploadPhoto from '../../controllers/users/users.controller.uploadPhoto';
import addFriend from '../../controllers/friends/friends.controller.addFriend';
import updateUser from '../../controllers/users/users.controller.updateUser';

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
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
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
        // optionally check for gallery permissions
        if (hasGalleryPermission == null) {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        }
    }

    if(isFocused) {
        // get the user to display on the profile screen
        await getUserProfile(user_id, setUser);

        // get the photo of the user to profile display
        await getUserPhoto(user_id, setPhoto);
    }

  }, [isFocused]);
  
   const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        setPhoto(result.uri);
        uploadPhoto(result, user);
      }
   }

  return (
    <ScrollView contentContainerStyle={styles.containerFluid} keyboardShouldPersistTaps={'handled'}>
        <View style={styles.imageContainer}>
            {photo && <Image source={{ uri: photo }} style={styles.image} />}
            <Text style={[styles.friendsCount, {
                position: route.params.user_id != null ? 'relative' : 'absolute', 
                marginBottom: route.params.user_id != null ? 20 : 0,
                }]}>
                {user == null? 0: user.friend_count} Friends
            </Text>
            {relu && 
            <View style={styles.infoGroup}>
                <Action title="Choose Photo" 
                    onPress={pickImage}
                />
            </View>}
        </View>
        
        <Formik
            enableReinitialize={true}
            initialValues={{
                first_name: (user != null ? user.first_name : ''), 
                last_name: (user == null? 0: user.last_name), 
                email: (user != null ? user.email: ''), 
                password: '', 
                password1: '' 
            }}
            onSubmit={async (values) => {
                // determine an update when real user (relu) is set
                if(relu != null) {
                    updateUser(values, user, navigation);
                } // the button displayed is for adding friends
                else {
                    addFriend(user_id);
                }
                
            }}
        >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.userInfo}>
                
                <View style={styles.infoGroup}>
                    <Text style={styles.infoTitle}>First Name</Text>
                    <TextInput 
                        style={styles.infoValue}
                        onChangeText={handleChange('first_name')} 
                        onBlur={handleBlur('first_name')}
                        value={values.first_name}                                                   
                     />
                </View>
                <View style={styles.infoGroup}>
                    <Text style={styles.infoTitle}>Last Name</Text>
                    <TextInput 
                        style={styles.infoValue} 
                        onChangeText={handleChange('last_name')} 
                        onBlur={handleBlur('last_name')}
                        value={values.last_name}                        
                         />
                </View>
                {relu && 
                    <View>
                        <View style={styles.infoGroup}>
                            <Text style={styles.infoTitle}>Email</Text>
                            <TextInput 
                                style={styles.infoValue}
                                onChangeText={handleChange('email')} 
                                onBlur={handleBlur('email')}
                                value={values.email}                         
                                />
                        </View>
                        <View style={styles.infoGroup}>
                            <Text style={styles.infoTitle}>Password</Text>
                            <TextInput 
                                style={styles.infoValue} 
                                secureTextEntry
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password} 
                                />
                        </View>
                        <View style={styles.infoGroup}>
                            <Text style={styles.infoTitle}>Repeat Password</Text>
                            <TextInput
                                style={styles.infoValue}
                                secureTextEntry
                                onChangeText={handleChange('password1')}
                                onBlur={handleBlur('password1')}
                                value={values.password1}                                
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
        paddingLeft: 10,
        position: 'absolute',
        top: hasProfilePhoto ? (Dimensions.get('window').width / 2) - 10 : 10,
        color: hasProfilePhoto ?'#fff' : colors.themes.accent,
    },
    userInfo: {
        flex: 1,
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
        width: '50%',
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