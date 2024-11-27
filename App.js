/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {Button, Text,TextInput,TouchableOpacity,View} from 'react-native';
import { StyleSheet } from 'react-native';


function App(){

  const [data, setData] = useState(null)
  const [totalSolved,setTotalSolved] = useState(0)
  const [easy,setEasy] = useState(0)
  const [medium,setMedium] = useState(0)
  const [hard,setHard] = useState(0)

  const fetchData = async()=>{
    let response = await axios.get("https://leetcode-stats-api.herokuapp.com/Sudhir_Ghagare")
    console.log('resposnseData: ', response.data)
    setData(response.data)
    setTotalSolved(response.data.totalSolved)
    setEasy(response.data.easySolved)
    setMedium(response.data.mediumSolved)
    setHard(response.data.hardSolved)
    console.log(totalSolved)
  }

  useEffect(() =>{
    fetchData()
  },[])

  return (
    <View style = {{flex : 1,backgroundColor:'#FFFFE0'}}>

      {/* Header Start from here */}
      <View style = {{alignItems:'center', margin:25}}>
      <Text style = {{fontSize:25,fontWeight:'Bold', fontFamily:'sans-serif-medium', color: '#333333'}}>Leetcode Profile</Text>
      </View>
      {/* Header end here */}

      <View style = {{flexDirection: 'row'}}>

        <TextInput style = {styles.textInput} placeholder='Enter user-name here'></TextInput>
        <TouchableOpacity style = {styles.button}>
          <Text style = {{margin:2, color: '#ffffff'}}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.button}>
          <Text style = {{margin:2, color: '#ffffff'}}>Clear</Text>
        </TouchableOpacity>
      </View>

    </View>
    
  );

}

const styles = StyleSheet.create({

  textInput : {
    flex: 1,                
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: '#AEC6CF',        
    padding: 10,
    marginStart : 12
  },
  button: {
    margin: 8,
    height:35,
    padding:4,
    backgroundColor: '#E91E63',
    borderWidth:1,
    borderRadius:5
  }

})

export default App;
