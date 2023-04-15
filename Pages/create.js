
import { StyleSheet, View, Pressable, Alert, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { authentication } from '../FireBase/firebaseConfig.js';
import { Button, Text, TextInput } from 'react-native-paper';
import React, { useEffect, useState } from 'react';

import { FAB } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../FireBase/firebaseConfig.js';

import { signInWithEmailAndPassword } from 'firebase/auth';

import { db } from '../FireBase/firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore/lite';
import { doc, setDoc } from "firebase/firestore/lite";
import Navbar from '../Components/navbar.js';
import DayButton from '../Components/dayButton.js';
import DetailButton from '../Components/detailButton.js';
import uuid from 'react-native-uuid';
export default function Create({ route,navigation }) {

    const dayOfExercise = route.params.day
    const updateName = route.params.name
    const updateDuration = route.params.duration
    const id = route.params.id
    const [name, setName] = useState(updateName ? updateName : "");
    const [duration, setDuration] = useState(updateDuration ? updateDuration : "");

    var uniqueId =id ? id : uuid.v4(); 

    const addExercise = async () => {
        
       await setDoc(doc(db, "workouts",uniqueId ), {
            w_day: dayOfExercise,
            w_duration: duration,
            w_name: name,
            id:uniqueId
          }).then(()=>{Alert.alert(updateDuration ? "Güncelleme başarılı" : "Antrenman Başarıyla Eklendi"),setName(""),setDuration("")})
          .catch(e=>Alert.alert("Hata", e))
    }
    return (
        <View style={{ flex: 1, height: '100%' }}>

            <Navbar navigation={navigation} title={updateName ? "Güncelleme" : "Yeni Egzersiz"}></Navbar>

            <View style={{ borderColor: 'black', height: '12%', padding: 10, paddingLeft: 20, justifyContent: 'center' }} >
                <Text style={{ color: '#0F172A', fontWeight: '700', fontSize: 18, textAlign: 'left' }} >{updateName ? "Egzersinizin detaylarını düzenleyin" : "Yeni Egsersiz detaylarınızı girin."}</Text>



            </View>
            <View style={{width:'90%',height:'26%',justifyContent:'space-between',alignSelf:'center'}}>
                <TextInput
                    label="Antrenman Adı"
                    value={name}
                    style={{ width: '100%', alignSelf: 'center', backgroundColor: '#0F172A4D' }}
                    mode='outlined'
                    outlineStyle={{ borderRadius: 14,height:'100%'}}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    label="Süresi"
                    value={duration}
                    style={{ width: '100%', alignSelf: 'center', backgroundColor: '#0F172A4D' }}
                    outlineStyle={{ borderRadius: 14 ,height:'100%'}}
                    mode='outlined'
                    onChangeText={text => setDuration(text)}
                />
                <Button  mode="contained" style={{width:'45%',height:'20%',alignSelf:'flex-end' , backgroundColor:'#0F172A',borderRadius:14}} onPress={() => addExercise()}>
                    {updateName ? "Güncelle" : "Ekle"}
                </Button>
            </View>


        </View>

    )
}