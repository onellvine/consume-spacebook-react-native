import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';

import { useIsFocused } from "@react-navigation/native";

import Friend from '../../components/friends/Friend';
import colors from '../../constants/colors';
import Loading from '../../components/common/Loading';
import getAllFriendRequests from '../../controllers/friends/friends.controller.getFriendRequests';

/*
* This screen will list all oustanding friend requests
* and allow the user to accept such requests
*/

const FriendRequests = ({navigation, route}) => {
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);

  // procedure to get friends from API
  useEffect(async () => {
    setLoading(true);
    if(isFocused) {
      await getAllFriendRequests(setFriends);
    }
    setLoading(false);
  }, [isFocused]);  

  const ListHeader = () => {
    return (
      <View>
          <Text style={styles.title}>Oustanding Friend Requests</Text>
      </View>
    );
  }
  if(loading) {
    return (< Loading />);
  } else {
  return (
    <FlatList 
        data={friends} 
        renderItem={({item}) => <Friend item={item} navigation={navigation} status={'not-friends'} />}
        keyExtractor={(item) => item.user_id}
        ListHeaderComponent={ListHeader}
    /> 
  )}
}

const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        color: colors.themes.primary,
        fontWeight: 'bold',
        marginHorizontal: 8,
        marginBottom: 10,
    },
});

export default FriendRequests;