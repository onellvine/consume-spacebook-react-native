import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../../constants/colors';

const Head = () => {
  return (
    <View style={styles.head}>
      <Text style={styles.title}>Spacebook Management</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    head: {
        backgroundColor: colors.themes.accent, 
        width: "100%", 
        paddingTop: 45
    },
    title: {
        fontSize: 23,
        fontWeight: "bold",
        color: colors.text.secondary,
        paddingLeft: 40,
        paddingBottom: 15,
    },
});

export default Head;