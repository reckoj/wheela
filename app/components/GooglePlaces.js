import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";

import { colors } from "./Colors";

const { white, lightGrey, primary } = colors;
const GooglePlaces = () => {
  return (
    <GooglePlacesAutocomplete
      styles={placesStyles}
      minLength={2}
      enablePoweredByContainer={false}
      returnKeyType={"search"}
      nearbyPlacesAPI="GooglePlacesSearch"
      fetchDetails={true}
      debounce={400}
      query={{
        key: GOOGLE_MAPS_APIKEY,
        language: "en",
      }}
      //   onPress={(data, details = null) => {
      //     console.log(`The data is ${data}`);
      //     setDest({
      //       location: details.geometry.location,
      //       description: data.description,
      //     });
      //     dispatch(
      //       setDestination({
      //         location: details.geometry.location,
      //         description: data.description,
      //       })
      //     );
      //     setDestination(data.place_id);
      //   }}
    />
  );
};

export default GooglePlaces;

const styles = StyleSheet.create({
  placesStyle: {
    position: "absolute",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});

const placesStyles = StyleSheet.create({
  container: {
    backgroundColor: white,
    paddingTop: 15,
    flex: 0,
    width: "90%",
    marginBottom: 20,
    borderRadius: 15,
    // height: 65,
    display: "flex",
    justifyContent: "center",
  },
  textInput: {
    fontSize: 16,
  },
  textInputContainer: {
    paddingLeft: 35,
    // paddingVertical: 20,
    // display: "flex",
  },
});
