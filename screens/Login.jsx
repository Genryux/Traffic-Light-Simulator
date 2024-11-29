import { StyleSheet, Text, View, Pressable, TextInput, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'

import rightArrow from '../assets/angle-small-right (1).png'

export default function Login() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
  
    const handleSignIn = async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        //navigation.replace('Home'); 
      } catch (error) {
        Alert.alert('Authentication Error', 'Invalid email or password. Please try again.');  
      }
    };

  return (
    <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('Onboarding')}>
            <Image source={rightArrow} style={{height: 30, width: 30, transform: [{ rotateY: '180deg' }] }} />
        </Pressable>

        <Text style={{fontSize: 36, fontWeight: 'bold', color: '#19191A', opacity: 0.87, marginTop: -50}}>Welcome!</Text>
        <Text style={{fontSize: 16, color: '#19191A', opacity: 0.60}}>Please enter your details to login</Text>

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
        </View>

        <Pressable style={styles.button} onPress={handleSignIn}>
           <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>

        <Pressable style={{position: 'absolute', bottom: 50}} onPress={() => navigation.navigate('Register')}>
            <Text style={{fontSize: 16, color: '#f6f7f8', opacity: 0.60, fontFamily: 'Nunito-Regular'}}>
                Don't have an account? <Text style={{fontWeight: 'bold'}}>Register</Text>
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
    gap: 20,
    backgroundColor: '#030712',
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
    fontFamily: 'Nunito-Bold'
},
backButton: {
    backgroundColor: '#1E293B', 
    height:40, 
    width:40, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 20
}
})