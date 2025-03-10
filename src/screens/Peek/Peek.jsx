// App.js
import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Camera, useCameraDevice, useFrameProcessor } from 'react-native-vision-camera';
import TextRecognition from '@react-native-ml-kit/text-recognition';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Peek = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [detectedTexts, setDetectedTexts] = useState([]);
  const [isScanning, setIsScanning] = useState(true);
  
  const device = useCameraDevice('back');
  const camera = useRef(null);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    setHasPermission(newCameraPermission === 'authorized');
  };

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    if (!isScanning) return;
    console.error('Text detection error:not scanning');
    try {
      const result = TextRecognition.recognize(frame);
      if (result && result.blocks) {
        const textBlocks = result.blocks.map(block => ({
          text: block.text,
          bounds: {
            x: block.frame.x,
            y: block.frame.y,
            width: block.frame.width,
            height: block.frame.height
          },
          timestamp: Date.now()
        }));

        // runOnJS(updateDetectedTexts)(textBlocks);
      }
    } catch (error) {
      console.error('Text detection error:', error);
    }
  }, [isScanning]);

  const updateDetectedTexts = (newBlocks) => {
    setDetectedTexts(prevTexts => {
      const currentTime = Date.now();
      const recentTexts = prevTexts.filter(
        text => currentTime - text.timestamp < 2000
      );

      return [...recentTexts, ...newBlocks]
        .filter((text, index, self) => 
          index === self.findIndex(t => 
            t.text === text.text && 
            Math.abs(t.bounds.x - text.bounds.x) < 10
          )
        )
        .slice(-5);
    });
  };

  const clearDetections = () => {
    setDetectedTexts([]);
    setIsScanning(true);
  };

//   if (!hasPermission) {
//     return (
//       <View style={styles.container}>
//         <Text>No camera permission</Text>
//       </View>
//     );
//   }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>No camera device found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={10}
      />

      <View style={styles.detectionOverlay}>
        {detectedTexts.map((textBlock, index) => (
          <View
            key={`${textBlock.text}-${index}`}
            style={[
              styles.textHighlight,
              {
                left: textBlock.bounds.x,
                top: textBlock.bounds.y,
                width: textBlock.bounds.width,
                height: textBlock.bounds.height,
              }
            ]}
          />
        ))}
      </View>

      <View style={styles.results}>
        {detectedTexts.length > 0 ? (
          detectedTexts.map((textBlock, index) => (
            <Text key={index} style={styles.detectedText}>
              {textBlock.text}
            </Text>
          ))
        ) : (
          <Text style={styles.instructionText}>
            Point camera at card with text
          </Text>
        )}
        
        <TouchableOpacity 
          style={styles.button}
          onPress={clearDetections}
        >
          <Text style={styles.buttonText}>Clear & Scan Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  detectionOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  textHighlight: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#00ff00',
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },
  results: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  },
  detectedText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Peek;