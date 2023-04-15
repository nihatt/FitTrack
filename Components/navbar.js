
import { StyleSheet, View, Pressable, Alert, StatusBar,Text } from 'react-native';


import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect } from 'react';

import { AntDesign } from '@expo/vector-icons';

import { getAuth, signOut } from "firebase/auth";
export default function Navbar( props ) {

    const auth = getAuth();
    const SignOut = () =>{
        signOut(auth).then(() => {
            props.navigation.navigate("Login")
          }).catch((error) => {
            Alert.alert("Bir şeyler Ters Gitti" + e)
          });
    }
    return (

 
            <View style={{  marginTop: StatusBar.currentHeight, flexDirection: 'row', alignItems: 'flex-end', backgroundColor: '#0F172A' ,height:'10%'}} >
                <Pressable style={{ paddingLeft:10,display: 'flex', flexDirection: 'row', alignItems: 'center', width: '50%' }} onPress={() => props.navigation.goBack()}>
                <AntDesign name="left" size={18} color="white" />
                    <Text style={{color:'white',fontSize:22,paddingLeft:10,paddingBottom:3,fontWeight:'700'}}>{props.title}</Text>
                    
                </Pressable>
{props.isTrue ? null:                <Pressable style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '50%',justifyContent:'flex-end',paddingRight:20 }}  onPress={() => SignOut()}>
                <AntDesign name="poweroff" size={20} color="red" style={{paddingBottom:10}} />
                </Pressable>}
            </View>
   


    );
}