import { ActivityIndicator, Alert, Button, FlatListComponent, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { Mystyles } from '../Allstyle';
import Ionicons from '@expo/vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import supabase from '@/Supabaseonf';
// import * as mime from 'mime'; // install with: npm install mime
import { decode } from 'base64-arraybuffer'; // install with: npm install base64-arraybuffer
import { UserDataContext } from '../authenticate/UserDataProcider';
import { Link, useNavigation } from 'expo-router';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import { Video } from "expo-av";


const MakePost = () => {
  const { userData } = useContext(UserDataContext)

  const navigation = useNavigation();

  const [selectedCategory, setSelectedCategory] = useState('')
  const [title, setTitle] = useState('');
  const [content, setcontent] = useState('');
  const [location, setlocation] = useState('');
  const [price, setprice] = useState('');
  const [IsImage, setIsimage] = useState(Boolean)
  const [FileUrl, setFileUrl] = useState('');
  const [isPostUrl, setIsPostUrl] = useState(false);
  const [getLocation, setGetLocation] = useState([])

  console.log(getLocation)



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

      if (result.canceled) return;

      const asset = result.assets[0];
      const uri = asset.uri;
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });

      const extension = uri.split('.').pop()?.toLowerCase() || 'bin';
      const contentType = mimeMap[extension] || 'application/octet-stream';
      const path = `housefolder/file_${Date.now()}.${extension}`;
      const fileBuffer = decode(base64);

      const { error } = await supabase.storage
        .from('uploadhouse') // Your bucket name
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
        .from('uploadhouse')
        .getPublicUrl(path);

      if (urlError) {
        console.log(' Failed to get public URL:', urlError.message);

        setTimeout(()=>{
        Alert.alert("FAILure", 'fail to upload enternet issue!!')  
          setIsPostUrl(false);
          setIsimage(false)
        },2000)
      } else {
        setFileUrl(data.publicUrl);
        setIsPostUrl(true);
        setIsimage(false)


        console.log(' File uploaded. View it here:', data.publicUrl);
      }
    } catch (err) {
      Alert.alert("FAILure", 'enternet is low!!')  
      console.log(' Error during file handling:', err.message);
    }



  };



  const SubmitPostHandle = async () => {
    try {
      const { data, error } = await supabase
        .from('posthouse')
        .insert([
          { user_id: userData.id, title: title, content: content, price: price, location: location, file_url: FileUrl },
        ]);

      if (error) {
        console.error('Error inserting data:', error.message);
      } else {
        console.log('Data inserted successfully:', data);
        navigation.navigate('Home')
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }

  };


  const getlocation = async () => {
    const { data, errors } = await supabase
      .from('houselocation')
      .select("*")

    if (!errors) {
      setGetLocation(data)
      console.log("data Location :", data)

    }
  }



  useEffect(() => {
    getlocation()
  }, [])








  return (
    <View style={[styles.container, { margin: 'auto' }]}>
      <Text style={styles.title}>MakePost</Text>

      <KeyboardAvoidingView behavior='padding'  >


      <TextInput style={Mystyles.input}
        placeholder='Title'
        autoCapitalize='none'
        autoCorrect={false}
        value={title}
        onChangeText={setTitle}

      />



      <TextInput style={[Mystyles.input, { minHeight: 100 }]}
        placeholder='descritions'
        autoCapitalize='none'
        autoCorrect={false}
        value={content}
        onChangeText={setcontent}


      />


      <TextInput style={Mystyles.input}
        placeholder='price'
        autoCapitalize='none'
        autoCorrect={false}
        value={price}
        keyboardType='numeric'
        onChangeText={setprice}

      />



      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Locations</Text>
        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => setlocation(itemValue)}
          style={styles.cate}
        >
          {getLocation.map((item) => (
            <Picker.Item
              key={item.id}
              label={item.location_name}
              value={item.id}
            />
          ))}
        </Picker>


      </View>
      <View>
        <TouchableOpacity  onPress={TakeFileHandle} >
          <Ionicons style={{ alignSelf: 'flex-end' }} name="camera-outline" size={50} color="white" />
        </TouchableOpacity>
      </View>

      {
        IsImage? (<ActivityIndicator/>):( isPostUrl && (<Button title='Post' onPress={SubmitPostHandle} />))
      }


      {/* {
        isPostUrl && (<Button title='Posts' onPress={SubmitPostHandle} />)
      } */}

</KeyboardAvoidingView>
    </View>
  )
}

export default MakePost

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#339'
  },
  pickerContainer: {
    // marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  picker: {
    height: hp("50%"),
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedText: {
    marginTop: 20,
    // fontSize: 16,
    fontStyle: 'italic',
  },
  cate: {
    backgroundColor: '#552',
    borderRadius: 20,
    borderWidth: 3,
    elevation: 20,
    borderTopLeftRadius: 30,
  }
})