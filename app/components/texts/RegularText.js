import { View, Text, StyleSheet } from "react-native";
import React from "react";
import styled from "styled-components/native";

import { colors } from "../Colors";

const { primary, secondary, platinum, darkGrey, lightGrey } = colors;

const StyledText = styled.Text`
  font-size: 15px;
`;

const RegularText = (props) => {
  return <Text {...props}>{props.children}</Text>;
};

export default RegularText;

const styles = StyleSheet.create({
  textFont: {
    fontSize: 15,
    fontFamily: "Space-Grotesk",
  },
});
