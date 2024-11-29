import { StyleSheet, Text, View, Pressable, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Register() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
  
    const handleRegister = async () => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Registration successful', 'Your account has been created successfully, you will be redirected to Home screen.')
      } catch (error) {
        Alert.alert('Authentication Error', 'Invalid email or password. Please try again.');  
      }
    };

  return (
    <View style={styles.container}>
        <Text style={{fontSize: 36, fontWeight: 'bold', color: '#19191A', opacity: 0.87, marginTop: -50}}>Create an account</Text>
        <Text style={{fontSize: 16, color: '#19191A', opacity: 0.60}}>Please fill out your details below to create your account</Text>
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                keyboardType='email-address'
                onChangeText={setEmail}
                placeholder='youremail@example.com'
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                onChangeText={setPassword}
                placeholder='Enter your password'
            />
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder='Confirm your password'
            />
        </View>

        <Pressable style={styles.button} onPress={handleRegister}>
           <Text style={styles.buttonText}>Register</Text>
        </Pressable>
        <Pressable style={{position: 'absolute', bottom: 50}} onPress={() => navigation.navigate('Login')}>
            <Text style={{fontSize: 16, color: '#19191A', opacity: 0.60}}>
                Already have an account? <Text style={{fontWeight: 'bold'}}>Login</Text>
            </Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({

container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
},

inputContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
},
input: {
    width: '90%',
    height: 48,
    borderWidth: 1,
    borderColor: '#19191A',
    borderRadius: 5,
    paddingHorizontal: 20,
    opacity: 0.87
},
label: {
    alignSelf: 'flex-start',
    marginHorizontal: 22,
    fontSize: 16,
    color: '#19191A',
    opacity: 0.87,
    fontWeight: 'bold'
},

button: {
    height: 48,
    width: '90%',
    backgroundColor: '#007BFF',
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
},
buttonText: {
    fontSize: 16,
    color: '#f6f7f8',
    opacity: 0.87,
    fontWeight: 'bold'
}
})