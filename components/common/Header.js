import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import colors from '../../constants';

const Header = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Spacebook Management API</Text>
        <Image style={styles.profilePicture} uri={} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: colors.themes.primary
    },
    title: {
        fontSize: 20,
        fontWeight: 900,
        fontColor: colors.text.primary
    }
})

export default Header;