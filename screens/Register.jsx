import { StyleSheet, Text, View, Pressable, TextInput, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'


import rightArrow from '../assets/angle-small-right (1).png';

export default function Register() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation();
  
    const handleRegister = async () => {

    if (password !== confirmPassword) {
        Alert.alert('Password mismatch', 'Password do not match, please try again.');
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Registration successful', 'Your account has been created successfully, you will be redirected to Home screen.')
      } catch (error) {
        Alert.alert('Authentication Error', 'Invalid email or password. Please try again.');  
      }
    };

  return (
    <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('Onboarding')}>
            <Image source={rightArrow} style={{height: 30, width: 30, transform: [{ rotateY: '180deg' }] }} />
        </Pressable>
        <Text style={{fontSize: 36, fontFamily:'Nunito-Bold', color: '#f6f7f8', opacity: 0.87, marginTop: -50, marginBottom:20}}>Create an account</Text>
        <Text style={{fontSize: 16, fontFamily:'Nunito-Medium', color: '#f6f7f8', opacity: 0.60}}>Please fill out your details below to create your account</Text>
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                keyboardType='email-address'
                onChangeText={setEmail}
                placeholder='youremail@example.com'
                placeholderTextColor={'#6B7280'}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                onChangeText={setPassword}
                placeholder='Enter your password'
                placeholderTextColor={'#6B7280'}
            />
            <TextInput
                style={styles.input}
                secureTextEntry
                onChangeText={setConfirmPassword}
                placeholder='Confirm your password'
                placeholderTextColor={'#6B7280'}
            />
        </View>

        <Pressable style={styles.button} onPress={handleRegister}>
           <Text style={styles.buttonText}>Create account</Text>
        </Pressable>
        <Pressable style={{position: 'absolute', bottom: 50}} onPress={() => navigation.navigate('Login')}>
            <Text style={{fontSize: 16, fontFamily:'Nunito-Medium', color: '#f6f7f8', opacity: 0.60}}>
                Already have an account? <Text style={{fontWeight: 'bold', color:'#32CD32'}}>Login</Text>
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
    backgroundColor:'#030712'
},

inputContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 50,
    marginBottom: 10
},
input: {
    width: '90%',
    height: 58,
    borderWidth: 1,
    borderColor: '#4B5563',
    borderRadius: 5,
    paddingHorizontal: 20,
    opacity: 0.87,
    backgroundColor: '#1E293B',
    color: '#F6F7F8',
},
label: {
    alignSelf: 'flex-start',
    marginHorizontal: 22,
    fontSize: 20,
    color: '#f6f7f8',
    opacity: 0.87,
    fontFamily: 'Nunito-Bold'
},

button: {
    height: 58,
    width: '90%',
    backgroundColor: '#32CD32',
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
},
backButton: {
    backgroundColor: '#1E293B', 
    height:40, 
    width:40, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 20
}
})