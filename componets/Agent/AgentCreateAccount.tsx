import { Alert, Button, StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native'
import React, { useContext,  useEffect, useState } from 'react'
import { Mystyles } from '../Allstyle'
// import { TextInput } from 'react-native-gesture-handler'
import { UserDataContext } from '../authenticate/UserDataProcider'
import supabase from '@/Supabaseonf'


const AgentCreateAccount = () => {
  
  const{userData}= useContext(UserDataContext)



  const[lesenNo, setLesenNo]=useState('')
  const[Phone, setPhone]=useState('')
  const[isLoad, setLoad] =useState(false)

  const AgentCreateAccount=async()=>{
    setLoad(true)
    const{data, error}= await supabase
    .from('agentaccounthouse')
    .insert([{

      user_id:userData.id, phone:Phone, lencense:lesenNo, username:userData.username 
    }])

    if(error){
      console.log("eeeoe in craeted acount agent :", error?.message)
      setLoad(false)
    }

    else{
      Alert.alert("Success", 'your Account Created wait confirmation')
      console.log("success :", data)
      setLoad(false)
    }

  }












  return (
    <View  style={Mystyles.container} >
      <View >
        <Text  style={styles.text} > Hellow: Create Dalali Account Now Kindly!!  </Text>
      </View>
      <View>
        <TextInput style={Mystyles.input}
          autoCapitalize='none'
          autoCorrect={false}
          value={userData?.username}
          readOnly

         

        />



        <TextInput style={Mystyles.input}
          placeholder='lencese No'
          autoCapitalize='none'
          autoCorrect={false}
          value={lesenNo}
        onChangeText={setLesenNo}

        />
          <TextInput style={Mystyles.input}
          placeholder='phone No'
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='numeric'
        value={Phone}
          onChangeText={setPhone}

        />
      </View>

<Button title='Created' disabled={isLoad}  onPress={AgentCreateAccount}  />
    </View>
  )
}

export default AgentCreateAccount

const styles = StyleSheet.create({
  text:{
    marginBottom:60,
    fontWeight:'bold',
    fontSize:20,
    color:'#ff3'
  }
})