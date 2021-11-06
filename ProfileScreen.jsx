import React, { useState, useEffect } from 'react';
import base64 from 'base-64';
import { StyleSheet, ScrollView, TextInput, Button, Text, TouchableNativeFeedbackComponent } from 'react-native';
import { onChange } from 'react-native-reanimated';


const ProfileScreen = ({route, navigation}) => {

    var status = '';

    const { username, password, token} = route.params;
    const [firstName, onChangeFirstName] = useState('');
    const [lastName, onChangeLastName] = useState('');
    const [goalDailyCalories, onChangeCalories] =  useState(0.0);
    const [goalDailyCarbs, onChangeCarbs] =  useState(0.0);
    const [goalDailyProtein, onChangeProtein] =  useState(0.0);
    const [goalDailyFat, onChangeFat] =  useState(0.0);
    const [goalDailyActivity, onChangeActivity] =  useState(0.0);
    
    const getProfile = () => {

        fetch(`http://cs571.cs.wisc.edu:5000/users/${username}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + base64.encode(username + ":" + password),
                'x-access-token': token, 
            }
        })
            .then(response => {
                status = response.status;
                return response.json()}
            )
            .then(res => {
              
                if (status == 200) {
                    onChangeFirstName(res.firstName);
                    onChangeLastName(res.lastName);
                    onChangeCalories(res.goalDailyCalories);
                    onChangeCarbs(res.goalDailyCarbohydrates);
                    onChangeProtein(res.goalDailyProtein);
                    onChangeFat(res.goalDailyFat);
                    onChangeActivity(res.goalDailyActivity);
                } 
            }).catch((error) => {
              alert(error.message);
          });
    }
    
    
    
    const saveProfile = () => {

        const data = { 'username': username, 
                       'password': password, 
                       'firstName': firstName,                
                       'lastName': lastName,                 // Optional
                       'goalDailyCalories':goalDailyCalories,      // Optional
                       'goalDailyProtein': goalDailyProtein,       // Optional
                       'goalDailyCarbohydrates': goalDailyCarbs, // Optional
                       'goalDailyFat': goalDailyFat,           // Optional
                       'goalDailyActivity':goalDailyActivity,       // Optional
                    };


        console.log('inside SaveProfile', data);
        fetch(`http://cs571.cs.wisc.edu:5000/users/${username}`, {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token, 
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            alert(data['message']);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        

    }

    useEffect( () => {
        getProfile();
     }, []);
    
    
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
          

            <Text>First Name</Text>
            <TextInput
            style={styles.input}
            onChangeText={(firstName) => onChangeFirstName(firstName)}
            value={String(firstName)}
            />

            
            <Text>Last Name</Text>
            <TextInput
            style={styles.input}
            onChangeText={(lastName) => onChangeLastName(lastName)}
            value={String(lastName)}
            />

            <Text>Daily Calories</Text>
            <TextInput
            style={styles.input}
            onChangeText={(goalDailyCalories) => onChangeCalories(goalDailyCalories)}
            value={String(goalDailyCalories)}
            keyboardType={'numeric'}
            />

            <Text>Daily Carbohydrates</Text>
            <TextInput
            style={styles.input}
            onChangeText={(goalDailyCarbs) => onChangeCarbs(goalDailyCarbs)}
            value={String(goalDailyCarbs)}
            keyboardType={'numeric'}
            />

            <Text>Daily Protein</Text>
            <TextInput
            style={styles.input}
            onChangeText={(goalDailyProtein) => onChangeProtein(goalDailyProtein)}
            value={String(goalDailyProtein)}
            keyboardType={'numeric'}
            />

            <Text>Daily Fat</Text>
            <TextInput
            style={styles.input}
            onChangeText={(goalDailyFat) => onChangeFat(goalDailyFat)}
            value={String(goalDailyFat)}
            keyboardType={'numeric'}
            />

            <Text>Daily Activity</Text>
            <TextInput
            style={styles.input}
            onChangeText={(goalDailyActivity) => onChangeActivity(goalDailyActivity)}
            value={String(goalDailyActivity)}
            />

          <Button 
          title='Save Profile' 
          onPress={saveProfile} />
          <Button 
          title='Exit'  
          onPress={() => navigation.navigate('Login')}
          />

        </ScrollView>
      );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      width: 300,
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 20,
    },
  });
  


export default ProfileScreen;
