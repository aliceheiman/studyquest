"use client";

// REACT
import React, { useEffect, useState } from "react";

// LEAFLET IMPORTS
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { blueIcon, grayIcon, redIcon } from "@/constants"

// CUSTOM IMPORTS
import { CustomButton, LocationMarker } from '.'

const MapPicker = ({ accessToken, markers, setMarkers, targetMarkers }) => {


    // SETUP
    const position = [59.329323, 18.068581]
    const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`

    let markersLeft = targetMarkers - markers.length

    // START: EVENT HANDLERS

    const handleMapClick = (e) => {
        // Get lat long of map click and add to markers
        const { lat, lng } = e.latlng;
        if (markers.length < targetMarkers) {
            const newMarker = { lat, lng };
            setMarkers([...markers, newMarker]);
        }
    };

    const handleUndoClick = () => {
        // Remove last marker of map
        if (markers.length > 0) {
            const updatedMarkers = markers.slice(0, -1);
            setMarkers([...updatedMarkers]);
        }
    };

    const MapEventHandler = () => {
        // Handle map events
        useMapEvents({
            click: handleMapClick,
        });
        return null;
    };

    // END: EVENT HANDLERS



    return (
        <div className="map_picker relative">
            <MapContainer
                center={position}
                zoom={14}
                className="h-full z-5"
                scrollWheelZoom
            >
                <TileLayer
                    url={mapUrl}
                    attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
                />
                <LocationMarker />

                <MapEventHandler />
                {markers.map((marker, index) => (
                    <Marker key={index} position={marker}>
                        <Tooltip permanent>{index + 1}</Tooltip>
                    </Marker>
                ))}


            </MapContainer>

            <div className="marker_info__box absolute top-0 right-0 bg-white p-2 m-1">
                <p>{markersLeft} left</p>
            </div>

            <CustomButton
                title="Undo"
                containerStyles="map_undo__button bg-primary-blue text-white"
                handleClick={handleUndoClick}
            />

        </div>

    )
}

export default MapPicker