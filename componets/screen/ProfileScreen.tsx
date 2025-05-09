import { ActivityIndicator, Alert, Button, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import supabase from '@/Supabaseonf'
import { useNavigation } from 'expo-router'
import { Mystyles } from '../Allstyle'
import * as ImagePicker from 'expo-image-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { UserDataContext } from '../authenticate/UserDataProcider'

const ProfileScreen = () => {

  const { userData } = useContext(UserDataContext)

  const [IsImage, setIsimage] = useState(false)
  const [FileUrl, setFileUrl] = useState('');
  const [isPostUrl, setIsPostUrl] = useState(false);
  const [userprofiledata, setuserprofiledata] = useState<any[]>([])
  const [phone, setphone] = useState('')


  const navigation = useNavigation()



  const mimeMap: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    mp4: 'video/mp4',
    mov: 'video/quicktime',
    pdf: 'application/pdf',
    txt: 'text/plain',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    doc: 'application/msword',
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
  };
  const TakeFileHandle = async () => {
    setIsimage(true)
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
      });
      console.log(result)

      if (result.canceled) return;

      const asset = result.assets[0];
      const uri = asset.uri;
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });

      const extension = uri.split('.').pop()?.toLowerCase() || 'bin';
      const contentType = mimeMap[extension] || 'application/octet-stream';
      const path = `profilefolder/file_${Date.now()}.${extension}`;
      const fileBuffer = decode(base64);

      const { error } = await supabase.storage
        .from('userprofilehouse') // Your bucket name
        .upload(path, fileBuffer, {
          contentType,
          upsert: true,
        });

      if (error) {
        console.log(' Upload error:', error.message);
        return;
      }

      // Get public URL
      const { data, error: urlError } = supabase.storage
        .from('userprofilehouse')
        .getPublicUrl(path);

      if (urlError) {
        console.log(' Failed to get public URL:', urlError.message);
        Alert.alert('Failure', 'Fail to Upload Check internet!!')
        return;
      } else {
        setFileUrl(data.publicUrl);
        Alert.alert('Success', 'Success Image Uploaded!!')
        setIsPostUrl(true);
        setIsimage(false)


        console.log(' File uploaded. View it here:', data.publicUrl);
      }
    } catch (err) {
      console.log(' Error during file handling:', err.message);
    }

  };




  // useEffect(() => {
  //   const channel = supabase
  //     .channel('table_db_changes')
  //     .on(
  //       'postgres_changes',
  //       {
  //         event: 'INSERT',/// HERE YO CAN PUT ALL '*'
  //         schema: 'public',
  //         table: 'UserProfile',
  //       },
  //       (payload) => {
  //         const newItem = payload.new;
  //         setuserprofiledata((prev) => [newItem, ...prev]);
  //       }
  //     )
  //     .subscribe();

  //   return () => {
  //     supabase.removeChannel(channel);
  //   };
  // }, []);


  const UpdateProfileHandle = async () => {
    setIsimage(true)
    const { data, error } = await supabase
      .from('UserProfile')
      .update({ image_url: FileUrl, phone: phone })
      .eq('user_id', userData?.id)

    if (error) {
      console.log("upload error :", error.message)
    }
    // else {
    //   console.log("data are :", data)
    //   setIsimage(false)
    //   navigation.navigate('Home')
    // }
  }


  const userprofileData = async () => {
    const { data, error } = await supabase
      .from('UserProfile')
      .select('*')
      .eq('user_id', userData?.id)
      .single()

    if (error) {
      console.log("user get data error :", error.message)
    }
    else {
      setuserprofiledata(data)

    }
    // UpdateProfileHandle()  
  }


  useEffect(() => {
    userprofileData()

  }, [userData?.id])






  // c8e6b930-7920-4fe5-9e33-28ad1e387254


  const LogoutuserHandle = async () => {

    let { error } = await supabase.auth.signOut()
    if (!error) {
      navigation.navigate('Login')
    }

  }



  return (

    <View style={styles.container} >
      <View style={styles.imgV} >
        <TouchableOpacity>
          {

            userprofiledata?.image_url ? (<Image style={styles.img} source={{ uri: userprofiledata?.image_url }} />)
              : (<Image style={styles.img} source={require('../../assets/images/profileDefault.jpg')} />)

          }


        </TouchableOpacity>

        <Pressable onPress={TakeFileHandle} ><Text style={styles.txt} > choose image </Text>
          <EvilIcons name="image" size={24} color="black" />j
        </Pressable>
        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={LogoutuserHandle}  >
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>

      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>

      <View style={styles.container2} >

          <TextInput value={userData?.username} readOnly style={Mystyles.input} />
  


        <View>
          <TextInput placeholder='+255' value={phone} keyboardType='numeric' onChangeText={setphone} style={Mystyles.input} />
        </View>

   
      </View>
      </KeyboardAvoidingView>

      {
        IsImage ? (<ActivityIndicator size={29} color={'red'} />) : (<TouchableOpacity disabled={IsImage} style={styles.btn} onPress={UpdateProfileHandle}>

          <Text style={styles.btnText} >UPDATE</Text>
        </TouchableOpacity>)
      }


    </View>

  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 0,
    // backgroundColor: 'yellow',
    // justifyContent:'center',
    marginHorizontal: 10
  },
  imgV: {
    // backgroundColor: 'red',
    // marginVertical: 30,
    marginHorizontal: 20,
    justifyContent: "center",
  },
  img: {
    width: 100,
    backgroundColor: 'white',
    height: 100,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 2,
    elevation: 20,
    marginTop: 20,
  },
  container2: {
    // backgroundColor: 'plum',
    // marginTop: 5,
    marginHorizontal: 20,

  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
     marginTop: 150

  },
  btnText: {
    color: '#3efe',
    fontSize: 29,
    borderColor: '#4444',
    backgroundColor: 'midnightblue',
    borderRadius: 10,
    borderWidth: 3,
    elevation: 10,
  },
  txt: {
    fontSize: 20
  }
})