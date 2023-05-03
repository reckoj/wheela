import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from './Colors';

const { white, secondary } = colors;
const BackButton = (props) => {
  return (
    <Pressable
      onPress={props.onPress}
      {...props}
      style={{
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        height: 50,
        width: 50,
        borderColor: secondary,
      }}
    >
      <MaterialCommunityIcons name="arrow-left-thin" size={18} />
    </Pressable>
  );
};

export default BackButton;
