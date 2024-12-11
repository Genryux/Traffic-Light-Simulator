import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Image, Modal, Button } from 'react-native';
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

  // Function to change the light state and update Firebase

  const [outline, setOutline] = useState('#4B5563')
  const [state, setState] = useState('Off');
  const [timer, setTimer] = useState(0);
 
   useEffect(() => {
     // Reference to the traffic light state in Firebase
     const trafficLightRef = ref(db, '/trafficLights');
 
     // Listen for changes in Firebase
     const unsubscribe = onValue(trafficLightRef, (snapshot) => {
       const data = snapshot.val();
       if (data) {
         setState(data.state);
         setTimer(data.timer);
       }
     });
 
     // Cleanup the listener when the component unmounts
     return () => unsubscribe();
   }, []);
 
   const handleStateChange = (newState) => {
     // Update the traffic light state in Firebase
     set(ref(db, '/trafficLights/state'), newState);
     if (newState === 'STOP') {
        setOutline('#FF4C4C')
        set(ref(db, '/trafficLights/timer'), 30); // Red lasts 30 seconds
     } else if (newState === 'GO') {
        setOutline('#32CD32')
        set(ref(db, '/trafficLights/timer'), 30); // Green lasts 30 seconds
     } else if (newState === 'PREPARE') {
        setOutline('#FFD700')
        set(ref(db, '/trafficLights/timer'), 5);  // Yellow lasts 5 seconds
     }  else if (newState === 'BLINKING') {
        setOutline('#F5A623')
        set(ref(db, '/trafficLights/timer'), 30); // Blinking duration
     } else if (newState === 'Off') {
        setOutline('#4B5563')
        set(ref(db, '/trafficLights/timer'), 0);
     }
   };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login'); // Redirect to the Sign-In screen
    } catch (error) {
      console.log('Error signing out: ', error.message);
    }
  };

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

      <View style={styles.outputContainer}>
        <Text style={{fontFamily:'Nunito-Bold', color:'#f6f7f8',fontSize:24}}>STATUS:</Text>
        <View style={[styles.output, {borderColor: outline} ]}>
          <View style={{height:25, width:25, borderRadius:100, backgroundColor:outline}}></View><Text style={{color:'#fff', fontSize:24}}>{state}</Text><View style={{height:25, width:25, opacity:0}}></View>
        </View>
        <Text style={{fontFamily:'Nunito-Bold', color:'#f6f7f8',fontSize:24}}>TIME LEFT BEFORE SWITCH:</Text>
        <View style={[styles.output, {borderColor:'#4B5563'}]}>
          <Text style={{color:'#fff',fontSize:24, margin: 'auto'}}>{`${timer}s`}</Text>
        </View>
      </View>

      <View style={styles.controlButtons}>
        <Pressable style={[styles.btn, {backgroundColor:'#FF4C4C'}]} onPress={() => handleStateChange('STOP')}>
        <Text style={{color:'#f6f7f8', fontFamily:'Nunito-Bold', fontSize: 24}}>STOP</Text>
        </Pressable >
        <Pressable style={[styles.btn, {backgroundColor:'#FFD700'}]} onPress={() => handleStateChange('PREPARE')}>
          <Text style={{color:'#f6f7f8', fontFamily:'Nunito-Bold', fontSize: 24}}>PREPARE</Text>
        </Pressable>
        <Pressable style={[styles.btn, {backgroundColor:'#32CD32'}]} onPress={() => handleStateChange('GO')}> 
          <Text style={{color:'#f6f7f8', fontFamily:'Nunito-Bold', fontSize: 24}}>GO</Text>
        </Pressable>
        <Pressable style={[styles.btn, {backgroundColor:'#F5A623'}]} onPress={() => handleStateChange('BLINKING')}>
          <Text style={{color:'#f6f7f8', fontFamily:'Nunito-Bold', fontSize: 24}}>BLINK</Text>
        </Pressable>
        <Pressable style={[styles.btn, {backgroundColor:'#4B5563', height: 58, width: '95%'}]} onPress={() => handleStateChange('Off')}>
          <Text style={{color:'#f6f7f8', fontFamily:'Nunito-Bold', fontSize: 24}}>TURN OFF</Text>
        </Pressable>
      </View>
      


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
    gap: 50,
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



  outputContainer: {
    justifyContent: 'center',
    alignItems:'center',
    width:'100%',
    gap: 20,
    marginTop: 100
  },
  output: {
    width:'90%',
    height:58,
    backgroundColor:'#1E293B',
    borderRadius:10,
    borderWidth:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },

  controlButtons: {
    width: '100%',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:67,
    gap: 15
  },

  btn: {
    height:130,
    width:130,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center'
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

