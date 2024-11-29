import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false)
    });
    return unsubscribe;

  }, [initializing]);


  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <Stack.Screen name='Home' component={Home} />
        ) : (
          <>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register}/>
          </>
        )

        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

