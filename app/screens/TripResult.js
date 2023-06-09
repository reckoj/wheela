import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../../slices/navSlice';
import { Card, Paragraph, Title } from 'react-native-paper';
import { colors } from '../components/Colors';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const { white, black, primary, secondary, tertiary, darkGrey } = colors;

const TripResult = () => {
  const route = useRoute(); // retrieve the route object
  const make = route.params?.make;
  const model = route.params?.model;
  const year = route.params?.year;

  const [carMake, setCarMake] = useState();
  const [carYear, setCarYear] = useState();
  const [carModel, setCarModel] = useState();
  const [carMpg, setcarMpg] = useState();
  const options = {
    method: 'GET',
    url: `https://api.api-ninjas.com/v1/cars?`,
    params: { limit: '10', page: '0', model: model, year: year, make: make },
    headers: {
      'X-Api-Key': process.env.API_NINJA_APIKEY,
    },
  };
  const getCarData = () => {
    axios
      .request(options)
      .then((response) => {
        let res = response.data;
        // console.log(res[0], 'newapis');
        const selectedMake = res[0].make;
        const selectedModel = res[0].model;
        const selectedYear = res[0].year;
        const mpg = res[0].combination_mpg;

        setCarMake(selectedMake);
        setCarModel(selectedModel);
        setCarYear(selectedYear);
        setcarMpg(mpg);
        console.log(carMake, carModel, carYear, carMpg);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const [chosenVehicle, setChosenVehicle] = useState(`${carYear}`);
  const travelTime = useSelector(selectTravelTimeInformation);
  const travelDistance = travelTime?.distance.text;
  const travelDuration = travelTime?.duration.text;
  const tripInKilometers = travelTime?.distance.value;
  // const tripInMiles = 1308
  const tankCapacityLitres = 50;
  const milesPerLitre = 16.2;
  const gasPriceLitre = 1.46;
  const costPerFill = tankCapacityLitres * gasPriceLitre;
  const totalRangeOnFillTank = carMpg * tankCapacityLitres;
  const numOfStopToFill = tripInKilometers / totalRangeOnFillTank / 1000;
  const oneWayTotal = Math.round(numOfStopToFill * costPerFill);

  return (
    <View style={styles.container}>
      <Card style={{ backgroundColor: white }}>
        <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
          <Card.Cover source={require('../assets/cars_g.png')} />
          <View>
            <Text style={styles.headerTextMain}>
              {carYear} {carMake} {carModel}
            </Text>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Text style={styles.headerText}>Trip Info</Text>
            <View style={styles.regularTextContainer}>
              <Text style={styles.regularText}>Estimaed Time {'   '}</Text>
              <Text style={styles.regularText2}>{travelDuration}</Text>
            </View>

            <View style={styles.regularTextContainer}>
              <Text style={styles.regularText}>Distance {'   '}</Text>
              <Text style={styles.regularText2}>{travelDistance}</Text>
            </View>
            <View style={styles.regularTextContainer}>
              <Text style={styles.regularText}>
                Fuel Cost{'      '}
                {!oneWayTotal ? (
                  <Text></Text>
                ) : (
                  <Text style={styles.regularText2}>
                    {new Intl.NumberFormat('en-CA', {
                      style: 'currency',
                      currency: 'CAD',
                    }).format(oneWayTotal)}
                  </Text>
                )}
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
    justifyContent: 'center',
    // padding: 20,
    width: 250,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Amaranth-bi',
  },
  headerTextMain: {
    marginTop: 10,
    marginBottom: -10,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Amaranth-bi',
  },
  regularText: {
    fontFamily: 'Amaranth-reg',
    fontSize: 12,
    color: darkGrey,
  },
  regularTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  regularText2Container: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  regularText2: {
    color: primary,
    fontFamily: 'Amaranth-reg',
    marginRight: 10,
  },
});
