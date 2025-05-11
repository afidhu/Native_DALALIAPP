import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert, Pressable } from 'react-native';
// import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Video, ResizeMode } from 'expo-av';
import Modal from 'react-native-modal' // Import react-native-modal
import { UserDataContext } from '../authenticate/UserDataProcider';
import supabase from '@/Supabaseonf';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { View, Text, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
// import { Video, ResizeMode } from 'expo-av';


const AllHouse = ({ locations }) => {

    const { userData } = useContext(UserDataContext)
    const { width } = Dimensions.get('window');
    const ITEM_WIDTH = (width) / 100; // adjust 40 for margin/padding
    const MARGIN_BOTOM = (width) / 10

    const [allhouse, sethouses] = useState<any[]>([])

    const [modal, setModal] = useState(false)
    const [modalValue, setModalValue] = useState(Number)
    const [is_availableHouse, setIsavailableHouse] = useState('')

    console.log(is_availableHouse)
    const setModalHandle = async (item) => {
        setModal(true)
        const { data, error } = await supabase
            .from('posthouse')
            .select("*, houselocation(location_name)")
            .eq('id', item)
            .single();
        if (!error) {
            setModalValue(data)
            setIsavailableHouse(data.is_available)
        }
        else {
            console.log("location id error :", error.message)
        }

    }



    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('posthouse')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    console.log('Error fetching posts:', error.message);
                } else {
                    sethouses(data);
                    console.log('Fetched posts:', data);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
            }
        }


        fetchAllPosts();
    }, []); // 👈 this makes it re-run when location changes




    const locationIhave = async () => {
        if (locations) {
            try {
                const { data, error } = await supabase
                    .from('posthouse')
                    .select('*, houselocation(*)')
                    .eq('location', locations)
                    .order('created_at', { ascending: false });

                if (error) {
                    console.log('Error fetching posts:', error.message);
                } else {
                    sethouses(data);
                    console.log('Fetched posts:', data);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
            }
        }


    }

    useEffect(() => {
        locationIhave()
    }, [locations])




    const unvailablehouse = async (houseId) => {
        console.log(houseId)
        try {
            const { data, error } = await supabase
                .from('posthouse')
                .update({ is_available: "false" })
                .eq('id', houseId)

            if (!error) {
                setModal(false)
                // console.log('Error fetching posts:', data);
            }
        } catch (err) {
            console.error('Unexpected error:', err);
        }

    }




    const vailablehouse = async (houseId) => {
        try {
            const { data, error } = await supabase
                .from('posthouse')
                .update({ is_available: "true" })
                .eq('id', houseId)


            if (!error) {
                setModal(false)
                // console.log('Error fetching posts:', data);
            }
        } catch (err) {
            console.error('Unexpected error:', err);
        }

    }





    //   const fetchAllPost = async () => {

    // if(displayAll){
    //                 try {
    //                     const { data, error } = await supabase
    //                         .from('posthouse')
    //                         .select('*')
    //                         .order('created_at', { ascending: false })
    //                         .limit(3);

    //                     if (error) {
    //                         console.log('Error fetching posts:', error.message);
    //                     } else {
    //                         sethouses(data);
    //                         console.log('Fetched posts:', data);
    //                     }
    //                 } catch (err) {
    //                     console.error('Unexpected error:', err);
    //                 }
    //             }
    //         }
    //     useEffect(() => {

    //     fetchAllPost();
    // }, [displayAll]); // 👈 this makes it re-run when location changes




    return (
        <View  >
            <Text style={{ fontSize: 24, marginVertical: 1, textAlign: 'center' }}>Home</Text>

            <FlatList
                data={allhouse}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                renderItem={({ item }) => {
                    const isImage = item.file_url?.match(/\.(jpeg|jpg|png|gif|webp)$/i);
                    const isVideo = item.file_url?.match(/\.(mp4|mov|webm)$/i);

                    return (
                        <ScrollView   >

                            <TouchableOpacity style={{ width: ITEM_WIDTH, margin: 0 }} onPress={() => setModalHandle(item.id)} >
                                <View style={{ padding: 2, borderWidth: 1, borderRadius: 10, backgroundColor: '#fff' }}>
                                    {/* <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item?.title}</Text>
                                    <Text numberOfLines={2} style={{ fontSize: 12 }}>{item?.content}</Text> */}

                                    {isImage && (
                                        <Image
                                            source={{ uri: item.file_url }}
                                            style={{ width: wp("45%"), height: hp("20%"), marginTop: hp("1%"), borderRadius: 8 }}
                                            resizeMode="cover"
                                        />
                                    )}

                                    {isVideo && (
                                        <Video
                                            source={{ uri: item.file_url }}
                                            style={{ width: '100%', height: 120, marginTop: 10, borderRadius: 8 }}
                                            useNativeControls
                                            resizeMode={ResizeMode.COVER}
                                            isLooping
                                            shouldPlay={false}
                                            isMuted={false}
                                        />
                                    )}
                                </View>
                            </TouchableOpacity>

                        </ScrollView>


                    );
                }}
                contentContainerStyle={{ paddingBottom: 300 }}
                showsVerticalScrollIndicator={true}
                scrollToOverflowEnabled={true}
                scrollEnabled={true}

            />


            <Modal
                isVisible={modal}
                onSwipeComplete={() => setModal(false)} // Close modal on swipe down
                swipeDirection="down" // Enable swipe down gesture
                onBackdropPress={() => setModal(false)} // Close modal when tapping outside
                style={{ justifyContent: 'flex-end', margin: 0 }} // Position modal at the bottom
            >

                <View style={styles.modal}>
                    <TouchableOpacity   >
                        <View style={{ marginLeft: 20 }}>
                            <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, backgroundColor: '#fff' }}>
                                {modalValue && (
                                    <Image
                                        source={{ uri: modalValue?.file_url }}
                                        style={{ width: '100%', height: 120, marginTop: 10, borderRadius: 8 }}
                                        resizeMode="cover"
                                    />
                                )}


                            </View>
                            <View style={styles.textV} >
                                <Text style={styles.textItm} >price: {modalValue.price} </Text>
                                <Text style={styles.textItm}>Mob:+234545454</Text>
                                <Text style={styles.textItm}>Location:{modalValue?.houselocation?.location_name}</Text>
                                <Text style={styles.textItm}>
                                    Available:
                                    <Text
                                        style={{
                                            backgroundColor: is_availableHouse === "true" ? '#576' : 'red',
                                            color: 'white',
                                            paddingHorizontal: 5,
                                            borderRadius: 5,

                                        }}
                                    >
                                        {modalValue.is_available}
                                    </Text>
                                </Text>
                                {/* is_availableHouse */}
                            </View>
                        </View>
                    </TouchableOpacity>
                    {
                        modalValue?.user_id === userData?.id ? (<View style={styles.avBtn}>

                            {
                                is_availableHouse === 'true' ? (<TouchableOpacity style={styles.un_av} onPress={() => unvailablehouse(modalValue?.id)}  >
                                    <Text style={styles.unav}  >Sold Out</Text>
                                </TouchableOpacity   >) : (<TouchableOpacity style={styles.un_av} onPress={() => vailablehouse(modalValue?.id)}  >
                                    <Text style={styles.unav}  >Resume</Text>
                                </TouchableOpacity>)
                            }
                        </View>) : null
                    }



                </View>
            </Modal>
        </View>
    );
}
export default AllHouse

