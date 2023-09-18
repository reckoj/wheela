import React from "react";
import { ActivityIndicator } from "react-native";
import { colors } from "./Colors";

const { primary, white, lightGrey, secondary } = colors;
export const ActivityInd = () => (
  <ActivityIndicator size={"large"} color={secondary} />
);
