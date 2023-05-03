import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Pressable,
  FlatList,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { MotiView } from 'moti';
import { colors } from '../components/Colors';
import RegularText from '../components/texts/RegularText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import data from '../hooks/apiRequests/CallCarsApi';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMake, setMake } from '../../slices/carSlice';
import axios from 'axios';

const { white, secondary, lightGrey } = colors;

const VehicleMake = ({ navigation }) => {
  const options = {
    method: 'GET',
    url: 'https://car-data.p.rapidapi.com/cars',
    params: { limit: '10', page: '0' },
    headers: {
      'X-RapidAPI-Key': '9f067022f9msh8d829aae7abdf42p128dc7jsn5dfa84fcbef8',
      'X-RapidAPI-Host': 'car-data.p.rapidapi.com',
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        let res = response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [make]);

  const make = useSelector(selectMake);
  const dispatch = useDispatch();

  const renderItem = ({ item, index }) => {
    return (
      <MotiView
        style={styles.listContainer}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 100 + index * 60 }}
      >
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            navigation.navigate('VehicleModel', { make: item.make });
            dispatch(setMake(item.make));
          }}
        >
          <Image source={item.image} style={styles.image} />
          <Text>{item.make}</Text>
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
            position: 'relative',
            backgroundColor: white,
            marginHorizontal: 20,
          },
        ]}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginVertical: 20,
          }}
        >
          <BackButton onPress={() => navigation.navigate('MainScreen')} />
          <RegularText
            style={{
              position: 'absolute',
              alignSelf: 'center',
              letterSpacing: 1,
              display: 'flex',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Select Make
          </RegularText>
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginBottom: 150 }}
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
    width: Dimensions.get('window').width / 2 - 40,
    backgroundColor: 'white',
    display: 'flex',

    margin: 10,
    borderRadius: 20,
    shadowColor: '#171717',
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  imageContainer: {
    margin: 15,
    borderRadius: 10,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },

  nameText: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 15,
  },
});

export default VehicleMake;
