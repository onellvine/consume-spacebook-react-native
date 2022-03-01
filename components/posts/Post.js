import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Foundation } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import colors from '../../constants/colors';
import axiosInstance from '../../constants/axiosInstance';

import likePost from '../../controllers/posts/posts.controller.likePost';

const Post = ({navigation, item}) => {
  const user_id = item.author.user_id;
  const post_id = item.post_id;

  const [liked, setLiked] = useState(null);

  const handleLike = async () => {
      const liker_id = await SecureStore.getItemAsync('user_id')
      if(liker_id === user_id.toString()){
        alert("Can only like the posts of your friends");
        return;
      }      
      likePost(user_id, post_id, setLiked, navigation);
  }

  return (
    <TouchableOpacity 
        style={styles.container} 
        onPress={() => { 
                navigation.navigate('SinglePost', {
                        user_id: item.author.user_id,
                        post: item,
                    })
                }}
    >
        <View style={styles.post}>
                <Text>{item.text}</Text>
        </View>
        <View style={styles.insights}>            
            <Text>{new Date(item.timestamp).toDateString()}</Text>
            <View style={styles.actionResponse}>
                <TouchableOpacity 
                    style={styles.friendsAction}
                    onPress={handleLike}
                >
                    <Text style={styles.numLikes}>{item.numLikes}</Text>
                    <Foundation 
                        name="like" 
                        size={32} 
                        color={colors.text.secondary} 
                    />
                    
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.friendsAction}
                    onPress={() => { navigation.navigate('Profile', {
                            friendShip: undefined,
                            user_id: user_id
                            })
                        }}
                >
                    <Text style={styles.postsLink}>
                        By {item.author.last_name} {item.author.first_name}
                    </Text>
                </TouchableOpacity>
            </View>            
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.text.primary,
        padding: 5,
        marginVertical: 2,
        marginHorizontal: 10,
    },
    insights: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 0,
    },
    actionResponse: {
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
        padding: 1,  
    },
    numLikes: {
        fontSize: 18,
        margin: 4,
    }
});

export default Post;