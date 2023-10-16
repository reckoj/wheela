import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import RegularText from "./texts/RegularText";
import { colors } from "./Colors";
import { selectTravelTimeInformation } from "../../slices/navSlice";
import {
  selectVehcicleInformationMake,
  selectVehcicleInformationModel,
  selectVehcicleInformationYear,
} from "../../slices/carSlice";
import { useSelector } from "react-redux";

const { primary, white, lightGrey } = colors;

const MainButton = (props) => {
  const [selected, setSelected] = useState(true);
  const travelTime = useSelector(selectTravelTimeInformation);
  const travelDistance = travelTime?.distance.text;
  const travelDuration = travelTime?.duration.text;
  const make = useSelector(selectVehcicleInformationMake);
  const model = useSelector(selectVehcicleInformationModel);
  const year = useSelector(selectVehcicleInformationYear);
  const selectedMake = make?.make;
  const selectedModel = model?.model;
  const selectedYear = year?.year;

  return (
    <TouchableOpacity
      disabled={!travelDistance && !travelDuration ? true : false}
      style={[
        styles.container,
        {
          backgroundColor:
            !travelDistance && !travelDuration && selectedMake == undefined
              ? lightGrey
              : primary,
        },
        styles.shadowProp,
      ]}
      onPress={props.onPress}
      {...props}
    ></TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    padding: 15,
    justifyContent: "center",

    borderRadius: 15,
    height: 60,

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
export default MainButton;
