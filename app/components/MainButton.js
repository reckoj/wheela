import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import RegularText from './texts/RegularText';
import { colors } from './Colors';

const { primary, white, lightGrey } = colors;

const MainButton = (props) => {
  const [selected, setSelected] = useState(false);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: selected == true ? lightGrey : primary },
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
    justifyContent: 'center',
    backgroundColor: primary,
    borderRadius: 15,
    height: 60,

    alignItems: 'center',
  },
  input: {
    fontSize: 12,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});
export default MainButton;
