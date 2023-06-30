"use client"

import React, { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { redIcon } from "@/constants"

const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);
    const minRadius = 30;

    const map = useMap();

    useEffect(() => {
        // Create a marker instance
        const marker = L.marker([0, 0]);
        marker.setIcon(redIcon);

        let circle;

        function handleLocationFound(e) {
            const { latlng, accuracy, bounds } = e;

            // Update the marker position
            marker.setLatLng(latlng);

            // Fly to the new location
            map.flyTo(latlng, map.getZoom());

            // Remove the existing circle from the map
            if (circle) {
                map.removeLayer(circle);
            }

            // Add the marker to the map
            marker.addTo(map);

            // Set the accuracy radius as a circle around the marker
            const radius = minRadius > accuracy ? minRadius : accuracy;
            circle = L.circle(latlng, radius);
            circle.addTo(map);

        }

        map.locate().on("locationfound", handleLocationFound);

        return () => {
            map.stopLocate(); // Clean up: Stop locating when the component unmounts
            map.off("locationfound", handleLocationFound); // Clean up: Remove the event listener
            map.removeLayer(marker); // Clean up: Remove the marker from the map
            if (circle) {
                map.removeLayer(circle); // Clean up: Remove the circle from the map
            }
        };
    }, [map]);
}

export default LocationMarker