import { createStackNavigator } from '@react-navigation/stack';
import VehicleMake from '../../screens/VehicleMake';
import VehicleModel from '../../screens/VehicleModel';
import VehicleYear from '../../screens/VehicleYear';
import Home from '../../screens/MainScreen';
import MainScreen from '../../screens/MainScreen';
import Map from '../../components/Map';
import Vehicledata from '../../hooks/apiRequests/Vehicledata';
import TripResult from '../../screens/TripResult';

const Stack = createStackNavigator();

function Main() {
  return (
    <Stack.Navigator
    // screenOptions={{
    //   headerMode: "screen",
    //   headerTintColor: "white",
    //   headerStyle: { backgroundColor: "transparent" },
    // }}
    >
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VehicleMake"
        component={VehicleMake}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Vehicledata"
        component={Vehicledata}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TripResult"
        component={TripResult}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VehicleModel"
        component={VehicleModel}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VehicleYear"
        component={VehicleYear}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen name="Map" component={Map} /> */}
    </Stack.Navigator>
  );
}

export default Main;
