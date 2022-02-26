import React, { useState } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';

import Friend from '../../components/friends/Friend';
import colors from '../../constants/colors';

/*
* This screen will list all oustanding friend requests
* and allow the user to accept such requests
*/

const FriendRequests = ({navigation}) => {

  const [friends, setFriends] = useState([
    {
        "user_id": 8,
        "user_givenname": "Mayor",
        "user_familyname": "Luke",
        "user_email": "mayor.luke@mmu.ac.uk"
    },
    {
        "user_id": 9,
        "user_givenname": "James",
        "user_familyname": "Harden",
        "user_email": "mayor.luke@mmu.ac.uk"
    },
    {
        "user_id": 10,
        "user_givenname": "Gabe",
        "user_familyname": "Alexander",
        "user_email": "mayor.luke@mmu.ac.uk"
    },
    {
        "user_id": 11,
        "user_givenname": "Mitchell",
        "user_familyname": "Fiyori",
        "user_email": "mayor.luke@mmu.ac.uk"
    },
    {
        "user_id": 12,
        "user_givenname": "Control",
        "user_familyname": "Room",
        "user_email": "mayor.luke@mmu.ac.uk"
    },
  ]);

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