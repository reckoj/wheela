import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MotiView } from "moti";
import { colors } from "../components/Colors";
import RegularText from "../components/texts/RegularText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BackButton from "../components/BackButton";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectVehcicleInformationMake,
  selectVehcicleInformationModel,
  setVehicleInformationYear,
} from "../../slices/carSlice";
import { ActivityInd } from "../components/ActivityInd";
import axios from "axios";
const { white, secondary, lightGrey, primary } = colors;

const VehicleYear = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [years, setCarYears] = useState([]);

  const make = useSelector(selectVehcicleInformationMake);
  const model = useSelector(selectVehcicleInformationModel);

  const selectedMake = make?.make;
  const selectedModel = model?.model;
  const options = {
    method: "GET",
    url: "https://car-api2.p.rapidapi.com/api/years",
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
            console.log(res);

            setCarYears(res);
          })
          .catch(function (error) {
            console.error(error);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  //todo change the data in the flatlist

  const uniqueYear = years.map((item) => item);

  const listHeader = () => {
    return (
      <View
        style={{
          width: "100%",

          flexDirection: "row",
          // paddingHorizontal: 10,
          // paddingBottom: 10,
          // paddingTop: 5,
          padding: 10,
          justifyContent: "space-between",
        }}
      >
        <BackButton onPress={() => navigation.navigate("VehicleModel")} />
        <RegularText
          style={{
            alignSelf: "center",
            letterSpacing: 1,

            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Select Year
        </RegularText>

        <View
          style={{
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            height: 50,
            width: 50,
            borderColor: primary,
          }}
        >
          <RegularText style={{ fontSize: 8 }}>{selectedMake}</RegularText>
          <RegularText style={{ fontSize: 8 }}>{selectedModel}</RegularText>
        </View>
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
                data={uniqueYear}
                // keyExtractor={(item) => item.id}
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
                          dispatch(setVehicleInformationYear({ year: item }));

                          // Navigate to the "NextScreen"
                          navigation.navigate("MainScreen");
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
    // flexDirection: "row",
  },
  imageContainer: {
    // margin: 10,
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

export default VehicleYear;
