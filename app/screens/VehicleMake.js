import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity,
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

  // useEffect(async () => {
  //   const options = {
  //     method: "GET",
  //     url: "https://car-data.p.rapidapi.com/cars/makes",
  //     headers: {
  //       "X-RapidAPI-Key": "9f067022f9msh8d829aae7abdf42p128dc7jsn5dfa84fcbef8",
  //       "X-RapidAPI-Host": "car-data.p.rapidapi.com",
  //     },
  //   };

  //   try {
  //     setLoading();

  //     const response = await axios.request(options);
  //     setLoading(false);

  //     console.log(response.data);
  //     let testR = response.json();
  //     console.log(testR);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [makes]);

  const options = {
    method: "GET",
    url: "https://car-data.p.rapidapi.com/cars/makes",
    params: { limit: "10", page: "0" },
    headers: {
      "X-RapidAPI-Key": "9f067022f9msh8d829aae7abdf42p128dc7jsn5dfa84fcbef8",
      "X-RapidAPI-Host": "car-data.p.rapidapi.com",
    },
  };

  useEffect(() => {
    try {
      setLoading(true);
      axios
        .request(options)
        .then((response) => {
          let res = response.data;
          setLoading(false);
          // console.log(res);
          // console.log("\n");
          let arra = res.sort();
          // console.log(arra);
          let newSplit = arra.toString().split(",");
          console.log(newSplit);

          setCarMakes(newSplit);

          console.log("This is my cars \n" + makes);
        })
        .catch(function (error) {
          console.error(error);
          setLoading(false);
        });
    } catch (error) {}
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <MotiView
        style={[styles.listContainer]}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 100 + index * 40 }}
      >
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            dispatch(setVehicleInformationMake({ make: item.make }));

            navigation.navigate("VehicleModel");

            console.log(makes);
          }}
        >
          {/* {makes.map((carName, index) => (
            <Text key={index} style={styles.nameText}>
              {carName}
            </Text>
          ))} */}
          <Text style={styles.nameText}>{item.make}</Text>

          {/* <Image source={item.make} style={styles.image} /> */}
        </TouchableOpacity>
      </MotiView>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: white }}>
      {isLoading ? (
        <View
          style={{
            borderBlockColor: "white",
            flex: 1,

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
        <View
          style={[
            styles.container,
            {
              position: "relative",
              marginHorizontal: 20,
              backgroundColor: white,
            },
          ]}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              marginVertical: 20,
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
          </View>

          <View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      )}
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
  imageContainer: {
    margin: 15,
    // borderRadius: 10,
    overflow: "hidden",
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
    marginLeft: 15,
    height: 50,
    textAlign: "center",
  },
});

export default VehicleMake;
