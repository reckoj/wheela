import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../../slices/navSlice";
import { Card, Paragraph, Title } from "react-native-paper";
import { colors } from "../components/Colors";
import { useState } from "react";

const { white, black, primary, secondary, tertiary, darkGrey } = colors;

const TripResult = () => {
  const [chosenVehicle, setChosenVehicle] = useState("2022 Chevrolet Trax");
  const travelTime = useSelector(selectTravelTimeInformation);
  const travelDistance = travelTime?.distance.text;
  const travelDuration = travelTime?.duration.text;
  const tripInKilometers = travelTime?.distance.value;
  // const tripInMiles = 1308
  const tankCapacityLitres = 50;
  const milesPerLitre = 5.2;
  const gasPriceLitre = 1.46;
  const costPerFill = tankCapacityLitres * gasPriceLitre;
  const totalRangeOnFillTank = milesPerLitre * tankCapacityLitres;
  const numOfStopToFill = tripInKilometers / totalRangeOnFillTank / 1000;
  const oneWayTotal = Math.round(numOfStopToFill * costPerFill);
  return (
    <View style={styles.container}>
      <Card style={{ backgroundColor: white }}>
        <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
          <Card.Cover source={require("../assets/car1.jpg")} />
          <View>
            <Text style={styles.headerTextMain}>
              {!chosenVehicle ? "2022 Chevrolet Trax" : chosenVehicle}
            </Text>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Text style={styles.headerText}>Trip Info</Text>
            <View style={styles.regularTextContainer}>
              <Text style={styles.regularText}>Estimaed Time {"   "}</Text>
              <Text style={styles.regularText2}>{travelDuration}</Text>
            </View>

            <View style={styles.regularTextContainer}>
              <Text style={styles.regularText}>Distance {"   "}</Text>
              <Text style={styles.regularText2}>{travelDistance}</Text>
            </View>
            <View style={styles.regularTextContainer}>
              <Text style={styles.regularText}>
                Fuel Cost{"      "}
                <Text style={styles.regularText2}>
                  {new Intl.NumberFormat("en-CA", {
                    style: "currency",
                    currency: "CAD",
                  }).format(oneWayTotal)}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default TripResult;
const styles = StyleSheet.create({
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
