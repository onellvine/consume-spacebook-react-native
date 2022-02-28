import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';

import { FontAwesome5  } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

import PostsListHeader from '../../components/posts/PostsListHeader';
import Post from '../../components/posts/Post';
import objects from '../../constants/objects'
import colors from '../../constants/colors';
import axiosInstance from '../../constants/axiosInstance';


/*
* This page will handle retrieval of all posts (API equivalent
* GET /user/{user_id}/post ) for a given user
*/

const AllPosts = ({navigation, route}) => {
  const isFocused = useIsFocused();
  let user_id = route.params.user_id;
  const [posts, setPosts] = useState(objects.posts);

  useEffect(async () => {
    if(user_id == null) {
      user_id = await SecureStore.getItemAsync('user_id');
    }
    if(isFocused) {
      if(user_id != 0) {
        await axiosInstance
            .get(`/user/${user_id}/post`)
            .then(response => {
              console.log(response.data);
              setPosts(response.data);
            })
            .catch(error => {
              if(error.response.status === 403){
                alert("Can only view the posts of yourself or your friends");
              }
              console.log(error);
            })
      }
    }

  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList 
          data={posts} 
          renderItem={({item}) => <Post item={item} navigation={navigation} status={'friends'} />}
          keyExtractor={(item) => item.post_id}
          ListHeaderComponent={
              <PostsListHeader 
                  navigation={navigation} 
                  title={"View Posts..."}
                  payload={{user_id: user_id}}
              />
          }
      />
      <TouchableOpacity 
        activeOpacity={0.5} 
        onPress={async () => { navigation.navigate('AllFriends', 
          {
            user_id: await SecureStore.getItemAsync('user_id'),
            friends: null
          }
        )}} 
        style={styles.TouchableOpacityStyle} 
      >
        <FontAwesome5 
          name="user-friends" 
          size={24} 
          color={colors.text.primary} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 10,
    backgroundColor: colors.themes.primary,
    borderRadius: 50 / 2,
  },

})

export default AllPosts