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
import BestPlace from "../../assets/images/bestPlace.svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  selectVehcicleInformation,
  selectVehcicleInformationMake,
  selectVehcicleInformationModel,
  selectVehcicleInformationYear,
} from "../../slices/carSlice";

const { white, lightGrey, primary, darkGrey } = colors;

const MainScreen = ({ navigation }) => {
  const placesRef = useRef();
  const [startLocation, setStartLocation] = useState();
  const [dest, setDest] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(false);
  const travelTime = useSelector(selectTravelTimeInformation);
  const make = useSelector(selectVehcicleInformationMake);
  const model = useSelector(selectVehcicleInformationModel);
  const year = useSelector(selectVehcicleInformationYear);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const travelDistance = travelTime?.distance.text;
  const travelDuration = travelTime?.duration.text;
  const selectedMake = make?.make;
  const selectedModel = model?.model;
  const selectedYear = year?.year;
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
            top: 70,
            zIndex: selected ? 1 : 0,
          },
          styles.shadowProp,
        ]}
      >
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
            name="locate"
            size={24}
            color={startLocation != null ? primary : lightGrey}
          />
        </View>
      </View>
      {!startLocation ? (
        <></>
      ) : (
        <View
          style={[
            {
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              top: 138,
            },
            styles.shadowProp,
          ]}
        >
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
              setSelected(true);
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
        </View>
      )}

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          bottom: 60,
          left: 20,
          width: 230,
        }}
      >
        {selectedMake && selectedModel && selectedYear ? (
          <TripResult />
        ) : (
          <SelectCarBtn onPress={() => navigation.navigate("VehicleMake")} />
        )}
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
        {selectedMake &&
        selectedModel &&
        selectedYear &&
        startLocation &&
        dest ? (
          <MainButton
            onPress={() => {
              // setModalVisible(true);
              navigation.navigate("NavigationScreen");
            }}
          >
            <RegularText
              style={{
                color: white,
                fontSize: 16,
                fontFamily: "Amaranth-reg",
              }}
            >
              Start trip
            </RegularText>
          </MainButton>
        ) : (
          <MainButton
            style={{
              width: 100,
              padding: 15,
              justifyContent: "center",
              borderRadius: 15,
              height: 60,
              alignItems: "center",

              shadowColor: "black",
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 3,

              backgroundColor:
                startLocation != null && dest != null ? primary : lightGrey,
            }}
            onPress={() => {
              setModalVisible(true);
              // navigation.navigate("NavigationScreen");
            }}
          >
            <RegularText
              style={{
                color: white,
                fontSize: 16,
                fontFamily: "Amaranth-reg",
              }}
            >
              View trip
            </RegularText>
          </MainButton>
        )}
      </View>

      {travelDuration && selectedYear ? (
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
      ) : (
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
            <BestPlace
              width={200}
              height={180}
              style={{ alignSelf: "center" }}
            />

            <Card.Content style={{}}>
              <Paragraph
                style={{
                  textAlign: "center",
                }}
              >
                This route will take you approximately {"\n"}{" "}
                <Text style={styles.regularText2}>{travelDuration}</Text>
              </Paragraph>
              <Paragraph
                style={{
                  textAlign: "center",
                }}
              >
                To your destination!
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
                  Okay
                </RegularText>
              </MainButton>
            </Card.Actions>
          </Card>
        </Modal>
      )}
    </>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  placesStyle: {
    position: "absolute",
  },
  shadowProp: {
    shadowColor: "black",
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
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});
