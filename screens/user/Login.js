import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';

import { Formik } from 'formik';
import * as SecureStore from 'expo-secure-store';

import colors from '../../constants/colors';
import Buttonx from '../../components/common/Buttonx';
import axiosInstance from '../../constants/axiosInstance';

const Login = ({navigation}) => {
  return (
    <ScrollView style={styles.containerFluid} keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
        <Text style={styles.title}>Login to Account</Text>
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={async (values, actions) => {
                const user = JSON.stringify({
                    "email": values.email,
                    "password": values.password
                });

                await axiosInstance
                    .post("/login", user)
                    .then(async (response) => {
                        const token = response.data.token;
                        const user_id = response.data.id;
                        await SecureStore.setItemAsync('token', token);
                        await SecureStore.setItemAsync('user_id', user_id.toString());
                        axiosInstance.defaults.headers['X-Authorization'] = token;

                        // send user id to retrieve their posts by default
                        navigation.navigate('AllPosts', {user_id: user_id});
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'AllPosts' }],
                        });
                    })
                    .catch(error => {
                        if(error.response.status === 400) {
                            alert("invalid email/password supplied");
                        } else {
                            console.log(error);
                            alert("Login Error: "+error);
                        }
                    });
                
                actions.resetForm();
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.textInput}                       
                            placeholder='Your email address' 
                            onChangeText={handleChange('email')} 
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType='email-address'
                            />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput 
                            style={styles.textInput}  
                            placeholder='Choose password' 
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password} 
                            />
                    </View>
                    
                    <Buttonx onPress={handleSubmit} title="Sign In" style={styles.btnSubmit} />
                </View>
            )}
        </Formik>
        <Text 
            style={styles.info} 
            onPress={() => {navigation.navigate('Home')}}
        > 
            Create an account here 
        </Text>           
        </View>
        
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    containerFluid: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 35,
        color: colors.themes.primary,
        fontWeight: 'bold',
        marginHorizontal: 8,
    },
    formGroup: {
        margin: 10,
    },
    label: {
        fontSize: 20,
        color: colors.text.accent,
    },
    textInput: {
        borderBottomWidth: 1,
        padding: 0,
    },
    btnSubmit: {
        color: 'white', 
        textTransform: 'uppercase',
    },
    info: {
        fontSize: 15,
        color: colors.text.accent,
        textAlign: 'center',
        marginTop: 30,
    }
});

export default Login;