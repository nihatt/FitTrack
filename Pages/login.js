import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable, Alert, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { authentication } from '../FireBase/firebaseConfig.js';
import React from 'react';
import { IconButton, TextInput } from 'react-native-paper';
import { Text } from 'react-native-paper';
import Lottie from 'lottie-react-native';
import { auth } from '../FireBase/firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from 'react-native-paper';
import { useHeaderHeight } from '@react-navigation/elements'
export default function Login({ navigation }) {
    const [show, setShow] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const animationRef = React.useRef(null)
    React.useEffect(() => {
        animationRef.current?.play()

        // Or set a specific startFrame and endFrame with:
        animationRef.current?.play(30, 120);
    }, [])


    const SignIn = async () => {
        await signInWithEmailAndPassword(auth, email, password)
            .then(re => {

                setIsLoading(false)
                navigation.navigate('Days')
            })
            .catch(function (error) {
                navigation.navigate('Days')
                Alert.alert("Hatalı Bilgi", "Bilgilerinizden birisi veya hepsi hatalı")
         
                setIsLoading(false)
                return error   // Using this line
            });
    }
    const height = useHeaderHeight()
    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: '20%', width: '50%', alignSelf: 'flex-start', alignContent: 'center' }}  >
                <Lottie
                    style={{ alignSelf: 'flex-start', justifyContent: 'center' }}
                    autoPlay
                    loop
                    source={require('../Animations/133076-welcome.json')}
                />

            </View>
            <View>
                <Text style={{ alignSelf: 'center', fontWeight: '900', fontSize: 20 }}>Fit Track Hesabına Giriş Yap </Text>
            </View>
            <View style={{ width: '100%', height: '80%', justifyContent: 'flex-start' }}  >

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ height: '25%', justifyContent: 'space-around' }}
                >
                    <TextInput
                        label="E- Mail"
                        value={email}
                        style={{ width: '90%', alignSelf: 'center', backgroundColor: '#0F172A4D' }}
                        mode='outlined'
                        outlineStyle={{ borderRadius: 14, height: '90%' }}
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        label="Şifre"
                        value={password}
                        secureTextEntry
                        style={{ width: '90%', alignSelf: 'center', backgroundColor: '#0F172A4D' }}
                        outlineStyle={{ borderRadius: 14, height: '90%' }}
                        mode='outlined'
                        onChangeText={text => setPassword(text)}
                    />


                </KeyboardAvoidingView>
                <View style={{ display: 'flex', flexDirection: 'row', height: '10%', justifyContent: 'space-between', paddingLeft: 10, alignItems: 'flex-start' }}>
                    <View style={{ display: 'flex', flexDirection: 'row',alignSelf:'center'}}>
                        <Pressable onPress={()=>navigation.navigate("SignUp")}>
                    <Text style={{ color: '#0F172A', fontWeight: '700', fontSize: 16, alignSelf: 'center' }}>Kayıt ol</Text>
                    </Pressable>
                    <Text style={{ color: '#0F172A', fontWeight: '700', fontSize: 16, alignSelf: 'center' }}>   ya da</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center' }}>
                        <IconButton
                            style={{ alignSelf: 'center' }}
                            icon="facebook"
                            iconColor={"blue"}
                            size={28}
                            onPress={() => console.log('Pressed')}
                        />
                        <IconButton
                            style={{ alignSelf: 'center' }}
                            icon="google"
                            iconColor={"red"}
                            size={28}
                            onPress={() => console.log('Pressed')}
                        />
                                                <IconButton
                            style={{ alignSelf: 'center' }}
                            icon="apple"
                            iconColor={"gray"}
                            size={28}
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                </View>
                <View style={{height:'40%',justifyContent:'flex-end'}}>
                <Button  style={{ justifyContent:'center',alignItems:'center',height:'20%',width: '80%', alignSelf: 'center' ,backgroundColor:'#0F172A',borderRadius:14}} mode="contained" onPress={() => { setIsLoading(true), SignIn() }}>
                       Giriş Yap
                    </Button>
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
