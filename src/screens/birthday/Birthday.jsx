import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NotificationComponent from '../../components/LocalNotification';
import {getApiData} from '../../action/api';
import KeepAwake from 'react-native-keep-awake'; // Add this import

const Birthday = () => {
  const [init, setInit] = useState(false);
  const [initialCount, setInitialCount] = useState([]);
  const [baselineLikeCount, setBaselineLikeCount] = useState(null);
  const [finalResult, setFinalResult] = useState(null);
  const {sendBasicNotification} = NotificationComponent();

  // Initial API call to get dobInitialcount
  useEffect(() => {
    KeepAwake.activate();
    const fetchInitialCount = async () => {
      try {
        const resp = await getApiData('/dobInitialcount');
        console.log('Initial count response:', resp);
        if (resp) {
          setInitialCount(resp);
          setInit(true);
        }
      } catch (err) {
        console.error('Error fetching initial count:', err);
        setInit(false);
      }
    };

    fetchInitialCount();

    return () => {
      KeepAwake.deactivate();
    };
  }, []);

  // Set up polling for flagLikeCount
  useEffect(() => {
    let intervalId;

    const startPolling = async () => {
      try {
        // Get initial like count first
        const initialResponse = await getApiData('/flagLikeCount');
        const initialLikeCount = initialResponse.likesCount;
        setBaselineLikeCount(initialLikeCount);
        console.log('Initial like count:', initialLikeCount);

        // Start polling to check for changes
        intervalId = setInterval(async () => {
          try {
            const response = await getApiData('/flagLikeCount');
            const currentLikeCount = response.likesCount;
            console.log(
              'Current like count:',
              currentLikeCount,
              'Baseline:',
              baselineLikeCount,
            );

            // Only proceed if we have a baseline and current count is different
            if (
              baselineLikeCount !== null &&
              currentLikeCount !== baselineLikeCount
            ) {
              console.log('Like count changed, stopping poll');
              clearInterval(intervalId);

              // Make the final POST request
              try {
                const result = await fetch('/dobGetResult', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({initialCount}),
                });
                const data = await result.json();
                setFinalResult(data);
                console.log('Final result:', data);
              } catch (error) {
                console.error('Error posting result:', error);
              }
            }
          } catch (error) {
            console.error('Error polling flagLikeCount:', error);
          }
        }, 2000); // Poll every second
      } catch (error) {
        console.error('Error getting initial like count:', error);
      }
    };

    if (init) {
      startPolling();
    }

    // Cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [init, initialCount, baselineLikeCount]);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
        hidden={false}
      />
      <ImageBackground
        source={require('../../assets/landing-screen.jpg')}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          resizeMode: 'cover',
          gap: 10,
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            backgroundColor: init ? 'green' : 'red',
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
            height: 15,
            width: 15,
            top: 15,
            left: 110,
            borderRadius: 50,
          }}></TouchableOpacity>
      </ImageBackground>
    </>
  );
};

export default Birthday;
