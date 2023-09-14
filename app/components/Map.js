import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../../slices/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { colors } from "./Colors";

const { white, black, primary, secondary, tertiary } = colors;

const Map = () => {
  const [mapRegion, setMapRegion] = useState();
  const [defaultLocationLat, setDefaultLocationLat] = useState();
  const [defaultLocationLng, setDefaultLocationLng] = useState();
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Access to location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setDefaultLocationLat(location.coords.latitude);
    setDefaultLocationLng(location.coords.longitude);
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    // console.log(location.coords.latitude, location.coords.longitude);
  };

  useEffect(() => {
    getLocation();
  }, []);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 150, bottom: 150, left: 150, right: 150},
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    const getTraveltime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?
				units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${process.env.GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        })
        .catch((e) => {
          // console.log(e.message);
          throw console.error(e);
        });
    };

    getTraveltime();
  }, [origin, destination, process.env.GOOGLE_MAPS_APIKEY]);
  return (
    <View style={styles.container}>
      <MapView
        
        ref={mapRef}
        style={{ flex: 1 ,}}
        mapType="mutedStandard"
        initialRegion={mapRegion}
      >
        <TextInput />
        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            title="Starting point"
            description={origin.description}
            identifier="origin"
            pinColor={black}
          />
        )}

        {origin && destination && (
          <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            apikey={process.env.GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor={primary}
          />
        )}

        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title="Destination"
            description={destination.description}
            identifier="destination"
            pinColor={tertiary}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
