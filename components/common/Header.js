import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import colors from '../../constants/colors';
import axiosInstance from '../../constants/axiosInstance';
import * as RootNavigation from '../common/RootNavigation';

const Header = () => { 

  const handleLogout = async () => {
    await axiosInstance
      .post("/logout")
      .then(async (response) => {
        await SecureStore.deleteItemAsync('token');
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        alert(error);
      })
    RootNavigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Spacebook Management</Text>
        <TouchableOpacity style={styles.icon} onPress={handleLogout}>
            <MaterialIcons  name="logout" size={24} color={colors.text.secondary} />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      width: '100%',
      backgroundColor: colors.themes.accent,
      marginTop: 14,
      paddingLeft: 8,
    },
    title: {
        fontSize: 23,
        fontWeight: "bold",
        color: colors.text.secondary,
    },
    icon: {
      marginTop: 2,
    }
})

export default Header;