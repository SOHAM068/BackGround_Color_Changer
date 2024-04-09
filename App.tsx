import {StatusBar, StyleSheet, Text, TouchableOpacity, View, Share} from 'react-native'
import React from 'react'
import { useState } from 'react';
import { Clipboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';


export default function App() : JSX.Element {
  const [randomBackgroundColor, setRandomBackgroundColor] = useState('#ffffff');
  const backgroundColorGenerator = () => {
    let color = '#'
    let hexRange = '0123456789ABCDEF'

    for (let i = 0; i < 6; i++) {
      color += hexRange[Math.floor(Math.random() * 16)]
    }
    setRandomBackgroundColor(color)
  }
  const CopyBackgroundColor = () => {
    Clipboard.setString(randomBackgroundColor);
    console.log('Background color copied to clipboard!');
  }
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Background color copied to clipboard!',
    });
  }
  const shareBackgroundColor = async () => {
    try {
      const result = await Share.share({
        message: `Background color: ${randomBackgroundColor}`,
      });

      if (result.action === Share.sharedAction) {
        showToast();
      } else if (result.action === Share.dismissedAction) {
        console.log('Share operation dismissed');
      }
    } catch (error: any) {
      console.error('Error sharing background color:', error.message);
    }
  };
  const handlePress = () => {
    CopyBackgroundColor();
    showToast();
  }
  return (
    <>
    <StatusBar backgroundColor={randomBackgroundColor}/>
    <View style={[styles.container, {backgroundColor: randomBackgroundColor}]}>
      <TouchableOpacity
        onPress={backgroundColorGenerator}
      >
        <View style={styles.touchButton}>
          <Text style={styles.touchButtonTxt}>Press Me</Text>
          <Text style={{color:'red'}}>{randomBackgroundColor}</Text>
        </View>
      </TouchableOpacity>
    </View>
    <TouchableOpacity
        onPress={handlePress}
        style={styles.copyButton}
      >
        <Icon name = 'copy' size = {30} color = '#000' />
      </TouchableOpacity>
    <TouchableOpacity
        onPress={shareBackgroundColor}
        style={styles.copyButton2}
      >
        <Icon name = 'share-nodes' size = {30} color = '#000' />
      </TouchableOpacity>
      <Toast
        position='top'
        bottomOffset={20}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  touchButton:{
    backgroundColor: '#0077b6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 8,
  },
  touchButtonTxt:{
    color: '#fff',
    fontSize: 18,
  },
  copyButton:{
    position: 'absolute',
    bottom: 20,
    right: 20,
    // backgroundColor: '#0077b6',
    paddingHorizontal: 15,
    paddingVertical: 6,
    // borderRadius: 5,
    // elevation: 8,
  },
  copyButton2:{
    position: 'absolute',
    bottom: 20,
    right: 70,
    // backgroundColor: '#0077b6',
    paddingHorizontal: 15,
    paddingVertical: 6,
    // borderRadius: 5,
    // elevation: 8,
  },
})