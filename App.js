import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { useFonts } from 'expo-font';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Onboarding from './screens/Onboarding';

const Stack = createNativeStackNavigator();

export default function App() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

    
  //loading custom fonts
  const [fontsLoaded] = useFonts({

    'Nunito-Bold' : require('./assets/fonts/Nunito-Bold.ttf'),
    'Nunito-Regular' : require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Medium' : require('./assets/fonts/Nunito-Medium.ttf'),
    'Nunito-Semibold' : require('./assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-Medium-Italic' : require('./assets/fonts/Nunito-MediumItalic.ttf'),
    'Nunito-Light-Italic' : require('./assets/fonts/Nunito-LightItalic.ttf')
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false)
    });
    return unsubscribe;

  }, [initializing]);


  if (initializing) return null;



  // Check if fonts are loaded
  if (!fontsLoaded) {
      return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          { user ? (
            <Stack.Screen name='Home' component={Home} options={{headerShown: false}} />
          ) : (
            <>
              <Stack.Screen name='Onboarding' component={Onboarding}  options={{headerShown: false}}/>
              <Stack.Screen name='Login' component={Login}  options={{headerShown: false}}/>
              <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
            </>
          )

          }
        </Stack.Navigator>
      </NavigationContainer>
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030712',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});