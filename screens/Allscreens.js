import React from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './user/Home';
import Login from './user/Login';
import Profile from './user/Profile';
import AllFriends from './friends/AllFriends';
import FriendRequests from './friends/FriendRequests';
import colors from '../constants/colors';

const stack = createStackNavigator();

const AllScreens = () => {

    return (
        <NavigationContainer>
            <stack.Navigator 
                initialRouteName="Home"
                screenOptions= {{
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: colors.themes.accent
                    },
                    headerTitleStyle :{
                        fontWeight: 'bold',
                    },
                    headerTintColor: '#fff',
                    }}
                >
                <stack.Screen name="Home" component={Home} />
                <stack.Screen name="Login" component={Login} />
                <stack.Screen name="Profile" component={Profile} />
                <stack.Screen name="AllFriends" component={AllFriends} />
                <stack.Screen name="FriendRequests" component={FriendRequests} />
                {/* <stack.Screen name="Posts" component={Posts} /> */}
            </stack.Navigator>
        </NavigationContainer>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    }
});

export default AllScreens;