import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import colors from '../../constants/colors';
import axiosInstance from '../../constants/axiosInstance';

const Friend = ({navigation, item, status}) => {
  // determine friendships to render the correct action
  const user_id = item.user_id;
  const friendShip = (status === 'friends');

  const handleAccept = async () => {
      await axiosInstance
        .post(`/friendrequests/${user_id}`)
        .then(response => {
            console.log(response.data);
            navigation.navigate("AllFriends", {user_id: user_id});
        })
        .catch(error => {
            console.log(error);
            alert("Accept Friend Request Error: "+error);
        })
  }

  return (
    <TouchableOpacity 
        style={styles.container} 
        onPress={() => { 
                navigation.navigate('Profile', {
                        friendShip: friendShip,
                        user_id: user_id
                    })
                }}
    >
        <View style={styles.bio}>
            <Image 
                source={require('../../assets/adaptive-icon.png')}
                style={styles.profilePhoto} 
            />
            <View style={styles.nameContainer}>
                <Text style={styles.name}>
                    {item.first_name || item.user_givenname}
                </Text>
                <Text> </Text>
                <Text style={styles.name}> 
                    {item.last_name || item.user_familyname}                
                </Text>
            </View>
        </View>
        <View style={styles.actions}>
            <TouchableOpacity
                    onPress={() => { 
                        navigation.navigate('AllPosts', {
                                user_id: item.user_id
                            })
                        }}
            >
                <Text style={styles.postsLink}>See Posts</Text>
            </TouchableOpacity>
            {!friendShip && 
                <View style={styles.requestResponse}>
                    <TouchableOpacity style={styles.friendsAction}>
                        <MaterialIcons 
                            name="dangerous" 
                            size={32} 
                            color={colors.text.secondary} 
                        />
                        <Text>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.friendsAction}
                        onPress={handleAccept}
                    >
                        <MaterialIcons 
                            name="check-circle" 
                            size={32} 
                            color={colors.text.secondary} 
                        />
                        <Text>Accept</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.text.primary,
        padding: 5,
        marginVertical: 2,
        marginHorizontal: 10,
    },
    bio: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 0,
    },
    profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        marginRight: 20,
    },
    nameContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    name: {
        fontSize: 20,
        color: colors.themes.primary,
    },
    actions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 0,
    },
    postsLink: {
        fontSize: 18,
        color: colors.text.accent,
    },
    requestResponse: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 5,
        padding: 0,       
    },
    friendsAction: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 0,
        width: 32,    
    }
});

export default Friend;
