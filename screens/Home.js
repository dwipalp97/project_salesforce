import React, { useEffect, useState } from 'react';
import { SafeAreaView, PermissionsAndroid, View, FlatList, StyleSheet, Text, StatusBar, Alert, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const Home = (props) => {
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "SalesForceTest App Camera Permission",
          message:
            "SalesForceTest App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera({
          mediaType: "photo",
          quality: 1,
          cameraType: "back",
          includeExtra: true,
          saveToPhotos: false
        }, (imageRes) => showImagePreview(imageRes));
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const showImagePreview = (imageRes) => {
    if(imageRes != undefined && !imageRes.didCancel){
      props.navigation.navigate("ImagePreview", { imageDetails: imageRes })
    }
  }

  const onOpenCameraClick = () => {
    requestCameraPermission();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Capture Image</Text>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnbg}>
          <Text style={styles.title}>Open Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnbg} onPress={onOpenCameraClick}>
          <Text style={styles.title} >Open Camera</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  header:{
    fontSize: 16,
    color: "#000",
    fontWeight: '500',
    marginBottom:20,
  },
  btnContainer: {
    flexDirection: 'row',
  },
  btnbg: {
    borderRadius: 10,
    backgroundColor: "#1976D2",
    borderColor: "#000",
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flex: 0.5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 14,
    color: "#fff",
    fontWeight: '500'
  },
});

export default Home;