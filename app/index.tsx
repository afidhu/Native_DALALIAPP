
// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';

import HomeScreen from '@/componets/screen/HomeScreen';
import ProfileScreen from '@/componets/screen/ProfileScreen';
import Welcome from '@/componets/pages/Welcome';
import Login from '@/componets/authenticate/Login';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import Signup from '@/componets/authenticate/Signup';
import Setting from '@/componets/screen/Setting';
import HouseDetail from '@/componets/pages/HouseDetail';
import MakePost from '@/componets/pages/MakePost';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AgentCreateAccount from '@/componets/Agent/AgentCreateAccount';



import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserDataContext } from '@/componets/authenticate/UserDataProcider';
import { useContext } from 'react';
import AllAgent from '@/componets/Agent/AllAgent';
import { useNavigation } from 'expo-router';
import Logouts from '@/componets/authenticate/Logouts';

import 'react-native-url-polyfill/auto'
import { Buffer } from 'buffer'


const Stack = createNativeStackNavigator();

function MyStack() {
  const{userData} = useContext(UserDataContext)


  const navigation = useNavigation()


  
  return (
    <Stack.Navigator initialRouteName="Welcome"
      screenOptions={{
        statusBarBackgroundColor: 'darkblue',
        headerStyle: { backgroundColor: '#3442' },
        contentStyle: { backgroundColor: '#31f4' },
    // headerRight: () => {
    //   if (userData) {
    //     return (
    //       <View style={{ flexDirection: 'row' }}>
    //         <Text>Hello</Text>
    //         <TouchableOpacity onPress={()=>{}}>
    //           <Image style={styles.img} source={require('.././assets/images/profileDefault.jpg')} />
    //         </TouchableOpacity>
    //       </View>
    //     );
    //   }
    //   return null;
    // }
  

         
      
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} 
      options={{
        headerShadowVisible:false,
        headerShown:false
      }}

      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Welcome" component={Welcome} 
      options={{
        headerLeft:() => (
          <Text></Text>
        )
      }}
      />
      <Stack.Screen name="Login" component={Login}  
      options={{
        headerShadowVisible:false,
        headerShown:false
      }}
      
      />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Detail" component={HouseDetail} />
      <Stack.Screen name="makepost" component={MakePost} />
      <Stack.Screen name="allagent" component={AllAgent} />
      <Stack.Screen name="agentcreateaccount" component={AgentCreateAccount} 
      
      options={{

        title:'Bussiness Account',
        headerTitleStyle:{
          color:'red',
        }
      }}
      />
    </Stack.Navigator>
  );
}




// const Drawer = createDrawerNavigator();



// function MyDrawer() {
//   return (
//     <Drawer.Navigator>
//             {/* <Drawer.Screen name="Dashboard" component={MyStack} 
//       options={{
//         headerShadowVisible:false,
//         // headerShown:false
//       }}
      
//       /> */}
//       <Drawer.Screen name="Home" component={MyStack} 
//       options={{
//         headerShadowVisible:false,
//         headerShown:false
//       }}
      
//       />
//       <Drawer.Screen name="Profile" component={ProfileScreen} />
//       <Drawer.Screen name="Setting" component={Setting} />
//     </Drawer.Navigator>
//   );
// }

export default function Index() {
  return (
  <MyStack/>
  );
}

const styles=StyleSheet.create({
  img:{
width:50,
height:50
  }
})