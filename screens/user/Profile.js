import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TextInput, Dimensions } from 'react-native';

import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';

import colors from '../../constants/colors';
import Buttonx from '../../components/common/Buttonx';
import Action from '../../components/common/Action';

/* 
* This screen will show a users profile (API equivalent is /user/{user_id})
* for "Get user information". It will also include the a user photo, The 
* user may update their infomation here (API equivalent PATCH /user/{user_id})
* A User may also view the profile of friends, excluding (email and password)
* and choose to add them as a new friend (API equivalent POST /user/{user_id}/friends)
*/ 

let hasProfilePhoto = false;

const Profile = ({navigation, route, status}) => {
  // state to set selected photo in the Image Component
  const [photo, setPhoto] = useState(null);
  
  // determine friendship to render the correct action
  const {me} = route.params;
  const {friendShip} = route.params;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
        setPhoto(result.uri);
        hasProfilePhoto = true;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.containerFluid}>
      <View style={styles.imageContainer}>
        {photo && <Image source={{ uri: photo }} style={styles.image} />}
        <Text style={styles.friendsCount}>{24} Friends</Text>
        <View style={styles.infoGroup}>
            <Action title="Choose Photo" onPress={pickImage}/>
        </View>
      </View>
      <Formik
            initialValues={{ first_name: '', last_name: '', email: '', password: '', password1: '' }}
            onSubmit={values => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.userInfo}>
                <View style={styles.infoGroup}>
                    <Text style={styles.infoTitle}>First Name</Text>
                    <TextInput 
                        style={styles.infoValue} 
                        placeholder='Ashley'
                        onChangeText={handleChange('first_name')} 
                        onBlur={handleBlur('first_name')}
                        value={values.first_name}                                                   
                     />
                </View>
                <View style={styles.infoGroup}>
                    <Text style={styles.infoTitle}>Last Name</Text>
                    <TextInput 
                        style={styles.infoValue} 
                        placeholder='Williams'
                        onChangeText={handleChange('last_name')} 
                        onBlur={handleBlur('last_name')}
                        value={values.last_name}                        
                         />
                </View>
                {me && 
                    <View>
                        <View style={styles.infoGroup}>
                            <Text style={styles.infoTitle}>Email</Text>
                            <TextInput 
                                style={styles.infoValue} 
                                placeholder='ashley.williams@mmu.ac.uk'
                                onChangeText={handleChange('email')} 
                                onBlur={handleBlur('email')}
                                value={values.email}                         
                                />
                        </View>
                        <View style={styles.infoGroup}>
                            <Text style={styles.infoTitle}>Password</Text>
                            <TextInput 
                                style={styles.infoValue} 
                                placeholder='********'
                                onChangeText={handleChange('password')} 
                                onBlur={handleBlur('password')}
                                value={values.password}                         
                                />
                        </View>
                        
                        <View style={styles.infoGroup}>
                            <Text style={styles.infoTitle}>Repeat Password</Text>
                            <TextInput 
                                style={styles.infoValue} 
                                placeholder='********'
                                onChangeText={handleChange('password2')} 
                                onBlur={handleBlur('password2')}
                                value={values.password2}                         
                                />
                        </View>
                        
                        <Buttonx 
                            style={styles.btnProfile} 
                            onPress={handleSubmit} 
                            title="update my info" />
                    </View>
                }
                {!friendShip &&
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
    userInfo: {
        padding: 10,
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
        fontSize: 18,
        color: colors.text.accent
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