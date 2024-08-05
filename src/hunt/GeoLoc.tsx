import React, { useEffect, useState } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import styled from 'styled-components';

const GeoLoc = () => {
    const [location, setLocation] = useState(null);

    const hasLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const hasPermission = await Geolocation.requestAuthorization('whenInUse');
            return hasPermission === 'granted';
        }

        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        return status === PermissionsAndroid.RESULTS.GRANTED;
    };

    const getLocation = async () => {
        const hasPermission = await hasLocationPermission();

        if (!hasPermission) {
            return;
        }

        Geolocation.getCurrentPosition(
            (info) => {
                setLocation(info.coords);
                console.log(info);
            },
            (error) => {
                console.error(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    useEffect(() => {
        const watchId = Geolocation.watchPosition(
            (info) => {
                setLocation(info.coords);
                console.log(info);
            },
            (error) => {
                console.error(error);
            },
            { enableHighAccuracy: true, distanceFilter: 1, interval: 3000, fastestInterval: 2000 }
        );

        // Clear the watch when the component is unmounted
        return () => Geolocation.clearWatch(watchId);
    }, []);

    return (
        <Container>
            {location ? (
                <Text>Latitude: {location.latitude}, Longitude: {location.longitude}</Text>
            ) : (
                <Text>Getting Location...</Text>
            )}
            <Button title="Get Location" onPress={getLocation} />
        </Container>
    );
};

export default GeoLoc;

const Container = styled.View`
    flex: 1;
   
    align-items: center;
    justify-content: center;
`;
