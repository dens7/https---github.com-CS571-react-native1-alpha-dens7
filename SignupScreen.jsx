import base64 from 'base-64';
import React from 'react';
import { View, Text, Button } from 'react-native';
import UserForm from './UserForm.jsx'


const SignupScreen = ({navigation}) => {

    var status = '';
    
    const createAccount = (username, password) => {

        
        const data = { 'username': String(username), 'password': String(password)};

        fetch('http://cs571.cs.wisc.edu:5000/users', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            status = response.status;
            return response.json()
        })
        .then(json => {
          alert(JSON.stringify(json)); 
  
          if (status == 200) {
            navigation.navigate('Login');
          } 
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error: ', error.message);
        });
        

    }

    return (   
        <UserForm
        buttonText="Create Account"
        onSubmit={createAccount}
        >
          
          <Button
            title="Nevermind" 
            onPress={() => navigation.navigate('Login')}
          />
        </UserForm>
      );
}


export default SignupScreen