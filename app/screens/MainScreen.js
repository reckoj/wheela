import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RegularText from "../components/texts/RegularText";
import MainButton from "../components/MainButton";
import { colors } from "../components/Colors";
import Map from "../components/Map";
import SelectCarBtn from "../components/SelectCarBtn";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTravelTimeInformation,
  setDestination,
  setOrigin,
} from "../../slices/navSlice";
import TripResult from "./TripResult";
import { useRoute } from "@react-navigation/native";
import { selectMake, selectModel } from "../../slices/carSlice";

const { white, lightGrey, primary } = colors;

const MainScreen = ({ navigation }) => {
  const placesRef = useRef();
  // const [location, setLocation] = useState();
  const [startLocation, setStartLocation] = useState();
  const [dest, setDest] = useState();
  /**
   * TODO more work needs to be done here
   */
  const dispatch = useDispatch();
  return (
    <>
      <Map />
      <View
        style={[
          {
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            top: 120,
          },
          styles.shadowProp,
        ]}
      >
        {dest && startLocation ? (
          <View></View>
        ) : (
          <GooglePlacesAutocomplete
            styles={placesStyles}
            minLength={2}
            enablePoweredByContainer={false}
            returnKeyType={"search"}
            placeholder="Starting location"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            fetchDetails={true}
            onFail={(error) => console.log(error)}
            onNotFound={() => console.log("no results")}
            ref={placesRef}
            // currentLocation={true}
            // currentLocationLabel="Your location!"
            onPress={(data, details = null) => {
              setStartLocation({
                location: details.geometry.location,
                description: data.description,
              });
              dispatch(
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              dispatch(setDestination(null));
            }}
          />
        )}

        <TouchableOpacity
          onPress={() => {}}
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            left: 25,
            top: 22,
          }}
        >
          <Icon
            name="locate"
            size={24}
            color={startLocation != null ? primary : lightGrey}
          />
        </TouchableOpacity>
      </View>

      {startLocation != null ? (
        <View
          style={[
            {
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              top: 210,
            },
            styles.shadowProp,
          ]}
        >
          {dest && startLocation ? (
            <View></View>
          ) : (
            <GooglePlacesAutocomplete
              styles={placesStyles}
              minLength={2}
              enablePoweredByContainer={false}
              returnKeyType={"search"}
              placeholder="Destination"
              nearbyPlacesAPI="GooglePlacesSearch"
              fetchDetails={true}
              debounce={400}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: "en",
              }}
              onPress={(data, details = null) => {
                setDest({
                  location: details.geometry.location,
                  description: data.description,
                });
                dispatch(
                  setDestination({
                    location: details.geometry.location,
                    description: data.description,
                  })
                );
                setDestination(data.place_id);
              }}
            />
          )}
          <View
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              left: 25,
              top: 22,
            }}
          >
            <Icon
              name="location-sharp"
              size={24}
              color={startLocation != null ? primary : lightGrey}
            />
          </View>
        </View>
      ) : (
        <View></View>
      )}

      <View
        style={{
          display: "flex",
          position: "absolute",
          bottom: 120,
        }}
      >
        <TripResult />
      </View>

      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          bottom: 60,
          justifyContent: "space-evenly",
        }}
      >
        {<SelectCarBtn onPress={() => navigation.navigate("VehicleMake")} />}
        {
          <MainButton onPress={() => {}}>
            <RegularText
              style={{
                color: white,
                fontSize: 16,
                fontFamily: "Amaranth-reg",
              }}
            >
              Start Trip
            </RegularText>
          </MainButton>
        }
      </View>
    </>
  );
};

export default MainScreen;

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

const PressableIconStyles = StyleSheet.create({
  container: {
    width: 250,
    backgroundColor: white,
    borderRadius: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 12,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});
