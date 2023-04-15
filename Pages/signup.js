import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable, Alert, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { authentication } from '../FireBase/firebaseConfig.js';
import React from 'react';
import { TextInput } from 'react-native-paper';
import { Text } from 'react-native-paper';
import Lottie from 'lottie-react-native';
import { auth } from '../FireBase/firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from 'react-native-paper';
import { useHeaderHeight } from '@react-navigation/elements'
import { getAuth, createUserWithEmailAndPassword,updateProfile  } from "firebase/auth";
import Navbar from '../Components/navbar.js';
export default function SignUp({ navigation }) {
    const [show, setShow] = React.useState(false);
    const auth = getAuth();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const animationRef = React.useRef(null)
    React.useEffect(() => {
        animationRef.current?.play()

        // Or set a specific startFrame and endFrame with:
        animationRef.current?.play(30, 120);
    }, [])


    const SignUp = async () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        
            updateProfile(auth.currentUser, {
                displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
              }).then(() => {
                Alert.alert("Aramıza Hoşgeldiniz","Üyelik Başarılı")
                navigation.navigate("Days")
              }).catch((error) => {
                // An error occurred
                // ...
              });

       
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert(errorMessage,errorCode);
          // ..
        });
    }

    return (

        <View style={{ flex: 1 }}>

            <Navbar navigation={navigation} title="Kayıt Ol" isTrue={true}></Navbar>

            <View style={{ borderTopLeftRadius: 30, borderTopRadius: 30, width: '100%', height: '80%', justifyContent: 'flex-start' }}  >
            <View style={{ height: '30%', width: '50%', alignSelf: 'center', alignContent: 'center' }}  >
                <Lottie
                    style={{ alignSelf: 'flex-start', justifyContent: 'center' }}
                    ref={animationRef}
                    source={require('../Animations/99668-fitness.json')}



                />

            </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ height: '30%', justifyContent: 'space-between' }}
                >
                    <TextInput
                        label="İsim"
                        value={name}
                        style={{ width: '80%', alignSelf: 'center', backgroundColor: '#0F172A4D' }}
                        mode='outlined'
                        outlineStyle={{ borderRadius: 14, height: '90%' }}
                        onChangeText={name => setName(name)}
                    />
                    <TextInput
                        label="E- Mail"
                        value={email}
                        style={{ width: '80%', alignSelf: 'center', backgroundColor: '#0F172A4D' }}
                        mode='outlined'
                        outlineStyle={{ borderRadius: 14, height: '90%' }}
                        onChangeText={email => setEmail(email)}
                    />
                    <TextInput
                        label="Şifre"
                        value={password}
                        secureTextEntry
                        style={{ width: '80%', alignSelf: 'center', backgroundColor: '#0F172A4D' }}
                        outlineStyle={{ borderRadius: 14, height: '90%' }}
                        mode='outlined'
                        onChangeText={password => setPassword(password)}
                    />



                </KeyboardAvoidingView>
                <View style={{height:'20%',marginTop:'25%',justifyContent:'space-around'}}>

      
        
                    <Button icon="plus" style={{ justifyContent:'center',alignItems:'center',height:'40%',width: '80%', alignSelf: 'center' ,backgroundColor:'#0F172A',borderRadius:14}} mode="contained" onPress={() => { setIsLoading(true), SignUp() }}>
                       Üye ol
                    </Button>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text style={{ alignSelf: 'center' }}>Şimdi Giriş Yap !</Text>
                    </Pressable>
                    </View>
            </View>

        </View>




    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
});
