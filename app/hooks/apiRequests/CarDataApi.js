import axios from 'axios';
const URL = `https:api.api-ninjas.com/v1/cars?`;
const options = {
  params: { limit: '10', page: '0', model: model, year: year, make: make },
  headers: {
    'X-Api-Key': process.env.API_NINJA_APIKEY,
  },
};

export const getCarsData = async () => {
  try {
    const response = await axios.get(URL, options);
    let res = await response.data;
    // let {make, model, year} = await response.data;
    console.log(res);
    const selectedMake = res[0].make;
    const selectedModel = res[0].model;
    const selectedYear = res[0].year;
    const mpg = res[0].combination_mpg;

    // console.log(carMake, carModel, carYear, carMpg);
  } catch (e) {
    console.log(e);
  }
};
