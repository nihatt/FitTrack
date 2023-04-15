
import { StyleSheet, View, Pressable, Alert, StatusBar, Text } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function DetailButton(props) {


    return (

        <Pressable onPress={props.onNavigate}>
            <View style={{ flexDirection:'row',justifyContent:'space-evenly',height: 55, width: '90%', backgroundColor: '#0F172A4D', borderRadius: 14, alignSelf: 'center', justifyContent: 'space-between', alignItems:'center',paddingHorizontal: 15, marginVertical: 10 }}>
                <Text style={{ fontWeight: '700', fontSize: 18 }}>{props.name} - {props.time} dk</Text>
                <Pressable onPress={props.onDelete}>
                <Feather name="trash" size={24} color="black" />
                </Pressable>
            </View>
        </Pressable>


    );
}
