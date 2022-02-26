import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import colors from '../../constants/colors';

const Friend = ({item, navigation, status}) => {
  // determine friendships to render the correct action
  const friendShip = (status === 'friends');

  return (
    <TouchableOpacity 
        style={styles.container} 
        onPress={() => { 
                navigation.navigate('Profile', {
                        friendShip: friendShip
                    })
                }}
    >
        <View style={styles.bio}>
            <Image 
                source={require('../../assets/adaptive-icon.png')}
                style={styles.profilePhoto} 
            />
            <Text style={styles.name}>{item.user_givenname + ' ' + item.user_familyname}</Text>
        </View>
        <View style={styles.actions}>
            <Text style={styles.postsLink}>See Posts</Text>
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
                    <TouchableOpacity style={styles.friendsAction}>
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
