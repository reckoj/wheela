import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

import { colors } from "../Colors";

const { primary, secondary, platinum, darkGrey, lightGrey, white } = colors;

const StyledText = styled.Text`
  font-size: 30px;
  color: ${platinum};
  text-align: center;
`;

const LargeText = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};

export default LargeText;
