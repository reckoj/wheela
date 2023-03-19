// import { StyleSheet } from "react-native";
// import React, { useEffect, useRef } from "react";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";
// import { useDispatch, useSelector } from "react-redux";
// import { selectDestination, selectOrigin } from "../../nav/navInfo";
// import MapViewDirections from "react-native-maps-directions";
// import { GOOGLE_MAPS_APIKEY } from "@env";
// import { colors } from "./Colors";

// const { secondary, primary } = colors;

// const Map = () => {
//   const origin = useSelector(selectOrigin);
//   const destination = useSelector(selectDestination);
//   const mapRef = useRef(null);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (!origin || !destination) return;

//     mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
//       edgePadding: {
//         top: 50,
//         right: 50,
//         bottom: 50,
//         left: 50,
//       },
//     });
//   }, [origin, destination]);

//   const getLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       setErrorMsg("Access to location was denied");
//     }
//     let location = await Location.getCurrentPositionAsync({
//       accuracy: Location.Accuracy.High,
//     });
//   };

//   useEffect(() => {
//     getLocation();
//   }, []);

//   return (
//     <MapView
//       ref={mapRef}
//       style={[styles.map, styles.container]}
//       mapType="mutedStandard"
//       initialRegion={{
//         latitude: origin.location.lat,
//         longitude: origin.location.lng,
//         latitudeDelta: 0.005,
//         longitudeDelta: 0.005,
//       }}
//       region={mapRegion}
//       showsUserLocation={true}
//       showsMyLocationButton={true}
//     >
//       {origin && destination && (
//         <MapViewDirections
//           origin={origin.description}
//           destination={destination.description}
//           apikey={GOOGLE_MAPS_APIKEY}
//           strokeWidth={4}
//           strokeColor={secondary}
//         />
//       )}

//       {origin?.location && (
//         <Marker
//           coordinate={{
//             latitude: origin.location.lat,
//             longitude: origin.location.long,
//           }}
//           title="Starting point"
//           description={origin.description}
//           identifier="origin"
//         />
//       )}

//       {destination?.location && (
//         <Marker
//           coordinate={{
//             latitude: destination.location.lat,
//             longitude: destination.location.long,
//           }}
//           title="Destination"
//           description={destination.description}
//           identifier="destination"
//           pinColor={primary}
//         />
//       )}
//     </MapView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: "100%",
//     height: "100%",
//   },
// });

// export default Map;
