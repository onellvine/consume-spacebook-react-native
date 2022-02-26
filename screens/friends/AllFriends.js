import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';

import { FontAwesome5  } from '@expo/vector-icons';
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker';

import Friend from '../../components/friends/Friend';
import Buttonx from '../../components/common/Buttonx';
import colors from '../../constants/colors';


/*
* This screen will list all friends of the user
*/

const AllFriends = ({navigation}) => {

  // procedure to get friends from server
  const [friends, setFriends] = useState(
    [
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

    ]
  );

  const ListHeader = () => {
      return (
        <View>
            <View style={styles.titleAction}>
                <Text style={styles.title}>My Friends</Text>
                <TouchableOpacity 
                    style={styles.friendRequest} 
                    onPress={() => { navigation.navigate('FriendRequests')}}
                >
                    <FontAwesome5 name="user-friends" size={32} color={colors.text.accent} />
                </TouchableOpacity>
            </View>
            
            <Formik
                initialValues={{ search_in: 'friends', q: '' }}
                onSubmit={values => console.log(values)}
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

  return (
      <FlatList 
        data={friends} 
        renderItem={({item}) => <Friend item={item} navigation={navigation} status={'friends'} />}
        keyExtractor={(item) => item.user_id}
        ListHeaderComponent={ListHeader}
      /> 
  );
}

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

export default AllFriends;