import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";

const ALUBUM_NAME = "develop";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [picture, setPicture] = useState(null);
  const [isCameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const onCameraReady = () => {
    setCameraReady(true);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (camera) {
      const image = await camera.takePictureAsync();
      setPicture(image.uri);
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const album = await MediaLibrary.getAlbumAsync(ALUBUM_NAME);
        const asset = await MediaLibrary.createAssetAsync(image.uri);
        if (album) {
          await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
        } else {
          await MediaLibrary.createAlbumAsync(ALUBUM_NAME, asset, false);
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {picture ? (
          <Image source={{ uri: picture }} style={{ flex: 1 }} />
        ) : (
          <Camera
            type={type}
            style={{ flex: 1 }}
            ref={(ref) => {
              setCamera(ref);
            }}
            onCameraReady={onCameraReady}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        {picture ? (
          <TouchableOpacity onPress={() => setPicture(null)}>
            <Ionicons name="ios-camera-outline" size={40} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={isCameraReady}
            style={styles.cameraButton}
            onPress={takePicture}
          />
        )}
        <TouchableOpacity
          onPress={() => {
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            );
          }}
        >
          <Ionicons name="ios-camera-reverse-sharp" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    height: 60,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  cameraButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "black",
  },
});
