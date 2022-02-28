import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';

import { useIsFocused } from "@react-navigation/native";

import FriendListHeader from '../../components/friends/FriendsListHeader';
import Friend from '../../components/friends/Friend';
import objects from '../../constants/objects';
import axiosInstance from '../../constants/axiosInstance';

/*
* This screen will list all friends of the user
*/

const AllFriends = ({navigation, route}) => {
  const isFocused = useIsFocused();
  let user_id = route.params.user_id > 0 ? route.params.user_id : 0;
  const passedFriends = route.params.friends;
  console.log("passed\n"+JSON.stringify(passedFriends));
  const [friends, setFriends] = useState(objects.friends);
  
  // procedure to get friends from API
  useEffect(async () => {
    if(isFocused) {
      if(user_id != 0) {
        await axiosInstance
            .get(`/user/${user_id}/friends`)
            .then(response => {
              console.log(response.data);
              if(passedFriends == null) {
                setFriends(response.data);
              } else {
                setFriends(passedFriends);
              }
            })
            .catch(error => {
              console.log(error);
            })
      } 
    }

  }, [isFocused]);


  return (
      <FlatList 
        data={friends} 
        renderItem={({item}) => <Friend item={item} navigation={navigation} status={'friends'} />}
        keyExtractor={(item) => item.user_id}
        ListHeaderComponent={<FriendListHeader navigation={navigation} user_id={user_id}/>}
      /> 
  );
}



export default AllFriends;