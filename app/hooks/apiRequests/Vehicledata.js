import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
const Vehicledata = () => {
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
  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        let res = response.data;
        console.log(res);
        // const selectedMake = res[0].make;
        // const selectedModel = res[0].model;
        // const selectedYear = res[0].year;
        // const mpg = res[0].combination_mpg;

        // setCarMake(selectedMake);
        // setCarModel(selectedModel);
        // setCarYear(selectedYear);
        // setcarMpg(mpg);
        // console.log(carMake, carModel, carYear, carMpg);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <View>
      <Text>Vehicledata</Text>
    </View>
  );
};

export default Vehicledata;
