import base64 from 'base-64';
import React, { useState } from 'react';
import { View, Text, Button} from 'react-native';
import UserForm from './UserForm.jsx'



const LoginScreen = ({navigation}) => {

    
    const loginUser = (username, password) => {

        fetch('http://cs571.cs.wisc.edu:5000/login', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + base64.encode(username + ":" + password)
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.token) {
                    navigation.navigate('Profile', {
                        'username': username,
                        'password': password,
                        'token': String(res.token),
                    })
                } else {
                    alert("Username or Password Incorrect! Please try again.");
                }
            }).catch((error) => {
              console.error('Error:', error);
              alert(error.message);
          });
        

    }

    return (
        
        <UserForm
        buttonText="Log in"
        onSubmit={loginUser}
        >
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate('Signup')}
          />
        </UserForm>
      );
}

export default LoginScreen