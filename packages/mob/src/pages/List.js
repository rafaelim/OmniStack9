import React from 'react';
import { Alert, Image, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import SafeAreaView from '../components/SafeAreaView';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';
import socketio from 'socket.io-client';

export default function List() {
    const [techs, setTechs] = React.useState([]);

    React.useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.15.18:5000', {
                query: { user_id }
            });

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? "APROVADA" : "REJEITADA"}`);
            })
        })
    }, [])

    React.useEffect(() => {
        AsyncStorage.getItem('techs').then(techs => {
            const arr = techs.replace(/\s/g, "").split(",");
            setTechs(arr);
        })
    }, []);

    return (
        <SafeAreaView style={styles.container} >
            <Image style={styles.logo} source={logo} />
            <ScrollView>
                { techs.map(tech => <SpotList key={tech} tech={tech} /> )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
    }
})