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
import data from "../hooks/apiRequests/CallCarsApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setVehicleInformationYear } from "../../slices/carSlice";

const { white, secondary, lightGrey } = colors;

const VehicleYear = ({ navigation }) => {
  const dispatch = useDispatch();

  const renderItem = ({ item, index }) => {
    return (
      <MotiView
        style={styles.listContainer}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 100 + index * 40 }}
      >
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            dispatch(setVehicleInformationYear({ year: item.year }));
            navigation.navigate("MainScreen");

            console.log(item.year);
          }}
        >
          <Text style={styles.nameText}>{item.year}</Text>

          {/* <Image source={item.year} style={styles.image} /> */}
        </TouchableOpacity>
      </MotiView>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: white }}>
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
          <BackButton onPress={() => navigation.navigate("VehicleModel")} />
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
            Select Year
          </RegularText>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
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

export default VehicleYear;
