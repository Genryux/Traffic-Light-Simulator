import { Button, StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView } from 'react-native';
import illustration from '../assets/Pedestrian crossing-amico.png'
import rightArrow from '../assets/angle-small-right (1).png'

export default function Onboarding() {
    const navigation = useNavigation();


    return (
    <SafeAreaView style={styles.container}>
        <Text style={{fontFamily: 'Nunito-Bold',  color: '#f6f7f8', fontSize: 37, width: 320, alignSelf:'flex-start'}}>
            Be the Boss{"\n"}of the <Text style={{color:'#FF4C4C'}}>Intersection—</Text> {"\n"}<Text style={{color:'#32CD32'}}>Control</Text> Traffic Lights with a <Text style={{color:'#FFD700'}}>Tap!</Text>
        </Text>
        <Image
            source={illustration}
            style={{width:300, height:300, marginTop:40}}
        />
        <Pressable style={styles.cto} onPress={() => navigation.navigate('Login')}>
            <Text style={{fontFamily: 'Nunito-Bold', color:'#f6f7f8', fontSize:20}}>
                Get Started
            </Text>
            <Image source={rightArrow} style={{height: 25, width: 25}} />
        </Pressable>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
        backgroundColor: '#030712',
    },
    cto: {
        backgroundColor: '#32CD32', 
        height: 58, 
        width:174, 
        borderRadius: 100, 
        justifyContent:'center', 
        alignItems:'center', 
        flexDirection:'row',
        alignSelf: 'flex-end',
        marginTop: 110,
        marginRight: 20
    }
})