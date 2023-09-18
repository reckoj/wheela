import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "./Colors";
import styled from "styled-components/native";
import RegularText from "./texts/RegularText";
import SmallText from "./texts/SmallText";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../../slices/navSlice";

const { primary, white, black, lightGrey, error } = colors;

const SelectCarBtn = (props) => {
  const travelTime = useSelector(selectTravelTimeInformation);
  const travelDistance = travelTime?.distance.text;
  const travelDuration = travelTime?.duration.text;

  return (
    <>
      <Pressable
        style={[PressableIconStyles.container, PressableIconStyles.shadowProp]}
        onPress={props.onPress}
        {...props}
        disabled={!travelDistance && !travelDuration ? true : false}
      >
        <MaterialCommunityIcons
          style={{ marginRight: 10 }}
          name="car-outline"
          size={24}
          color={!travelDistance && !travelDuration ? lightGrey : primary}
        />
        <SmallText style={{ fontSize: 16 }}>Select your vehicle...</SmallText>
      </Pressable>
    </>
  );
};

const PressableIconStyles = StyleSheet.create({
  container: {
    width: 230,
    height: 60,
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
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});
export default SelectCarBtn;
