import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';

import { Formik } from 'formik';

import colors from '../../constants/colors';
import Buttonx from '../../components/common/Buttonx';
import axiosInstance from '../../constants/axiosInstance';

const Home = ({navigation}) => {
  return (
    <ScrollView style={styles.containerFluid} keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Formik
            initialValues={{ first_name: '', last_name: '', email: '', password: '', password1: '' }}
            onSubmit={async (values, actions) => {
                const user = JSON.stringify({
                    "first_name": values.first_name,
                    "last_name": values.last_name,
                    "email": values.email,
                    "password": values.password
                });
                
                await axiosInstance
                    .post("/user", user)
                    .then(response => {
                        console.log(response);
                        navigation.navigate("Login");
                    })
                    .catch(error => {
                        console.log(error);
                        alert(error);
                    })

                actions.resetForm();
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>FirstName</Text>
                        <TextInput  
                            style={styles.textInput}                     
                            placeholder='Your first name' 
                            onChangeText={handleChange('first_name')} 
                            onBlur={handleBlur('first_name')}
                            value={values.first_name}
                            />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>LastName</Text>
                        <TextInput  
                            style={styles.textInput}                     
                            placeholder='Your last name' 
                            onChangeText={handleChange('last_name')}
                            onBlur={handleBlur('last_name')}
                            value={values.last_name} 
                            />
                    </View>
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
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            style={styles.textInput}  
                            placeholder='Repeat password' 
                            secureTextEntry
                            onChangeText={handleChange('password1')}
                            onBlur={handleBlur('password1')}
                            value={values.password1} 
                            
                            />
                    </View>
                    <Buttonx onPress={handleSubmit} title="Sign Up" style={styles.btnSignUp} />
                </View>
            )}
        </Formik>
        <Text 
            style={styles.info} 
            onPress={() => { navigation.navigate('Login')}}
            > login here </Text>
        </View>
    </ScrollView>
  )
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
    btnSignUp: {
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

export default Home;