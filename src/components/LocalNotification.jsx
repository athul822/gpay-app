// Install required package first:
// npm install @notifee/react-native

import notifee, { AndroidImportance } from '@notifee/react-native';
import React, { useEffect } from 'react';
import { View, Button, Platform } from 'react-native';

const NotificationComponent = () => {
  useEffect(() => {
    // Request permissions on iOS
    const requestUserPermission = async () => {
      if (Platform.OS === 'ios') {
        await notifee.requestPermission();
      }
    };

    requestUserPermission();
    // Set up foreground handler
    return notifee.onForegroundEvent(({ type, detail }) => {
      console.log('Foreground event:', type, detail);
    });
  }, []);

  // Function to send a basic notification
  const sendBasicNotification = async (data) => {
    console.log(data,"insidenot");
    
    try {
      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      // Display notification
      await notifee.displayNotification({
        title: data,
        body: 'Main body content of the notification',
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'default',
          },
        },
        ios: {
          // iOS specific options
          categoryId: 'default',
        },
      });
    } catch (error) {
      console.log('Error sending notification:', error);
    }
  };

  // Function to send a scheduled notification
  const scheduleNotification = async () => {
    try {
      // Create a channel
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      // Create a time-based trigger
      const trigger = {
        type: 'timestamp',
        timestamp: Date.now() + 5000, // Schedule for 5 seconds from now
      };

      // Schedule notification
      await notifee.createTriggerNotification(
        {
          title: 'Scheduled Notification',
          body: 'This notification was scheduled!',
          android: {
            channelId,
          },
        },
        trigger,
      );
    } catch (error) {
      console.log('Error scheduling notification:', error);
    }
  };

  // Function to cancel all notifications
  const cancelAllNotifications = async () => {
    await notifee.cancelAllNotifications();
  };

  return (
    {
      sendBasicNotification
    }
  );
};

export default NotificationComponent;