import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

export default function About() {

    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.nav}>
                <Pressable style={styles.backButtonContainer} onPress={() => navigation.navigate('Home')}>
                    <Image
                        source={require('../assets/angle-small-right (1).png')}
                        style={{width:30, height: 30, transform: [{ rotateY: '180deg' }] }}
                    />
                </Pressable>

                <Text style={styles.navText}>About Us</Text>

                <View>
                    <Image
                        source={require('../assets/angle-small-right (1).png')}
                        style={{width:30, height: 30, transform: [{ rotateY: '180deg' }], opacity: 0 }}
                    />
                </View>
            </View>

            <View style={{width: '90%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20}}>
                <Text style={{fontFamily: 'Nunito-Bold', color: '#f6f7f8', fontSize: 24}}>
                    Project Overview
                </Text>
                <Text style={{fontFamily: 'Nunito-Medium', color: '#f6f7f8', textAlign: 'center', fontSize: 16, opacity: 0.60, width: '90%'}}>
                    The Traffic Light Simulator puts you in control of the intersection, allowing you to manage and monitor real-time traffic light states through a seamless app powered by ESP32, Firebase, and React Native.
                </Text>
            </View>


            <View style={styles.divider}>
                <View style={[styles.dividerItem, {backgroundColor: '#FF4C4C'}]}></View>
                <View style={[styles.dividerItem, {backgroundColor: '#FFD700'}]}></View>
                <View style={[styles.dividerItem, {backgroundColor: '#32CD32'}]}></View>
            </View>

            <View>
                <Text style={{fontFamily: 'Nunito-Bold', color: '#f6f7f8', fontSize: 24}}>Developers</Text>
            </View>

            <View style={styles.membersContainer}>
                <View style={styles.memberItem}>
                    <View>
                        <Image
                            source={require('../assets/members/cortes.jpg')}
                            style={styles.memberImg}
                        />
                    </View>
                    <View style={styles.memberInfo}>
                        <Text style={{fontFamily:'Nunito-Bold', fontSize:20, color:'#f6f7f8'}}>May Cortes</Text>
                        <Text style={{fontFamily:'Nunito-Semibold', fontSize:15, color:'#f6f7f8', opacity:0.60}}>Project Manager</Text>
                        <Text style={{fontFamily:'Nunito-Regular', fontSize:13, color:'#f6f7f8', opacity:0.30}}>Leader</Text>
                    </View>
                </View>
                <View style={styles.memberItem}>
                    <View>
                        <Image
                            source={require('../assets/members/antonio.jpg')}
                            style={[styles.memberImg, {borderColor: '#FFD700'}]}
                        />
                    </View>
                    <View style={styles.memberInfo}>
                        <Text style={{fontFamily:'Nunito-Bold', fontSize:20, color:'#f6f7f8'}}>CG Antonio</Text>
                        <Text style={{fontFamily:'Nunito-Semibold', fontSize:15, color:'#f6f7f8', opacity:0.60}}>UI/UX Designer</Text>
                        <Text style={{fontFamily:'Nunito-Regular', fontSize:13, color:'#f6f7f8', opacity:0.30}}>Member</Text>
                    </View>
                </View>
                <View style={styles.memberItem}>
                    <View>
                        <Image
                            source={require('../assets/members/buhisan.jpg')}
                            style={[styles.memberImg, {borderColor: '#32CD32'}]}
                        />
                    </View>
                    <View style={styles.memberInfo}>
                        <Text style={{fontFamily:'Nunito-Bold', fontSize:20, color:'#f6f7f8'}}>Rhey Mark Buhisan</Text>
                        <Text style={{fontFamily:'Nunito-Semibold', fontSize:15, color:'#f6f7f8', opacity:0.60}}>Front-End Developer</Text>
                        <Text style={{fontFamily:'Nunito-Regular', fontSize:13, color:'#f6f7f8', opacity:0.30}}>Member</Text>
                    </View>
                </View>
                <View style={styles.memberItem}>
                    <View>
                        <Image
                            source={require('../assets/members/baguion.jpg')}
                            style={styles.memberImg}
                        />
                    </View>
                    <View style={styles.memberInfo}>
                        <Text style={{fontFamily:'Nunito-Bold', fontSize:20, color:'#f6f7f8'}}>John Mike Baguion</Text>
                        <Text style={{fontFamily:'Nunito-Semibold', fontSize:15, color:'#f6f7f8', opacity:0.60}}>Back-End Developer</Text>
                        <Text style={{fontFamily:'Nunito-Regular', fontSize:13, color:'#f6f7f8', opacity:0.30}}>Member</Text>
                    </View>
                </View>
                <View style={styles.memberItem}>
                    <View>
                        <Image
                            source={require('../assets/members/uy.jpg')}
                            style={[styles.memberImg, {borderColor: '#FFD700'}]}
                        />
                    </View>
                    <View style={styles.memberInfo}>
                        <Text style={{fontFamily:'Nunito-Bold', fontSize:20, color:'#f6f7f8'}}>Reinier Xander Uy</Text>
                        <Text style={{fontFamily:'Nunito-Semibold', fontSize:15, color:'#f6f7f8', opacity:0.60}}>Assurance Specialist</Text>
                        <Text style={{fontFamily:'Nunito-Regular', fontSize:13, color:'#f6f7f8', opacity:0.30}}>Member</Text>
                    </View>
                </View>
                <View style={styles.memberItem}>
                    <View>
                        <Image
                            source={require('../assets/members/torilla.jpg')}
                            style={[styles.memberImg, {borderColor: '#32CD32'}]}
                        />
                    </View>
                    <View style={styles.memberInfo}>
                        <Text style={{fontFamily:'Nunito-Bold', fontSize:20, color:'#f6f7f8'}}>Ryan John Torilla</Text>
                        <Text style={{fontFamily:'Nunito-Semibold', fontSize:15, color:'#f6f7f8', opacity:0.60}}>Release Manager</Text>
                        <Text style={{fontFamily:'Nunito-Regular', fontSize:13, color:'#f6f7f8', opacity:0.30}}>Member</Text>
                    </View>
                </View>
                <View style={styles.memberItem}>
                    <View>
                        <Image
                            source={require('../assets/members/orolaza.jpg')}
                            style={[styles.memberImg, {borderColor: '#FF4C4C'}]}
                        />
                    </View>
                    <View style={styles.memberInfo}>
                        <Text style={{fontFamily:'Nunito-Bold', fontSize:20, color:'#f6f7f8'}}>Christian Orolaza</Text>
                        <Text style={{fontFamily:'Nunito-Semibold', fontSize:15, color:'#f6f7f8', opacity:0.60}}>Database Administrator</Text>
                        <Text style={{fontFamily:'Nunito-Regular', fontSize:13, color:'#f6f7f8', opacity:0.30}}>Member</Text>
                    </View>
                </View>
                <View style={styles.memberItem}>
                    <View>
                        <Image
                            source={require('../assets/members/alon.jpg')}
                            style={[styles.memberImg, {borderColor: '#FFD700'}]}
                        />
                    </View>
                    <View style={styles.memberInfo}>
                        <Text style={{fontFamily:'Nunito-Bold', fontSize:20, color:'#f6f7f8'}}>Clifford Alon</Text>
                        <Text style={{fontFamily:'Nunito-Semibold', fontSize:15, color:'#f6f7f8', opacity:0.60}}>User Insight Specialist</Text>
                        <Text style={{fontFamily:'Nunito-Regular', fontSize:13, color:'#f6f7f8', opacity:0.30}}>Member</Text>
                    </View>
                </View>
                
            </View>

        </ScrollView>


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#030712',
    },
    scrollContainer: {
        width: '100%',
        paddingTop: 120,
        paddingBottom: 50,
        alignItems: 'center',
        gap: 40,
    },

    nav: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        paddingHorizontal: 19,
        marginTop: 45
    },

    navText: {
        color: '#f6f7f8',
        fontSize: 24,
        fontFamily: 'Nunito-Bold'
    },
    backButtonContainer: {
        backgroundColor: '#1E293B',
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#374151'
    },
    divider: {
        flexDirection: 'row',
        gap: 30
    },
    dividerItem: {
        height: 30,
        width: 30,
        borderRadius: 100
    },

    membersContainer: {
        width: '90%',
        gap: 10,
    },
    memberItem: {
        width: '100%',
        height: 90,
        backgroundColor: '#1E293B',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        gap: 15,
        borderWidth: 1,
        borderColor: '#374151'
    },

    memberImg: {
        width: 60,
        height: 60,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#FF4C4C'
    }



})