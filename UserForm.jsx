import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, Button, Text } from 'react-native';


const UserForm = ({ buttonText, onSubmit, children}) => {
  const [user, onChangeUser] = useState('');
  const [password, onChangePassword] = useState('');
  
  const submit = () => {
    onSubmit(user, password);
  };
  
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeUser(text)}
        value={user}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangePassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title={buttonText} onPress={submit} />
      
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'red',
    borderWidth: 1,
    marginTop: 20,
  },
});

export default UserForm;