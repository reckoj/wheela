import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Modal,
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
import { Card, Paragraph, Title, Button as Btn } from "react-native-paper";
import Pana from "../../assets/images/pana.svg";

const { white, lightGrey, primary, darkGrey } = colors;

const MainScreen = ({ navigation }) => {
  const placesRef = useRef();

  const [startLocation, setStartLocation] = useState();
  const [dest, setDest] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const travelTime = useSelector(selectTravelTimeInformation);

  const travelDuration = travelTime?.duration.text;
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
          <MainButton
            onPress={() => {
              setModalVisible(true);
            }}
          >
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

      <Modal
        contentContainerStyle={containerStyle}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Card
          // mode="outlined"
          style={{
            position: "absolute",
            display: "flex",
            alignContent: "center",
            margin: 37,
            height: 380,
            top: 200,
            backgroundColor: white,
          }}
        >
          <Pana width={180} height={180} style={{ alignSelf: "center" }} />
          <Card.Content
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Title>You’ve arrived at your destination!</Title>
          </Card.Content>
          <Card.Content style={{}}>
            <Paragraph>
              Time spent{" "}
              <Text style={styles.regularText2}>{travelDuration}</Text>
            </Paragraph>
          </Card.Content>
          <Card.Actions
            style={{
              // justifyContent: "center",
              // alignContent: "center",
              // position: "absolute",
              alignSelf: "center",
              top: 40,
            }}
          >
            <Btn
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate("MainScreen");
              }}
              style={{
                padding: 15,

                backgroundColor: primary,
                borderRadius: 15,
              }}
            >
              <RegularText
                style={{
                  color: white,
                  fontSize: 16,
                  fontFamily: "Amaranth-reg",
                }}
              >
                Home
              </RegularText>
            </Btn>
          </Card.Actions>
        </Card>
      </Modal>
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
  regularText2: {
    color: primary,
    fontFamily: "Amaranth-reg",
    marginRight: 10,
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

const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    width: 290,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Amaranth-bi",
  },
  headerTextMain: {
    marginTop: 10,
    marginBottom: -10,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Amaranth-bi",
  },
  regularText: {
    fontFamily: "Amaranth-reg",
    fontSize: 12,
    color: darkGrey,
  },
  regularTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  regularText2Container: {
    display: "flex",
    justifyContent: "flex-end",
  },
  regularText2: {
    color: primary,
    fontFamily: "Amaranth-reg",
    marginRight: 10,
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