const styles = StyleSheet.create({
    text: {
        color: 'white',
        backgroundColor: 'green',
        marginTop: 29,
        alignContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        borderColor: 'white',
        borderRadius: 30,
        borderWidth: 2,
        elevation: 50

    },
    category: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#345',
        color: 'white',
        marginTop: 6,
        borderRadius: 10,
        alignItems: 'center',
        alignContent: 'center',
        // marginHorizontal:'auto'




    },
    textView: {
        justifyContent: 'center',
        marginTop: 20,
        alignItems: 'center',
        width: 400,
        backgroundColor: 'plum',
        height: 90,
        alignContent: 'center',
        elevation: 20


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
        paddingHorizontal: 20,
        marginLeft: 10
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
        marginTop: 20,
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
        paddingHorizontal: 29,
        padding: 2,
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
        marginRight: 10,
        elevation: 40,
        borderColor: 'red'
    },
    left: {
        alignSelf: 'flex-start',
        marginTop: 5,
        marginLeft: 20,
        color: '#900',
        fontWeight: 'bold',
        fontSize: 15,
        //  backgroundColor:'#000'

    },
    modal: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 20,
        marginTop: 200,
        borderRightColor: 'greeen',
        // borderTopEndRadius:40,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,

    },
    avBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent:'space-between'
        marginTop: 10,
    },
    un_av: {
        padding: 10
    },
    av: {
        backgroundColor: 'green'
    },
    unav: {
        fontSize: 20,
        fontWeight: 'bold',
        borderWidth: 3,
        borderRadius: 10,
        color: 'white',
        elevation: 20,
        borderColor: '#3773',
        backgroundColor: '#545'
    },
})