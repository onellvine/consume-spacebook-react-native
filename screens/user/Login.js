import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';

import { Formik } from 'formik';

import colors from '../../constants/colors';
import Buttonx from '../../components/common/Buttonx';

const Login = ({navigation}) => {
  return (
    <ScrollView style={styles.containerFluid}>
        <View style={styles.container}>
        <Text style={styles.title}>Login to Account</Text>
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => console.log(values)}
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
            onPress={() => { navigation.navigate('Home')}}
            > Create an account here </Text>
        <Text 
            style={styles.info} 
            onPress={() => { navigation.navigate('Profile', {me: true, friendShip: true})}}
            > Profile </Text>
        <Text 
            style={styles.info} 
            onPress={() => { navigation.navigate('AllFriends')}}
            > Friends </Text>            
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