import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Mystyles } from '../Allstyle'
import { useNavigation } from 'expo-router';
import Location from './Location';

const Welcome = () => {

    const navigation = useNavigation();


  return (
    <View style={[Mystyles.container, {backgroundColor:'#37f4'}]} >
        <View>
        <Text  style={styles.text} >Welcome to the House App</Text>
          <TouchableOpacity >
            <Image   source={require('../../assets/images/house.jpg')} style={styles.img} />
          </TouchableOpacity>
        </View>
      <View>
        <Pressable onPress={()=> navigation.navigate('Signup')}  >
        <Text  style={styles.btnText} >Get Started</Text>
        </Pressable>
        <View  style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:20}} >
        <Text  style={styles.btnTextLoginIhave} >I have Account</Text>
        <Pressable onPress={()=> navigation.navigate('Login')}  >
        <Text  style={styles.btnTextLogin} >  LOGIN </Text>
        </Pressable>
        </View>
        {/* <Location/> */}
      </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({

    img:{
        width: 300,
        height: 300,
        borderRadius: 300,
        marginTop: 20,
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 20,
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 10,
    },
    btnText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
    },   
    btnTextLogin:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 10,
    },
    btnTextLoginIhave:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'dark',
        textAlign: 'center',
        // backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
    },

})