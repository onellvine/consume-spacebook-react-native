import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loading}>
        <Image />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    loading: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    loadingText: {
        fontWeight: 'bold',
    }
});

export default Loading;