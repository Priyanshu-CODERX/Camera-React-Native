import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';
import RNFlash from 'react-native-flash';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(false);
  const [flashMode, setFlashMode] = useState("off");
  

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [])

  const FlipCam = () => {
    setType(type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back);
  }

  const flash = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
      console.log(flashMode)
    } if (flashMode === 'off') {
      setFlashMode('on')
      console.log(flashMode)
    } else {
      setFlashMode('auto')
      console.log(flashMode)
    }
  }

  const clickPicture = async () => {
    if(this.camera) {
      let photo = await this.camera.takePictureAsync();
      console.log(photo)
      setImagePreview(true)
      setImageUrl(photo)
    }
  }

  const __retakePicture = () => {
    setImageUrl(null)
    setImagePreview(false)
  }

  if(hasPermission === null){
    return <View/>
  }
  if(hasPermission === false) {
    return <Text>Please Provide Camera Access</Text>
  }

  const CameraPreview = () => {
  console.log(imageUrl)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{uri: imageUrl.uri}}
        style={{
          flex: 1
        }}/>
      <TouchableOpacity onPress={__retakePicture}>
        <Text style={styles.text}>Re-Take</Text>
      </TouchableOpacity>
    </View>
  )
}

  return (
    (imagePreview) ? (<CameraPreview/>) : (
    <View style={styles.container}>
      <Camera flashMode={flashMode} ref={ref => {
        this.camera = ref
      }} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.capture}
            onPress={flash}>
            <Icon1 name="flashlight" color="#fff" style={{fontSize: 40}}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.capture}
            onPress={FlipCam}>
            <Icon name="rotate-right" color="#fff" style={{fontSize: 40}}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.capture} onPress={clickPicture}>
            <Icon name="camera" color="#fff" style={{fontSize: 40}}/>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  ))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  capture: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
