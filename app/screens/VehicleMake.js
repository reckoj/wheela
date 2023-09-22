import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState } from "react";
import { MotiView } from "moti";
import { colors } from "../components/Colors";
import RegularText from "../components/texts/RegularText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import data from "../hooks/apiRequests/CallCarsApi";
import { useDispatch } from "react-redux";
import { setVehicleInformationMake } from "../../slices/carSlice";
import { ActivityInd } from "../components/ActivityInd";
import { useEffect } from "react";
import axios from "axios";

const { white, secondary, lightGrey } = colors;

const VehicleMake = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [makes, setCarMakes] = useState([]);

  const options = {
    method: "GET",
    // url: "https://car-api2.p.rapidapi.com/api/makes",
    // params: {
    //   direction: "asc",
    //   sort: "id",
    // },
    url: "https://car-data.p.rapidapi.com/cars",
    params: { limit: "40" },
    headers: {
      "X-RapidAPI-Key": "9f067022f9msh8d829aae7abdf42p128dc7jsn5dfa84fcbef8",
      "X-RapidAPI-Host": "car-data.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        axios
          .request(options)
          .then((response) => {
            let res = response.data;
            setLoading(false);
            // console.log(res);

            setCarMakes(res);
            // console.log("This is my cars \n" + makes);
          })
          .catch(function (error) {
            console.error(error);
            setLoading(false);
          });
      } catch (error) {}
    };

    fetchData();
  }, []);

  // Extract the unique makes from the API response

  // Render each item in the FlatList
  const uniqueMakes = Array.from(new Set(makes.map((item) => item.make)));
  const sortedMakes = uniqueMakes.sort();

  const listfooter = () => {
    <View style={{ marginBottom: 10, marginTop: 10 }}>
      <Button title="Bu" />
    </View>;
  };

  const listHeader = () => {
    return (
      <View style={{ display: "flex" }}>
        {/* <BackButton onPress={() => navigation.navigate("MainScreen")} /> */}
        <RegularText style={{ fontWeight: "bold", fontSize: 20 }}>
          Select Make
        </RegularText>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: white, flex: 1 }}>
      <View
        style={{ displa: "flex", alignContent: "center", marginHorizontal: 20 }}
      >
        {isLoading ? (
          <View
            style={{
              borderBlockColor: "white",

              backgroundColor: white,
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              top: 300,
            }}
          >
            <ActivityInd />
          </View>
        ) : (
          <View>
            {/* <View
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <BackButton onPress={() => navigation.navigate("MainScreen")} />
              <RegularText
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  letterSpacing: 1,
                  display: "flex",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Select Make
              </RegularText>
            </View> */}

            <View style={{ height: "100%" }}>
              <FlatList
                ListHeaderComponent={listHeader}
                ListHeaderComponentStyle={styles.listHeaderStyle}
                contentcontainerstyle={{ marginBottom: 100 }}
                ListFooterComponentStyle
                data={sortedMakes}
                // keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <View style={[styles.listContainer]}>
                      <TouchableOpacity
                        style={[styles.imageContainer]}
                        onPress={() => {
                          dispatch(setVehicleInformationMake({ make: item }));
                          console.log(item);
                          navigation.navigate("VehicleModel");
                        }}
                      >
                        <Text style={styles.nameText}>{item}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
  },
  listContainer: {
    width: Dimensions.get("window").width / 2 - 40,
    backgroundColor: "white",
    display: "flex",

    margin: 10,
    borderRadius: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  listHeaderStyle: {
    display: "flex",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  imageContainer: {
    margin: 15,
    // borderRadius: 10,
    // overflow: "hidden",
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  nameText: {
    color: "black",
    fontWeight: "bold",
    // marginLeft: 15,
    height: 50,
    textAlign: "center",
  },
});

export default VehicleMake;
