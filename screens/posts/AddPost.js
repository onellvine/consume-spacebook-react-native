import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';

import { Formik } from 'formik';

import colors from '../../constants/colors';
import Buttonx from '../../components/common/Buttonx';
import PostsListHeader from '../../components/posts/PostsListHeader';
import axiosInstance from '../../constants/axiosInstance';

/*
* This page will handle addition of new posts (API equivalent POST
  /user/{user_id}/post  )
*/

const AddPost = ({navigation, route}) => {
  
  const action = route.params.action;
  const ppost = route.params.post;
  const user_id = route.params.user_id;
  return (
    <ScrollView  keyboardShouldPersistTaps={'handled'}>
        <PostsListHeader 
            navigation={navigation}
            title={"Add New Post"}
            payload={{user_id: user_id}}
        />
        <Formik
            enableReinitialize={true}
            initialValues={{ text: (ppost != null ? ppost.text : "") }}
            onSubmit={async (values) => {
                const post = JSON.stringify({
                    "text": values.text,
                });

                const endpoint = action === 'add' 
                    ? `/user/${user_id}/post`
                    : `/user/${user_id}/post/${ppost.post_id}`;

                if (action === 'add') {
                await axiosInstance
                    .post(endpoint, post)
                    .then(response => {
                        console.log("response ",response.data);
                        navigation.navigate('AllPosts', {user_id: user_id});
                    })
                    .catch(error => {
                        console.log(error);
                        alert("AddPost Error "+error);                        
                    })
                } else {
                    await axiosInstance
                    .patch(endpoint, post)
                    .then(response => {
                        console.log("response ",response.data);
                        navigation.navigate('AllPosts', {user_id: user_id});
                    })
                    .catch(error => {
                        console.log(error);
                        alert("AddPost Error "+error);
                    })
                }
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Input Post Text</Text>
                        <TextInput
                            multiline
                            numberOfLines={10}
                            style={styles.input}
                            onChangeText={handleChange('text')}
                            onBlur={handleBlur('text')}
                            value={values.text}
                            placeholder="sample post text"
                        />
                    </View>

                    <Buttonx 
                        onPress={handleSubmit} 
                        title={action === 'add' ? "Create Post" : "Update Post"} 
                        style={styles.btnSubmit} 
                    />
                </View>
            )}
        </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    formGroup: {
        margin: 10,
    },
    label: {
        fontSize: 20,
        color: colors.text.accent,
    },
    input: {
        marginHorizontal: 0,
        marginVertical: 10,
        borderBottomWidth: 1,
        padding: 0,
    },
    btnSubmit: {
        color: 'white', 
        textTransform: 'uppercase',
    },
});

export default AddPost;