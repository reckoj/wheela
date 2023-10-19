import axios from "axios";

const getMpg = async () => {
  const options = {
    method: "GET",
    url: "https://car-api2.p.rapidapi.com/api/mileages",
    params: {
      direction: "asc",
      verbose: "yes",
      sort: "id",
      model: "accord",
      year: "2020",
      make: "honda",
    },
    headers: {
      "X-RapidAPI-Key": "9f067022f9msh8d829aae7abdf42p128dc7jsn5dfa84fcbef8",
      "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default getMpg;
