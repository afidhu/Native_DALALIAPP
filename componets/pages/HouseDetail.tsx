import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HouseDetail = ({route}) => {
    const{id} =route.params
  return (
    <SafeAreaView>
      <Text>HouseDetail{id}</Text>
    </SafeAreaView>
  )
}

export default HouseDetail

const styles = StyleSheet.create({})