
import { StyleSheet, View, Pressable, Alert, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { authentication } from '../FireBase/firebaseConfig.js';
import { Text } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../FireBase/firebaseConfig.js';
import { db } from '../FireBase/firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore/lite';
import { doc, setDoc } from "firebase/firestore/lite";
import Navbar from '../Components/navbar.js';
import DayButton from '../Components/dayButton.js';
export default function Days({ navigation }) {
    const [data, setData] = useState()
    const user = auth.currentUser;
    const getData = async () => {
        const daysColumns = collection(db, 'days')
        const daysSnapshot = await getDocs(daysColumns)
        const days = daysSnapshot.docs.map(doc => doc.data())
        days.sort((a, b) => a.order - b.order)
        setData(days)
    }


    useEffect(() => {
        getData()
    }, [])

    return (

        <View style={{ flex: 1, height: '100%' }}>
            <Navbar navigation={navigation} title='Günler'></Navbar>
            <View style={{ height: '10%', padding: 10, paddingLeft: 20 }} >
                <Text style={{ color: '#0F172A', fontWeight: '700' }} variant="headlineSmall">Selam {user.displayName}</Text>
                <Text style={{ color: '#A1A1A1' }}>Rezerve etmek istediğiniz günü seçiniz</Text>
            </View>
            <SafeAreaView style={{ flex: 1, }}>
                <FlatList
                    data={data}
                    style={{ flexGrow: 0, height: '100%' }}
                    renderItem={({ item }) => <DayButton toWhere={() => navigation.navigate('Detail', { day: item.name })} name={item.name}></DayButton>
                    }
                    keyExtractor={item => item.order}
                />
            </SafeAreaView>
        </View>


    );
}
