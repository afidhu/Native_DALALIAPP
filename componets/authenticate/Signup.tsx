import { ActivityIndicator, Alert, Button, KeyboardAvoidingView, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from 'expo-router'
import { Mystyles } from '../Allstyle'
import supabase from '@/Supabaseonf'

const Signup = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [username, setUsername] = React.useState('')
  const[dsablebtn, setdesablebtn]=useState(false)
  const[isLoad, setIsload]=useState(false)
  const navigate = useNavigation()

  const userRegister = async () => {
    setdesablebtn(true)
    setIsload(true)
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
          data: {
             username: username ,
            user_type:'user',
            },
          
      }

    })

    if (data.user) {
      await supabase
      .from('UserProfile')
      .insert({
        user_id: data.user.id,
      })
    } else {
      console.log('User data is null', error?.message);
      Alert.alert('Fail', `${error?.message}`)
      setdesablebtn(false)
      setIsload(false)
      return;
    }
    
    if (!error) {
      Alert.alert('Success', 'Go to your Email CLick Link Then Login')
      console.log('User registered successfully:', data);
      setdesablebtn(false)
      setIsload(false)
      navigate.navigate('Login')

    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={Mystyles.container} >
      <View style={Mystyles.container} >
        <View>
          <Text style={styles.text} >  Create Account Now!!  </Text>
          <TextInput
            style={Mystyles.input}
            placeholder='Username'
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
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
            style={Mystyles.input}
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize='none'
            autoCorrect={false}
          />
          {/* <TouchableOpacity disabled={dsablebtn}  onPress={userRegister}>
            {
              isLoad? <ActivityIndicator  size={28} color={'red'} /> :  <Text style={styles.textbtn}  >Create Now!</Text>
            }
          
          </TouchableOpacity> */}

          {
                isLoad? (<ActivityIndicator  size={28} color={'red'} />):( <Button title='Create ' onPress={userRegister} disabled={dsablebtn}  />)
          }
       

          <View style={{ flexDirection: 'row', justifyContent: 'space-round' }}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigate.navigate('Login')}>
              <Text style={{ color: 'blue' }}>  Login</Text>
            </TouchableOpacity>
          </View>
        </View>


      </View>

    </KeyboardAvoidingView>
  )
}

export default Signup

const styles = StyleSheet.create({
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
  textbtn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
})