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
import {
  selectVehcicleInformationMake,
  setVehicleInformationModel,
} from "../../slices/carSlice";
import { useDispatch, useSelector } from "react-redux";
import { ActivityInd } from "../components/ActivityInd";
import axios from "axios";

const { white, secondary, primary } = colors;

const VehicleModel = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [models, setCarModels] = useState([]);

  const make = useSelector(selectVehcicleInformationMake);

  const selectedMake = make?.make;
  const options = {
    method: "GET",
    url: `https://car-api2.p.rapidapi.com/api/models`,
    params: {
      make: `${selectedMake}`,
      sort: "id",
      direction: "asc",
      year: "2020",
      verbose: "yes",
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

            setCarModels(res.data);
          })
          .catch(function (error) {
            console.error(error);
            setLoading(false);
          });
      } catch (error) {}
    };

    fetchData();
  }, []);

  const uniqueModels = Array.from(new Set(models.map((item) => item.name)));
  const sortedModels = uniqueModels.sort();

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
        <BackButton onPress={() => navigation.navigate("VehicleMake")} />
        <RegularText
          style={{
            alignSelf: "center",
            letterSpacing: 1,

            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Select Model
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
                data={sortedModels}
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
                          dispatch(setVehicleInformationModel({ model: item }));

                          navigation.navigate("VehicleYear");
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
export default VehicleModel;
