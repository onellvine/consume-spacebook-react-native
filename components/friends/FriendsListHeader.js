import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';

import { MaterialIcons  } from '@expo/vector-icons';
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';

import Buttonx from '../common/Buttonx';
import colors from '../../constants/colors';
import axiosInstance from '../../constants/axiosInstance';

const FriendListHeader = ({navigation, user_id}) => {

    return (
      <View keyboardShouldPersistTaps={'handled'}>
          <View style={styles.titleAction}>
              <Text style={styles.title}>My Friends</Text>
              <TouchableOpacity 
                  style={styles.friendRequest} 
                  onPress={async () => {
                      navigation.navigate(
                          'FriendRequests', 
                          {
                              user_id: await SecureStore.getItemAsync('user_id')
                          }
                  )}}
              >
                  <MaterialIcons name="group-add" size={40} color={colors.text.accent} />
              </TouchableOpacity>
          </View>
          
          <Formik
              initialValues={{ search_in: 'friends', q: '' }}
              onSubmit={async(values) => {
                  const query = JSON.stringify({
                      q: values.q,
                      search_in: values.search_in,
                  })
                  console.log(query);
                  await axiosInstance
                    .get("/search", query)
                    .then(response => {
                        console.log("=====================\n"+JSON.stringify(response.data)+"\n=====================");
                        navigation.push('AllFriends', { 
                            user_id: user_id,
                            friends: response.data
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        alert("Search Friends Error: "+error);
                    })
              }}
          >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View style={styles.searchForm}>
                      <Text style={styles.text}>Search in</Text>
                      <Picker
                          selectedValue={values.search_in}
                          onValueChange={handleChange('search_in')}
                          style={styles.select}
                          mode={Platform.OS === 'android' ? 'dropdown' : null}
                      >
                          <Picker.Item label="My Friends" value="friends" />
                          <Picker.Item label="All Friends" value="all" />
                      </Picker>
                      <TextInput 
                          style={styles.textInput}
                          placeholder='Ash Williams'
                          onChangeText={handleChange('q')} 
                          onBlur={handleBlur('q')}
                          value={values.q}
                      />
                      <Buttonx onPress={handleSubmit} title="search" style={styles.btnSearch} />
                  </View>
              )}
          </Formik>
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
    info: {
        fontSize: 15,
        color: colors.text.accent,
        textAlign: 'center',
        margin: 10,
    },
    searchForm: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    textInput: {
        borderBottomWidth: 1,
        padding: 0,
        marginHorizontal: 1,
        width: 100,
    },
    select: {
        marginHorizontal: 2,
        width: 20,
    },
    btnSearch: { 
        fontSize: 11, 
        color: 'white', 
        textTransform: 'uppercase',
        paddingHorizontal: 10, 
    }
});

export default FriendListHeader;