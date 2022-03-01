import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { FontAwesome5, Ionicons  } from '@expo/vector-icons';


import colors from '../../constants/colors';


const PostsListHeader = ({navigation, title, payload}) => {
    console.log(payload);
    const user_id = payload.user_id;
    return (
      <View>
          <View style={styles.titleAction}>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity 
                  style={styles.friendRequest} 
                  onPress={() => { navigation.navigate('Profile', 
                    {action: 'add', post: null, user_id: null})}}
              >
                  <Ionicons name="person-outline" size={32} color={colors.text.accent} />
              </TouchableOpacity>
              <TouchableOpacity 
                  style={styles.friendRequest} 
                  onPress={() => { navigation.navigate('AddPost', 
                    {action:'add', friendShip: null, user_id: user_id})}}
              >
                  <FontAwesome5 name="edit" size={32} color={colors.text.accent} />
              </TouchableOpacity>
          </View>
      </View>
    );
};


const styles = StyleSheet.create({
    titleAction: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0,
        margin: 0,
    },
    title: {
        fontSize: 35,
        color: colors.themes.primary,
        fontWeight: 'bold',
        marginHorizontal: 8,
    },
    friendRequest: {
        marginRight: 15,
    },
})

export default PostsListHeader;