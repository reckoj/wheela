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
    url: "https://car-api2.p.rapidapi.com/api/makes",
    params: {
      direction: "asc",
      sort: "id",
    },
    headers: {
      "X-RapidAPI-Key": "9f067022f9msh8d829aae7abdf42p128dc7jsn5dfa84fcbef8",
      "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
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

            setCarMakes(res.data);
          })
          .catch(function (error) {
            console.error(error);
            setLoading(false);
          });
      } catch (error) {}
    };

    fetchData();
  }, []);

  const uniqueMakes = Array.from(new Set(makes.map((item) => item.name)));
  const sortedMakes = uniqueMakes.sort();

  const listHeader = () => {
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          flexDirection: "row",
          paddingHorizontal: 10,
          paddingBottom: 10,
          paddingTop: 5,
          justifyContent: "space-between",
        }}
      >
        <BackButton onPress={() => navigation.navigate("MainScreen")} />
        <RegularText
          style={{
            alignSelf: "center",
            letterSpacing: 1,

            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Select Make
        </RegularText>

        <View></View>
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
            <View style={{ height: "100%" }}>
              <FlatList
                stickyHeaderIndices={[0]}
                ListHeaderComponent={listHeader}
                data={sortedMakes}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <MotiView
                      style={[styles.listContainer]}
                      from={{ opacity: 0, translateY: -50 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      delay={index * 50}
                    >
                      <TouchableOpacity
                        style={{ justifyContent: "center", height: "100%" }}
                        onPress={() => {
                          dispatch(setVehicleInformationMake({ make: item }));

                          navigation.navigate("VehicleModel");
                        }}
                      >
                        <Text style={styles.nameText}>{item}</Text>
                      </TouchableOpacity>
                    </MotiView>
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
    height: 80,
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
  },
  imageContainer: {
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

    fontSize: 14,

    textAlign: "center",
    color: "#000000",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    alignContent: "center",
  },
});

export default VehicleMake;
