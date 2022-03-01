import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import { useIsFocused } from "@react-navigation/native";

import FriendListHeader from '../../components/friends/FriendsListHeader';
import Friend from '../../components/friends/Friend';
import Loading from '../../components/common/Loading'
import getAllFriends from '../../controllers/friends/friends.controller.getAllFriends';
/*
* This screen will list all friends of the user
*/

const AllFriends = ({navigation, route}) => {
  const isFocused = useIsFocused();
  let user_id = route.params.user_id > 0 ? route.params.user_id : 0;
  const passedFriends = route.params.friends;
  
  const [friends, setFriends] = useState([]);
  
  // procedure to get friends from API
  useEffect(async () => {
      await getAllFriends(user_id, passedFriends, setFriends);
  }, [isFocused]);

  return (
      <FlatList 
        data={friends} 
        renderItem={({item}) => <Friend item={item} navigation={navigation} status={'friends'} />}
        keyExtractor={(item) => item.user_id}
        ListHeaderComponent={<FriendListHeader navigation={navigation} user_id={user_id}/>}
      /> 
  )
  
}



export default AllFriends;