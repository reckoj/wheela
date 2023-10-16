import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

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
        key: process.env.GOOGLE_MAPS_APIKEY,
        language: "en",
      }}
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

    display: "flex",
    justifyContent: "center",
  },
  textInput: {
    fontSize: 16,
  },
  textInputContainer: {
    paddingLeft: 35,
  },
});
