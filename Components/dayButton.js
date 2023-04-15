
import { StyleSheet, View, Pressable, Alert, StatusBar, Text } from 'react-native';




export default function DayButton(props) {


    return (

        <Pressable onPress={props.toWhere}>
            <View style={{ height: 55, width: '90%', backgroundColor: '#0F172A4D', borderRadius: 14, alignSelf: 'center', justifyContent: 'center', paddingLeft: 15, marginVertical: 10 }}>
                <Text style={{ fontWeight: '700', fontSize: 18 }}>{props.name}</Text>
            </View>
        </Pressable>


    );
}
