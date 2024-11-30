import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Image, Modal } from 'react-native';
import { signOut } from 'firebase/auth';
import { onValue, ref, set } from 'firebase/database';
import { auth, db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import menuIcon from '../assets/menu-burger.png';
import closeIcon from '../assets/cross.png';

export default function Home() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [counter, setCounter] = useState(0); 
  const [loading, setLoading] = useState(true);

  const counterRef = ref(db, '/counters'); 

  // Fetch counter value from Firebase
  useEffect(() => {
    const unsubscribe = onValue(counterRef, (snapshot) => {
      if (snapshot.exists()) {
        setCounter(snapshot.val());
      } else {
        setCounter(0); // Default to 0 if no value exists
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  // Increment the counter
  const handleIncrement = () => {
    if (auth.currentUser) {
      set(counterRef, counter + 1)
        .then(() => console.log('Counter incremented'))
        .catch((error) => Alert.alert('Error', error.message));
    } else {
      Alert.alert('Error', 'You must be logged in to increment the counter.');
    }
  };

  // Decrement the counter
  const handleDecrement = () => {
    if (auth.currentUser) {
      set(counterRef, counter - 1)
        .then(() => console.log('Counter decremented'))
        .catch((error) => Alert.alert('Error', error.message));
    } else {
      Alert.alert('Error', 'You must be logged in to decrement the counter.');
    }
  };

  // Clear the counter value
  const handleReset = () => {
    Alert.alert(
      'Reset Counter',
      'Are you sure you want to reset the counter to 0?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            set(counterRef, 0)
              .then(() => {
                setCounter(0); // Update local state
                console.log('Counter reset');
              })
              .catch((error) => Alert.alert('Error', error.message));
          },
        },
      ]
    );
  };
  

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login'); // Redirect to the Sign-In screen
    } catch (error) {
      console.log('Error signing out: ', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text style={{fontFamily: 'Nunito-Bold', color: '#f6f7f8', fontSize: 24}}>Dashboard</Text>

        <Pressable onPress={() => setModalVisible(true)}>
          <Image
            source={menuIcon}
            style={styles.menuIcon}
            
          />
        </Pressable>

      </View>
      <Text style={{fontSize: 24, fontWeight: 'bold', marginTop:-100}}>Welcome to the Dashboard!</Text>
      
      <View style={{width:'90%', alignItems: 'center'}}>
        <View style={styles.counterContainer}>
          <Text style={{fontWeight: 'bold', fontSize: 22}}>Counter:</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 100, marginTop: 50 }}>{counter}</Text>
        </View>
        <View style={styles.buttonContainer}>

          <Pressable style={styles.buttons} onPress={handleDecrement}>
            <Text style={{fontWeight: 'bold', color: '#f6f7f8', fontSize: 20}}>-</Text>
          </Pressable>
          
          <Pressable style={styles.buttons} onPress={handleIncrement}>
            <Text style={{fontWeight: 'bold', color: '#f6f7f8', fontSize: 20}}>+</Text>
          </Pressable>

        </View>
        <Pressable style={[ styles.buttons, {width: 285, marginTop: -5, backgroundColor: '#F47174'}]} onPress={handleReset}>
          <Text style={{ fontWeight: 'bold', color: '#f6f7f8', fontSize: 20 }}>Reset</Text>
        </Pressable>
      </View>

      <Pressable style={styles.button} onPress={handleSignOut}>
        <Text style={{fontWeight: 'bold', color: '#f6f7f8', fontSize: 16}}>Sign out</Text>
      </Pressable>

      <Modal
      transparent={true}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible); // Close the modal when back button is pressed
      }}
      >

        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Image
                source={closeIcon}
                style={{width: 25, height: 25, alignSelf: 'flex-end'}}
              />
            </Pressable>

            <View style={styles.modalButtonContainer}>
              <Pressable onPress={() => navigation.navigate('About')}>
                <Text style={styles.modalText}>About</Text>
              </Pressable>
              <Pressable onPress={handleSignOut}>
                <Text style={styles.modalText}>Sign Out</Text>
              </Pressable>
            </View>
            
          </View>
        </View>

      </Modal>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#030712',
  },

  navBar: {
    backgroundColor:'#1E293B',
    width: '100%',
    position: 'absolute',
    top: 0,
    marginTop: 47,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    height: 60
  },
  menuIcon: {
    height: 30,
    width: 30
  },
  modalOverlay: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    flex: 1
  },
  modalContent:{
    flex: 1,
    backgroundColor: '#374151',
    width: '85%',
    alignSelf: 'flex-end',
    padding: 28,
    gap: 20
  },
  modalText: {
    color: '#f6f7f8',
    fontSize: 28,
    fontFamily: 'Nunito-Bold'
  },
  modalButtonContainer: {
    gap: 15
  },


  button: {
    height: 48,
    width: 200,
    backgroundColor: '#007BFF',
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50
  },
  counterContainer: {
    height: 250,
    width: 285,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center'
  },
  buttons: {
    height: 60,
    width: 140,
    backgroundColor: '#007BFF',
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  }
    
})

