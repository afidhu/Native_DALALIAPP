import { Alert, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import supabase from '@/Supabaseonf'
import AllHouse from './AllHouse'
import { Video, ResizeMode } from 'expo-av';
import Modal from 'react-native-modal' // Import react-native-modal

const Location = () => {

    const [alllocations, setalllocations] = useState([])
    const [getLocationId, setGetLocationId] = useState('')


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
        // console.log("item", item)
    }

        // Alert.alert("ok",`${getLocationId}` )
        // console.log(getLocationId
    





    const { width } = Dimensions.get('window');
    const ITEM_WIDTH = (width) / "100%"; // adjust 40 for margin/padding
    const MARGIN_BOTOM = (width) / 10

    const [allhouse, sethouses] = useState([])

    const [modal, setModal] = useState(false)
    const [modalValue, setModalValue] = useState(null)


    const setModalHandle = async (item) => {
        setModal(true)
        setModalValue(item)
    }






        const fetchAllPosts = async () => {
            if (getLocationId) {

            try {
                const { data, error } = await supabase
                    .from('posthouse')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(3)

                // .eq('user_id', userId); // Filter by user_id if needed

                if (error) {
                    console.log('Error fetching posts:', error.message);
                } else {
                    sethouses(data);
                    console.log('Fetched posts:', data);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
            }
        };
    }


useEffect(()=>{
    fetchAllPosts();
})


    return (
        <View>
            <Text>Location</Text>


            <FlatList
                data={alllocations}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableOpacity style={styles.itemView} >
                                {/* <Text style={styles.item} >All</Text> */}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => GotLocationId(item.id)} style={styles.itemView} >
                                <Text style={styles.item} > {item.location_name}</Text>
                            </TouchableOpacity>

                        </View>
                    )
                }}
            />

{
    getLocationId && (
        <View  >
        <Text style={{ fontSize: 24, marginVertical: 10, textAlign: 'center' }}>Home</Text>

        <FlatList
            data={allhouse}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => {
                const isImage = item.file_url?.match(/\.(jpeg|jpg|png|gif|webp)$/i);
                const isVideo = item.file_url?.match(/\.(mp4|mov|webm)$/i);

                return (
                    <ScrollView  >                            <TouchableOpacity style={{ width: ITEM_WIDTH, margin: 5 }}>
                        <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, backgroundColor: '#fff' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item?.title}</Text>
                            <Text numberOfLines={2} style={{ fontSize: 12 }}>{item?.content}</Text>

                            {isImage && (
                                <Image
                                    source={{ uri: item.file_url }}
                                    style={{ width: '100%', height: 120, marginTop: 10, borderRadius: 8 }}
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
                        <TouchableOpacity style={{ width: ITEM_WIDTH, margin: 5 }}>
                            <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, backgroundColor: '#fff' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item?.title}</Text>
                                <Text numberOfLines={2} style={{ fontSize: 12 }}>{item?.content}</Text>

                                {isImage && (
                                    <Image
                                        source={{ uri: item.file_url }}
                                        style={{ width: '100%', height: 120, marginTop: 10, borderRadius: 8 }}
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
                        <TouchableOpacity style={{ width: ITEM_WIDTH, margin: 5 }}>
                            <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, backgroundColor: '#fff' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item?.title}</Text>
                                <Text numberOfLines={2} style={{ fontSize: 12 }}>{item?.content}</Text>

                                {isImage && (
                                    <Image
                                        source={{ uri: item.file_url }}
                                        style={{ width: '100%', height: 120, marginTop: 10, borderRadius: 8 }}
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
                        <TouchableOpacity style={{ width: ITEM_WIDTH, margin: 5 }}>
                            <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, backgroundColor: '#fff' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item?.title}</Text>
                                <Text numberOfLines={2} style={{ fontSize: 12 }}>{item?.content}</Text>

                                {isImage && (
                                    <Image
                                        source={{ uri: item.file_url }}
                                        style={{ width: '100%', height: 120, marginTop: 10, borderRadius: 8 }}
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
                        <TouchableOpacity style={{ width: ITEM_WIDTH, margin: 5 }}>
                            <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, backgroundColor: '#fff' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item?.title}</Text>
                                <Text numberOfLines={2} style={{ fontSize: 12 }}>{item?.content}</Text>

                                {isImage && (
                                    <Image
                                        source={{ uri: item.file_url }}
                                        style={{ width: '100%', height: 120, marginTop: 10, borderRadius: 8 }}
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
                        <TouchableOpacity style={{ width: ITEM_WIDTH, margin: 5 }}>
                            <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, backgroundColor: '#fff' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item?.title}</Text>
                                <Text numberOfLines={2} style={{ fontSize: 12 }}>{item?.content}</Text>

                                {isImage && (
                                    <Image
                                        source={{ uri: item.file_url }}
                                        style={{ width: '100%', height: 120, marginTop: 10, borderRadius: 8 }}
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


                        <TouchableOpacity style={{ width: ITEM_WIDTH, margin: 5 }}>
                            <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, backgroundColor: '#fff' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item?.title}</Text>
                                <Text numberOfLines={2} style={{ fontSize: 12 }}>{item?.content}</Text>

                                {isImage && (
                                    <Image
                                        source={{ uri: item.file_url }}
                                        style={{ width: '100%', height: 120, marginTop: 10, borderRadius: 8 }}
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
                        <TouchableOpacity style={{ width: ITEM_WIDTH, margin: 5 }}>
                            <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, backgroundColor: '#fff' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item?.title}</Text>
                                <Text numberOfLines={2} style={{ fontSize: 12 }}>{item?.content}</Text>

                                {isImage && (
                                    <Image
                                        source={{ uri: item.file_url }}
                                        style={{ width: '100%', height: 120, marginTop: 10, borderRadius: 8 }}
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
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', padding: 20, marginTop: 200 }}>
                <TouchableOpacity   >
                    <View style={{ marginLeft: 20 }}>
                        <Image style={styles.img} source={require('../../assets/images/house2.jpg')} />
                        <View style={styles.textV} >
                            <Text style={styles.textItm} >price: $200 </Text>
                            <Text style={styles.textItm}>Mob:+234545454</Text>
                            <Text style={styles.textItm}>Location:</Text>
                            <Text style={styles.textItm}>Available:</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Text>Value: {modalValue}</Text>
            </View>
        </Modal>
    </View>
    )
}





        </View>
    )
}

export default Location

const styles = StyleSheet.create({
    text: {
        color: 'white',
        backgroundColor: 'green',
        // marginTop:29,
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

    }
})