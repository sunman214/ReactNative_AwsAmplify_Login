import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView,Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';
import {Auth} from 'aws-amplify'

const ConfirmEmailScreen = () => {
  const route = useRoute();
  const {control, handleSubmit} = useForm({defaultValue: {username: route?.params?.username}});
//console.log('route',route)
  const navigation = useNavigation();

  const onConfirmPressed = async (data) => {
    console.log('data',data)
    try {
      const response = await Auth.confirmSignUp(route.params.username, data.code)
      navigation.navigate('SignIn');
    } catch (e) {
      Alert.alert(e.message);
    }
    //console.warn(data);
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onResendPress = async (data) => {
    try {
      const response = await Auth.resendSignUp(route.params.username)
      console.warn(response);
      navigation.navigate('SignIn');
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>
        <CustomInput
          name='username'
          control={control}
          placeholder={route.params.username}
          rules={{
            required: 'Confirmation code is required'
          }}
        />

        <CustomInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required'
          }}
        />

        <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10
  },
  text: {
    color: 'gray',
    marginVertical: 10
  },
  link: {
    color: '#FDB075'
  }
});

export default ConfirmEmailScreen;
