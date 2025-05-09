import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'


    const { width } = Dimensions.get('window');
    const WIDTH = (width) / 100;
    const HEGHT = (width) / 10

    


export const Mystyles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    input:{
        width: 300,
        height: 50,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        color: 'darkblue',
        fontSize: 20,
        fontWeight: 'bold',
    },

})