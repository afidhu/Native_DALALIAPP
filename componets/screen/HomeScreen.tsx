import { Button, FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Mystyles } from '../Allstyle'
import { useNavigation } from 'expo-router'
import Modal from 'react-native-modal' // Import react-native-modal
import { UserDataContext } from '../authenticate/UserDataProcider'
import AllHouse from '../pages/AllHouse'
import Location from '../pages/Location'
import supabase from '@/Supabaseonf'



const HomeScreen = () => {

  const { userData } = useContext(UserDataContext)
  const navigation = useNavigation()

  const [alllocations, setalllocations] = useState([])
  const [getLocationId, setGetLocationId] = useState([])
  const [removeLocationId, setremoveLocationId] = useState('')
  const [status, setStatus] = useState('')
  const [userprofiledata, setuserprofiledatas] = useState({})

  console.log("user profilr dddd :", userprofiledata)
  console.log("status :", status)
  const ALLlocation = async () => {
    const { data, error } = await supabase
      .from('houselocation')
      .select("*")
      .order('created_at', { ascending: false })

    if (!error) {
      console.log("locations are:,", data)
      setalllocations(data)

    }
    else {
      console.log("error ocur: ", error)
    }
  }

  useEffect(() => {
    ALLlocation()
  }, [])



  const GotLocationId = (item) => {
    setGetLocationId(item)
    console.log("item", typeof (item), item)
  }


  const AllFunctionDisplay = () => {
    setGetLocationId([]);

  }




  const AgentAccountDetail = async () => {
    const { data, error } = await supabase
      .from('agentaccounthouse')
      .select("*")
      .match({
        'user_id': userData?.id,
      })
      .single()

    if (!error) {
      console.log("locations are:,", data)
      setStatus(data)

    }
    else {
      console.log("error ocur: ", error)
    }
  }

  useEffect(() => {
    AgentAccountDetail()
    // userProfileGetData()

  }, [userData?.id])






  const userProfileGetData = async () => {
    const { data, error } = await supabase
      .from('UserProfile')
      .select("*")
      .eq('user_id', `${userData?.id}`)
      .single()

    if (!error) {
      console.log("profile data are:,", data)
      setuserprofiledatas(data)
      // console.log("data are", data)

    }
    else {
      console.log("error ocur: ", error)
    }
  }

  useEffect(() => {
    userProfileGetData()
  }, [userData?.id])



  //////////////////// HERE CREATE ADMIN IN DATABASE///////////////////////////////

  // const createAdmin=async()=>{
  //   const { data, error } = await supabase.auth.signUp({
  //     email: 'afidhuadmin81@yopmail.com',
  //     password: 'afidhu123456',
  //     options: {
  //         data: {
  //            username: 'afidhu' ,
  //           user_type:'admin',
  //           },

  //     }

  //   })
  //   if(error){
  //     console.log("admin error :", error.message)
  //   }
  //   else{
  //     console.log("suucss admin :", data)
  //   }

  // }



  //////////////////// HERE CREATE ADMIN IN DATABASE///////////////////////////////



  const ProfileuserHandle = () => {

    navigation.navigate('Profile')
  }



  return (
    <>
      <View style={styles.top} >
        <Text style={{ alignSelf: 'flex-start', backgroundColor: 'white' }}  >Hello: {userData?.username} </Text>
        <TouchableOpacity onPress={ProfileuserHandle} style={{ alignSelf: 'flex-end' }}  >
          {
            userprofiledata && (userprofiledata.image_url ? (<Image style={styles.imgprof} source={{ uri: userprofiledata.image_url }} />)
              : (<Image style={styles.imgprof} source={require('../../assets/images/profileDefault.jpg')} />))

          }


          {
            !userprofiledata && (<Image style={styles.imgprof} source={require('../../assets/images/profileDefault.jpg')} />)
          }

        </TouchableOpacity>
      </View>
      <SafeAreaView style={{ flex: 1 }}  >
        {/* <Button title='createAdmin'  onPress={createAdmin} /> */}
        <View   >
          {
            status ? '' : (<Pressable onPress={() => navigation.navigate('agentcreateaccount')} >
              <Text style={styles.left} >Create Bussines Account</Text>
            </Pressable>)
          }
          {
            userData && (
              userData?.userType === "admin" ? (<Pressable onPress={() => navigation.navigate('allagent')} >
                <Text style={styles.makePost} >All Gents</Text>
              </Pressable>) : null)
          }

          {
            status && (
              status?.status == 'approved' ? (<Pressable onPress={() => navigation.navigate('makepost')} >
                <Text style={styles.makePost} >Post Now</Text>
              </Pressable>) : (<View><Text style={styles.makePost}>pandding</Text></View>))
          }

        </View>

        <View style={styles.textView} >
          <Text style={styles.text} > Get Now : Houses, Single Rooms, Master Room, Used electrical Appliances, Beds, mattress Free </Text>
        </View>
        <View style={styles.category} >
          {/* <Location/> */}
          <TouchableOpacity onPress={AllFunctionDisplay} style={styles.itemView} >
            <Text style={styles.item} >All</Text>
          </TouchableOpacity>

          <FlatList
            data={alllocations}
            horizontal
            renderItem={({ item }) => {
              return (
                <ScrollView>

                  <TouchableOpacity onPress={() => GotLocationId(item.id)} style={styles.itemView} >
                    <Text style={styles.item} > {item.location_name}</Text>
                  </TouchableOpacity>

                </ScrollView>
              )
            }}
          />

        </View>


        {/* <View style={styles.imgV} >
          <ScrollView style={{ flexDirection: 'row' }} >
            <TouchableOpacity onPress={() => setModalHandle('1')}  >
              <View style={{ marginLeft: 2 }}  >
                <Image style={styles.img} source={require('../../assets/images/house2.jpg')} />
                <Text >price: $200 </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity   >
              <View style={{ marginLeft: 20 }}>
                <Image style={styles.img} source={require('../../assets/images/house2.jpg')} />
                <Text >price: $200 </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
          <AllHouse />
        </View> */}
        {/* <AllHouse locations={getLocationId} /> */}

      </SafeAreaView>



    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  text: {
    color: 'white',
    backgroundColor: 'green',
    // marginTop:29,
    alignContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: hp('2.59%'),
    borderColor: 'white',
    borderRadius: wp('2%'),
    borderWidth: 2,
    elevation: 50,
    borderTopEndRadius:20,
    borderTopLeftRadius:29,
    borderTopRightRadius:29

  },
  category: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#345',
    color: 'white',
    marginTop: hp('1%'),
    borderRadius: 10,
    alignItems: 'center',
    alignContent: 'center',
    // marginHorizontal:'auto'




  },
  textView: {
    justifyContent: 'center',
    marginTop: hp('3%'),
    alignItems: 'center',
    width: wp('95%'),
    backgroundColor: 'plum',
    height:hp('10%'),
    alignContent: 'center',
    elevation: 20,
    marginHorizontal:wp('1%'),
    marginLeft:wp('2%'),
    marginRight:wp('2%')


  },
  item: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    borderBlockColor: 'red',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'white',
    // width:0,
    alignItems: 'center',
    alignContent: 'center',
    // padding:15,
    paddingHorizontal: wp("5%"),
    marginHorizontal:wp('1%'),
    marginLeft:wp('2%'),
    marginRight:wp('2%'),
  },
  itemView: {
    // backgroundColor:''
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },

  imgV: {
    // backgroundColor:"red",
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: "center",
    // paddingHorizontal:20,


  },
  img: {
    width: 180,
    height: 200,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'space-between',
    // marginLeft:10,

    borderRadius: 20,
    borderWidth: 2,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
    borderTopRightRadius: 20,
    elevation: 80,
    borderBlockColor: '#43331'


  },
  textV: {
    marginTop: hp('2%'),
    backgroundColor: '#3655',
    elevation: 20,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 20,
    borderWidth: 0.1

  },
  textItm: {
    fontWeight: 'bold',
    alignContent: 'center',
    paddingHorizontal: hp('5%'),
    padding: wp('3%'),
    fontSize: 20
  },
  makePost: {
    alignSelf: 'flex-end',
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'green',
    color: 'white',
    // marginTop:5,
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: wp('3%'),
    elevation: 40,
    borderColor: 'midnightblue'
  },
  left: {
    alignSelf: 'flex-start',
    marginTop: 1,
    marginLeft: 20,
    color: '#900',
    fontWeight: 'bold',
    fontSize: 15,
    //  backgroundColor:'#000'

  },
  imgprof: {
    width: wp('10%'),
    height: 50,
    marginVertical: 2,
    marginRight: 8,
    borderRadius: 10,
    borderWidth: 2


  },
  top: {
    backgroundColor: '#3765',
    borderRadius: 10,
    borderWidth: 3,
    marginVertical: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('7%'),
    marginHorizontal:wp('1%'),
    marginLeft:wp('2%'),
    marginRight:wp('2%'),


  }
})