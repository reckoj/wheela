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
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { white, lightGrey, primary, darkGrey } = colors;

const MainScreen = ({ navigation }) => {
  const placesRef = useRef();
  const [startLocation, setStartLocation] = useState();
  const [dest, setDest] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  // const containerStyle = { backgroundColor: 'white', padding: 20 };
  const travelTime = useSelector(selectTravelTimeInformation);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const travelDuration = travelTime?.duration.text;
  const dispatch = useDispatch();

  const getData = () => {};

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
            zIndex: 1,
          },
          styles.shadowProp,
        ]}
      >
        {/* {dest && startLocation ? (
          <View>
            <Pressable
              onPress={toggleCollapse}
              style={[
                {
                  //todo instead of doing this I will push the input fields to the top similar like google maps 
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <MaterialCommunityIcons
                name="chevron-double-right"
                size={24}
                color={primary}
              />
              <Text style={{ color: primary, fontSize: 12 }}>Exit</Text>
            </Pressable>
          </View>
        ) : (
          <></>
        )} */}

        {/* {dest && startLocation ? (
          <></>
        ) : (
          <> */}
            <GooglePlacesAutocomplete
              styles={placesStyles}
              minLength={2}
              enablePoweredByContainer={false}
              returnKeyType={"search"}
              placeholder="Starting location"
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={400}
              query={{
                key: process.env.GOOGLE_MAPS_APIKEY,
                language: "en",
              }}
              fetchDetails={true}
              onFail={(error) => console.log(error)}
              onNotFound={() => console.log("no results")}
              ref={placesRef}
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
          {/* </>
        )} */}
      </View>

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
        {/* {dest && startLocation ? (
          <></>
        ) : (
          <> */}
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
                key: process.env.GOOGLE_MAPS_APIKEY,
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
                color={dest != null ? primary : lightGrey}
              />
            </View>
          {/* </>
        )} */}
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          bottom: 60,
          left: "2%",
          width: "70%",
        }}
      >
        {
          /**
           * *uncomment this code to result
           * TODO add ternery so that it shows trip result screen once cars are selected else it shows select car button
           */
          <TripResult />
        }

        {/* <SelectCarBtn onPress={() => navigation.navigate('VehicleMake')} /> */}
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          bottom: 60,
          right: "2%",
        }}
      >
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
      </View>

      <Modal
        style={modalStyles.container}
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
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            height: 380,
            top: 260,
            backgroundColor: white,
            width: 350,
          }}
        >
          <Pana width={200} height={180} style={{ alignSelf: "center" }} />
          <Card.Content
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Title>You’ve arrived at {"\n"} your destination!</Title>
          </Card.Content>
          <Card.Content style={{}}>
            <Paragraph
              style={{
                textAlign: "center",
              }}
            >
              Time spent{" "}
              <Text style={styles.regularText2}>{travelDuration}</Text>
            </Paragraph>
          </Card.Content>
          <Card.Actions
            style={{
              alignSelf: "center",
              top: 20,
            }}
          >
            <MainButton
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
            </MainButton>
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
    width: "100%",
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
