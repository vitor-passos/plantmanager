import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, ScrollView, Alert } from 'react-native';
import { Header } from '../components/Header';
import colors from '../styles/colors';

import waterdrop from '../assets/waterdrop.png';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

export function MyPlants() {

    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();

    async function loadStorageData() {
        const plantStoraged = await loadPlant();
        if (plantStoraged[0]) {
            const nextTime = formatDistance(
                new Date(plantStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );
            setNextWatered(`Não esqueça de regar a ${plantStoraged[0].name} à ${nextTime}`);
        }
        setMyPlants(plantStoraged);
        setLoading(false);
    }

    useEffect(() => {
        loadStorageData();
    }, [])

    if (loading)
        return <Load />

    function handleRemove(plant: PlantProps) {
        Alert.alert(`Remover`, `Deseja remover a ${plant.name}?`, [{
            text: 'Não 😊',
            style: 'cancel'
        }, {
            text: 'Sim 😢',
            onPress: async () => {
                try {
                    await removePlant(plant.id);
                    setMyPlants((oldData) => (
                        oldData.filter((item) => item.id !== plant.id))
                    );
                    await loadStorageData();
                } catch (error) {
                    Alert.alert('Não foi possivel remover! 😢')
                }
            }
        }])
    }

    return (
        <View style={styles.container}>
            <Header />
            {myPlants[0] ?
                <View style={styles.spotlight}>
                    <Image
                        source={waterdrop}
                        style={styles.spotlightImage}
                    ></Image>
                    <Text style={styles.spotlightText}>
                        {nextWatered}
                    </Text>
                </View> :
                <Text style={[styles.plantTitle, styles.plantsEmpty]}>
                    Cadastre plantinhas pra você cuidar 🌿🌱
                </Text>
            }
            {myPlants[0] &&
                <View style={styles.plants}>
                    <Text style={styles.plantTitle}>
                        Próximas regadas
                    </Text>
                    <FlatList
                        data={myPlants}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => (
                            <PlantCardSecondary
                                data={item}
                                handleRemove={() => {
                                    handleRemove(item)
                                }} />
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage: {
        width: 60,
        height: 60,
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20

    },
    plantsEmpty: {
        flex: 1,
        marginTop: 70,
        textAlign: 'center'
    }
})