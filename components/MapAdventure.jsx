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

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// CUSTOM IMPORTS
import { CustomButton } from '.'

const MapAdventure = ({ accessToken }) => {

    const [loading, setLoading] = useState(true)
    const [questionsLeft, setQuestionsLeft] = useState([]);
    const [markersLeft, setMarkersLeft] = useState([]);
    const [randomize, setRandomize] = useState(null)
    const [inSwal, setInSwal] = useState(false);


    // SETUP
    const position = [59.329323, 18.068581]
    const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`


    // Get current adventure
    useEffect(() => {
        // Perform localStorage action
        let storedAdventure = sessionStorage.getItem("adventure")

        if (storedAdventure) {
            storedAdventure = JSON.parse(storedAdventure)

            setQuestionsLeft([...storedAdventure.questions])
            setMarkersLeft([...storedAdventure.markers])
            setRandomize(storedAdventure.randomize)
            setLoading(false)
        }

    }, [])

    // START: EVENT HANDLERS

    const MapEventHandler = () => {
        // Handle map events
        // useMapEvents({
        //     click: handleMapClick,
        // });
        return null;
    };

    // END: EVENT HANDLERS

    // START: SWAL

    const MySwal = withReactContent(Swal)
    const MyToast = withReactContent(Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    }))

    const infoSwal = (msg) => {
        MySwal.fire({
            icon: "info",
            title: <p>Let's get started!</p>,
            text: msg
        })
    }

    const toastSwal = (msg) => {
        MyToast.fire({
            icon: 'success',
            title: msg
        })
    }

    const questionSwal = (question) => {
        console.log("IN SWAL");

        MySwal.fire({
            title: question.front,
            icon: 'question',
            showCancelButton: false,
            confirmButtonText: 'Flip!',
            confirmButtonColor: '#3085d6',
        }).then((result) => {

            if (result.isConfirmed) {
                MySwal.fire({
                    text: question.back,
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Correct!',
                    cancelButtonText: 'Need revising',
                    reverseButtons: true,
                }).then((result) => {

                    // Remove question and marker from markers left and update local storage
                    const newQuestions = [...questionsLeft]
                    const newMarkers = [...markersLeft]
                    newQuestions.shift()
                    newMarkers.shift()

                    setQuestionsLeft([...newQuestions])
                    setMarkersLeft([...newMarkers])

                    // Save adventure to session storage
                    const adventure = {
                        questions: newQuestions,
                        markers: newMarkers,
                        randomize: randomize
                    }

                    sessionStorage.setItem("adventure", JSON.stringify(adventure))

                    console.log(newMarkers)

                    if (result.isConfirmed) {
                        toastSwal(`You earned +10 Energy Points and +10 Knowledge Points!`);
                        return;
                    }

                    toastSwal("You earned +10 Energy Points!")

                })
            }
        })
    }

    // END: SWAL

    // START: LOCATION MARKER

    function LocationMarker() {
        const [position, setPosition] = useState(null);
        const [bbox, setBbox] = useState([]);
        const minRadius = 250;

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
                circle.setStyle({ fillColor: 'blue' })
                circle.addTo(map);

                // Check if close to current marker
                if (!loading && markersLeft.length > 0) {
                    const distance = map.distance(latlng, markersLeft[0])
                    console.log("distance: ", distance)

                    if (distance <= radius) {
                        circle.setStyle({ fillColor: 'green' })
                        questionSwal(questionsLeft[0])
                    }
                }

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

    // END: LOCATION MARKER

    return (
        <section>

            <div className="map_adventure relative">
                <MapContainer
                    center={position}
                    zoom={14}
                    className="h-full z-5"
                    scrollWheelZoom
                >
                    <TileLayer
                        url={mapUrl}
                        attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
                    />
                    <LocationMarker />

                    <MapEventHandler />

                    {!loading & markersLeft.length > 0 ? (
                        <Marker position={markersLeft[0]}>

                        </Marker>
                    ) : (
                        <p>No more to show.</p>
                    )}

                </MapContainer>

            </div>

        </section>


    )
}

export default MapAdventure