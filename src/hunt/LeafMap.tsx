import React from 'react';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';

const LeafMap = () => {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Leaflet Map</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
        <style>
            body, html, #map {
                height: 100%;
                margin: 0;
                padding: 0;
            }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            const getRandomCoordinate = (lat, lng, radius) => {
                const randomAngle = Math.random() * 2 * Math.PI;
                const randomRadius = Math.random() * radius;
                const deltaLat = randomRadius * Math.cos(randomAngle) / 111320; // Convert meters to degrees
                const deltaLng = randomRadius * Math.sin(randomAngle) / (111320 * Math.cos(lat * Math.PI / 180)); // Adjust for latitude
                return [lat + deltaLat, lng + deltaLng];
            };

            const specificPoint = [8.54772519, 76.92107351];
            const circleRadius = 100; // Radius in meters

            const circleCenter = getRandomCoordinate(specificPoint[0], specificPoint[1], circleRadius);

            const map = L.map('map').setView(circleCenter, 18);

            const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            // Adding a circle with the calculated center and specific radius
            L.circle(circleCenter, {
                color: 'blue',
                fillColor: 'blue',
                fillOpacity: 0.5,
                radius: circleRadius
            }).addTo(map);

            // Adding a marker at the specific point
            // L.marker(specificPoint).addTo(map)
            //     .bindPopup('Specific Point')
            //     .openPopup();

            map.on('locationfound', function(e) {
                const radius = e.accuracy / 2;

                L.marker(e.latlng).addTo(map)
                    .bindPopup("You are within " + radius + " meters from this point").openPopup();

                L.circle(e.latlng, radius).addTo(map);
            });

            map.on('locationerror', function(e) {
                // alert(e.message);
            });

            map.locate({ setView: true, maxZoom: 16 });
        </script>
    </body>
    </html>
    `;

    return (
        <Container>
            <WebView
                originWhitelist={['*']}
                source={{ html }}
                style={{ flex: 1 }}
                onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    // console.warn('WebView error: ', nativeEvent);
                }}
            />
        </Container>
    );
};

const Container = styled.View`
  flex: 1;
`;

export default LeafMap;
