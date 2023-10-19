import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect } from "react";
import { selectTravelTimeInformation } from "../../slices/navSlice";
import { Card, Paragraph, Title } from "react-native-paper";
import { colors } from "../components/Colors";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import Map from "../../assets/images/map.svg";
import Trip from "../../assets/images/trip.svg";
import Nav from "../../assets/images/navigator.svg";
import Nav2 from "../../assets/images/navigator2.svg";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  clearAll,
  selectVehcicleInformationMake,
  selectVehcicleInformationModel,
  selectVehcicleInformationYear,
} from "../../slices/carSlice";
import { useDispatch, useSelector } from "react-redux";
import getGasPrices from "../hooks/apiRequests/GetGasPrice";
import getMpg from "../hooks/apiRequests/GetCarMpg";

const { white, primary, darkGrey } = colors;

const TripResult = () => {
  const make = useSelector(selectVehcicleInformationMake);
  const model = useSelector(selectVehcicleInformationModel);
  const year = useSelector(selectVehcicleInformationYear);

  const selectedMake = make?.make;
  const selectedModel = model?.model;
  const selectedYear = year?.year;

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const travelTime = useSelector(selectTravelTimeInformation);
  const travelDistance = travelTime?.distance.text;
  const travelDistanceVal = travelTime?.distance.text;
  const travelDuration = travelTime?.duration.text;
  const tripInKilometers = travelTime?.distance.value;
  const dispatch = useDispatch();

  const [gasPrice, setGasPrice] = useState();
  const [tankCapacity, setTankCapacity] = useState();
  const [combinedMpg, setCombinedMpg] = useState();
  const [cityMpg, setCityMpg] = useState();
  const [highwayMpg, setHighwayMpg] = useState();

  // useEffect(() => {

  //   getGasPrices()
  //     .then((data) => {
  //       const princeEdwardIslandPrice = data.prices.find(
  //         (item) => item.province === "Prince Edward Island"
  //       );

  //       if (princeEdwardIslandPrice) {
  //         // Access the price
  //         const price = princeEdwardIslandPrice.price;

  //         setGasPrice(price);
  //         console.log(gasPrice);
  //       } else {
  //         console.log(
  //           "Price information for Prince Edward Island not found in the response."
  //         );
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const options = {
    method: "GET",
    url: "https://car-api2.p.rapidapi.com/api/mileages",
    params: {
      direction: "asc",
      verbose: "yes",
      sort: "id",
      model: selectedModel,
      year: selectedYear,
      make: selectedMake,
    },
    headers: {
      "X-RapidAPI-Key": "9f067022f9msh8d829aae7abdf42p128dc7jsn5dfa84fcbef8",
      "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
    },
  };

  useEffect(() => {
    // Call the function and handle the data
    const fetchData = () => {
      try {
        // setLoading(true);
        axios
          .request(options)
          .then((response) => {
            // setLoading(true);
            const res = response.data;
            // setLoading(false);
            const cmpg = res.data[0].combined_mpg;
            setCombinedMpg(cmpg);
            const ftc = res.data[0].fuel_tank_capacity;
            setTankCapacity(ftc);
            const hmpg = res.data[0].epa_highway_mpg;
            setHighwayMpg(hmpg);
            const city = res.data[0].epa_city_mpg;
            setCityMpg(city);

            console.log(combinedMpg);

            console.log(tankCapacity);

            console.log(highwayMpg);

            console.log(cityMpg);
          })
          .catch(function (error) {
            console.error(error);
          });
      } catch (error) {}
    };

    fetchData();
  }, [make, model, year]);

  // const tankCapacityLitres = 50;
  //TODO need to add actual vehicle mpg or km/litre
  // const milesPerLitre = 16.2;
  const fakePrice = 1.521;
  const costPerFill = tankCapacity * fakePrice;
  const totalRangeOnFillTank = combinedMpg * tankCapacity;
  const numOfStopToFill = tripInKilometers / totalRangeOnFillTank / 1000;
  const oneWayTotal = Math.round(numOfStopToFill * costPerFill);

  return (
    <View style={styles.container}>
      <Card style={{ backgroundColor: white }}>
        {isCollapsed ? (
          <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
            <Pressable
              onPress={toggleCollapse}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="chevron-double-down"
                size={24}
                color={primary}
              />
              <Text style={[{ fontSize: 12, color: primary }]}>Close</Text>
            </Pressable>

            <Nav2 width={200} height={110} style={{ alignSelf: "center" }} />
            <View>
              <Text style={styles.headerTextMain}>
                {selectedMake} {selectedModel} {selectedYear}
              </Text>
            </View>
            <View style={{ marginVertical: 20 }}>
              <Text style={styles.headerText}>Trip Info</Text>
              <View style={styles.regularTextContainer}>
                <Text style={styles.regularText}>Estimaed Time {"  "}</Text>
                <Text style={styles.regularText2}>{travelDuration}</Text>
              </View>

              <View style={styles.regularTextContainer}>
                <Text style={styles.regularText}>Distance {"  "}</Text>
                <Text style={styles.regularText2}>{travelDistance}</Text>
              </View>
              <View style={styles.regularTextContainer}>
                <Text style={styles.regularText}>
                  Fuel Cost{"  "}
                  {!oneWayTotal ? (
                    <Text></Text>
                  ) : (
                    <Text style={styles.regularText2}>
                      {new Intl.NumberFormat("en-CA", {
                        style: "currency",
                        currency: "CAD",
                      }).format(oneWayTotal)}
                    </Text>
                  )}
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "felx",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  dispatch(clearAll());
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    fontFamily: "Amaranth-reg",
                    color: primary,
                    display: "flex",
                    justifyContent: "center",
                    // textDecorationColor: "red",
                    textDecorationLine: "underline",
                  }}
                >
                  Clear Vehicle
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <Pressable
              onPress={toggleCollapse}
              style={[
                {
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <MaterialCommunityIcons
                name="chevron-double-up"
                size={24}
                color={primary}
              />
              <Text style={{ color: primary, fontSize: 12 }}>Info</Text>
            </Pressable>
          </View>
        )}
      </Card>
    </View>
  );
};

export default TripResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Amaranth-reg",
  },
  headerTextMain: {
    marginTop: 10,
    marginBottom: -10,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Amaranth-reg",
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
