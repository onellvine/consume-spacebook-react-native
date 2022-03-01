import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import { Foundation } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from "@react-navigation/native";

import colors from '../../constants/colors';
import PostsListHeader from '../../components/posts/PostsListHeader';

import deletePost from '../../controllers/posts/posts.controller.deletePost';
import dislikePost from '../../controllers/posts/posts.controller.dislikePost';

const SinglePost = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const post = route.params.post;
  const user_id = route.params.user_id;

  const [owner, setOwner] = useState();

  useEffect(async () => {
    if(isFocused) {
      if(user_id != 0) {
        await SecureStore
            .getItemAsync("user_id")
            .then(response => {
                console.log(response.data);
                setOwner(response);
            })
            .catch(error => {
                console.log(error);
            });
      }
    }

  }, [isFocused]);

  const handleDelete = async () => {
    if(user_id == null) {
      user_id = await SecureStore.getItemAsync('user_id');
    }
    deletePost(user_id, post, navigation);
  }

  const handleDislike = async () => {    
    dislikePost(user_id, post)
  }

  return (
    <ScrollView>
      <PostsListHeader
        navigation={navigation}
        title={"Viewing Post..."}
        payload={{user_id: user_id}}
      />
      <View style={styles.postContainer}>
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.friendsAction}
            onPress={handleDislike}
          >
              <Foundation 
                  name="dislike" 
                  size={32} 
                  color={colors.text.secondary} 
              />
              <Text style={styles.numLikes}>Dislike</Text>
          </TouchableOpacity>
          { owner === post.author.user_id.toString() &&
          
          <TouchableOpacity 
            style={styles.friendsAction}
            onPress={handleDelete}
          >
              <Foundation 
                  name="page-delete" 
                  size={32} 
                  color={colors.text.secondary} 
              />
              <Text style={styles.numLikes}>Delete</Text>
          </TouchableOpacity>}
          { owner === post.author.user_id.toString() &&
            <TouchableOpacity style={styles.friendsAction}
            onPress={() => {
              navigation.navigate('AddPost', {
                action: 'update',
                post: post,
                user_id: user_id
              })
            }}
          >
              <Foundation 
                  name="page-edit" 
                  size={32} 
                  color={colors.text.secondary} 
              />
              <Text style={styles.numLikes}>Update</Text>
          </TouchableOpacity>}

        </View>
        <Text style={styles.postText}>{post.text}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 10,
    margin: 5,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal:0,
  },
  friendsAction: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 1,  
},
  postText: {
    margin: 5,
    fontSize: 18,
  }
});

export default SinglePost;