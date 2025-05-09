import { SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import supabase from '@/Supabaseonf'


const AllAgent = () => {

    const [agents, setAgents] = useState<any[]>([])
    // const[agentStatus, setAgentStatus]=useState('')


    const displayAllAgent = async () => {

        const { data, error } = await supabase
            .from('agentaccounthouse')
            .select('*') // Fetch username from auth.user table
            .order('created_at', { ascending: false })

        if (!error) {
            console.log("all gent are:", data)
            setAgents(data)

        }
        UpdateAgentHandle(item)
    }

    useEffect(() => {
        displayAllAgent()

    }, [])


    const UpdateAgentHandle = async (item) => {
        await supabase
            .from('agentaccounthouse')
            .update({ status: 'approved' })
            .eq('id', item)
        console.log("it", item)
    }




    return (
        <View>
            <Text   style={styles.header} >All Agents Active</Text>
            <SectionList
                sections={agents.map(agent => ({ title: agent.username, data: [agent] }))}
                renderItem={({ item }) => {
                    return (
                        <View style={{flex:1}}  >
                            <View  style={styles.textV} >    <Text   style={styles.text} >Phone: {item.phone}</Text></View>
                            <View  style={styles.textV} >    <Text style={styles.text} >lencense: {item.lencense}</Text></View>
                            <View    style={styles.textV} >
                                <TouchableOpacity style={styles.btn}  onPress={() => UpdateAgentHandle(item.id)}  >
                                    <Text    style={styles.textstatus} >{item.status}</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )
                }}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.stySect}>{section.title}</Text>
                )}
                SectionSeparatorComponent={() => <View style={{ height: 20 }} />}
            />
        </View>
    )
}

export default AllAgent

const styles = StyleSheet.create({
    textV: {
     justifyContent:'center',
    //  margin:'auto'
    alignContent:'center',
    marginHorizontal:15
    },

    text: {
        alignContent:'center',
        fontFamily:'arial',
        fontSize:20,
        fontWeight:'bold',
        
    },
    textstatus:{
    color:'#e33',
    justifyContent:'flex-end',
    alignContent:'center',
    fontFamily:'arial',
    fontSize:20,
    fontWeight:'bold',
    },
    btn:{
        alignSelf:'flex-end',
        justifyContent:'flex-end',
        alignContent:'center',
        alignItems:'center',
        elevation:20,
        borderBlockColor:'green',
        borderRadius:29,
        borderWidth:2,
        borderColor:'yellow',

    },
    stySect:{
        height:35,
        fontSize:29,
        alignContent:'center',
        marginHorizontal:30,
        color:'midnightblue',
    },
    header:{
        alignContent:'center',
        fontFamily:'arial',
        fontSize:20,
        fontWeight:'bold',
        margin:'auto',
        color:'purple',
        backgroundColor:'white',
        marginVertical:9
    }

})