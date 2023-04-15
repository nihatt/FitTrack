
import { StyleSheet, View, Pressable, Alert, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { Text } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { FAB } from 'react-native-paper';
import { auth } from '../FireBase/firebaseConfig.js';
import Lottie from 'lottie-react-native';
import { db } from '../FireBase/firebaseConfig.js';
import { collection, getDocs, deleteDoc } from 'firebase/firestore/lite';
import { doc, setDoc } from "firebase/firestore/lite";
import Navbar from '../Components/navbar.js';
import DetailButton from '../Components/detailButton.js';
import { useIsFocused } from '@react-navigation/native';
export default function Details({ route, navigation }) {
    const [data, setData] = useState()
    const day = route.params.day;
    const user = auth.currentUser;
    const getData = async () => {
        const workoutColumns = collection(db, 'workouts')
        const workoutSnapshot = await getDocs(workoutColumns)
        const workouts = workoutSnapshot.docs.map(doc => doc.data())

        let filteredWorkouts = [];
        for (var i = 0; i < workouts.length; i++) {
            if (workouts[i].w_day == day) {
                filteredWorkouts.push(workouts[i])
            }
        }

        setData(filteredWorkouts)
    }

    const handleDelete = async (idToDelete) => {
  
        await deleteDoc(doc(db, "workouts", idToDelete.toString())).then(() => { Alert.alert("Antrenman Başarıyla Silindi"), getData() })
            .catch(e => Alert.alert("Hata", e))
    }
    const isFocused = useIsFocused();

    useEffect(() => {
        getData()
    }, [isFocused])
    return (

        <View style={{ flex: 1, height: '100%' }}>

            <Navbar navigation={navigation} title='Egzersizler'></Navbar>

            <View style={{ height: '10%', padding: 10, paddingLeft: 20 }} >
                <Text style={{ color: '#0F172A', fontWeight: '700' }} variant="headlineSmall">Merhaba {user.displayName}</Text>

                <Text style={{ color: '#A1A1A1' }}>Değiştirmek istediğin çalışmayı seçebilirsin</Text>

            </View>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    ListEmptyComponent={<View style={{ paddingTop: 80, height: '100%', alignSelf: 'center', justifyContent: 'center' }}>
                        <Lottie
                            style={{ alignSelf: 'center', justifyContent: 'center', height: 280 }}
                            // ref={animationRef}
                            source={require('../Animations/97434-no-data-available.json')}
                            autoPlay
                        />
                    </View>
                    }
                    style={{ flexGrow: 0, height: '100%' }}
                    renderItem={({ item }) => <DetailButton onNavigate={() => navigation.navigate("Create", { day: day, name: item.w_name, duration: item.w_duration,id:item.id })} onDelete={()=>handleDelete(item.id)} name={item.w_name} time={item.w_duration}></DetailButton>
                    }
                    keyExtractor={item => item.order}
                />

            </SafeAreaView>
            <FAB
                icon="plus"
                color='white'
                size='10'


                style={styles.fab}
                onPress={() => navigation.navigate("Create", { day: day })}
            />

        </View>


    );
}
const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 30,

        right: 0,
        bottom: 0,
        backgroundColor: '#0F172A',
        color: 'white'
    },
})