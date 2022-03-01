import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';

import { FontAwesome5  } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

import PostsListHeader from '../../components/posts/PostsListHeader';
import Post from '../../components/posts/Post';
import colors from '../../constants/colors';
import Loading from '../../components/common/Loading';
import getAllPosts from '../../controllers/posts/posts.controller.getAllPosts';


/*
* This page will handle retrieval of all posts (API equivalent
* GET /user/{user_id}/post ) for a given user
*/

const AllPosts = ({navigation, route}) => {
  const isFocused = useIsFocused();
  let [user_id, setUser_id] = useState(route.params == undefined ? null : route.params.user_id);

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    // setLoading(true);
    if(user_id == null) {
      setUser_id(await SecureStore.getItemAsync('user_id'));
    }
    // if(isFocused) {
      await getAllPosts(user_id, setPosts);
    // }
    // setLoading(false);
  }, [isFocused]);

  if(!loading){

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
  );}
  else {
    return (< Loading />);
  }
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