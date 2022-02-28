import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '../components/common/RootNavigation';

import Head from '../components/common/Head';
import Header from '../components/common/Header'
import Home from './user/Home';
import Login from './user/Login';
import Profile from './user/Profile';
import AllFriends from './friends/AllFriends';
import FriendRequests from './friends/FriendRequests';
import AllPosts from './posts/AllPosts';
import SinglePost from './posts/SinglePost';
import AddPost from './posts/AddPost';
import colors from '../constants/colors';

const stack = createStackNavigator();

const AllScreens = () => {

    return (
        <NavigationContainer ref={navigationRef}>
            <stack.Navigator 
                initialRouteName="Home"
                
                screenOptions= {{
                    headerTitle: () =><Header />,
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
                <stack.Screen 
                    options={({route}) => ({
                        header: () => (<Head />)})}
                         name="Content"
                         component={Home}
                />
                <stack.Screen 
                    options={({route}) => ({
                        header: () => (<Head />)})}
                            name="Login"
                            component={Login}
                />
                <stack.Screen name="Profile" component={Profile} />
                <stack.Screen name="AllFriends" component={AllFriends} />
                <stack.Screen name="FriendRequests" component={FriendRequests} />
                <stack.Screen name="AllPosts" component={AllPosts} />
                <stack.Screen name="SinglePost" component={SinglePost} />
                <stack.Screen name="AddPost" component={AddPost} />
            </stack.Navigator>
        </NavigationContainer>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});

export default AllScreens;