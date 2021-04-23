import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import colors from '../styles/colors';
import userImg from '../assets/vitor.jpeg';
import fonts from '../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Header() {
    const [userName, setUseName] = useState<string>();
    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUseName(user || '');
        }
        loadStorageUserName();
    }, []);
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>
            <Image source={userImg} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: 40
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40,

    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,

    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }

})