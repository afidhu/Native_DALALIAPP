import { ActivityIndicator, Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Signup from './Signup';
import { Mystyles } from '../Allstyle';
import supabase from '@/Supabaseonf';

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const[isloadind, setloadind]=useState(false)


  const handleLogin = async () => {
    setloadind(true)
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if (!error) {
      console.log('User logged in successfully:', data);
      navigation.navigate('Home')
    }
    else {
      Alert.alert('Failure', `${error.message}`)
      console.log('Error logging in:', error.message);
      setloadind(false)
    }

  }
  // const router =useRouter
  return (
    <KeyboardAvoidingView behavior="padding" style={Mystyles.container} >
      <View style={Mystyles.container} >

        <Text style={styles.text} >  Login Now!!  </Text>
        <TextInput
          style={Mystyles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType='email-address'
        />
        <TextInput
          placeholder='Password'
          style={Mystyles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />

        {
          isloadind?   <ActivityIndicator  size={30} color={'red'} />: (<TouchableOpacity onPress={handleLogin}>
            <Text style={styles.btnText}  >Login</Text>
          </TouchableOpacity> )
        }
        <View style={{ flexDirection: 'row', justifyContent: 'space-round' }}>
                    <Text>Not have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                      <Text style={{ color: 'blue' }}>  SignUp</Text>
                    </TouchableOpacity>
                  </View>
      



      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
})