import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'
import supabase from '@/Supabaseonf'

export default function Logouts() {



      const navigation = useNavigation()
    
    const LogoutuserHandle=async()=>{
    
    let { error } = await supabase.auth.signOut()
        if(!error){
          navigation.navigate('Login')
        }
    
    }
    
  return (
    <View>
      <Text>Logouts</Text>
        <TouchableOpacity onPress={LogoutuserHandle}  >
              <Text>LOGOUT </Text>
            </TouchableOpacity>
    </View>
  )
}