import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';

import { useIsFocused } from "@react-navigation/native";

import Friend from '../../components/friends/Friend';
import colors from '../../constants/colors';
import objects from '../../constants/objects';
import axiosInstance from '../../constants/axiosInstance';

/*
* This screen will list all oustanding friend requests
* and allow the user to accept such requests
*/

const FriendRequests = ({navigation, route}) => {
  const isFocused = useIsFocused();
  let user_id = route.params.user_id > 0 ? route.params.user_id : 0;
  const [friends, setFriends] = useState(objects.friends);

  // procedure to get friends from API
  useEffect(async () => {
    if(isFocused) {
      if(user_id != 0) {
        await axiosInstance
            .get("/friendrequests")
            .then(response => {
                console.log(response.data);
                setFriends(response.data);
            })
            .catch(error => {
                console.log(error);
                alert("FriendRqeuests Error: "+error);
            });
      }
    }

  }, [isFocused]);  

  const ListHeader = () => {
    return (
      <View>
          <Text style={styles.title}>Oustanding Friend Requests</Text>
      </View>
    );
  }

  return (
    <FlatList 
        data={friends} 
        renderItem={({item}) => <Friend item={item} navigation={navigation} status={'not-friends'} />}
        keyExtractor={(item) => item.user_id}
        ListHeaderComponent={ListHeader}
    /> 
  )
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