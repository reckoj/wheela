import { createStackNavigator } from "@react-navigation/stack";
import VehicleMake from "../../screens/VehicleMake";
import VehicleModel from "../../screens/VehicleModel";
import VehicleYear from "../../screens/VehicleYear";
import MainScreen from "../../screens/MainScreen";
import TripResult from "../../screens/TripResult";
import MapBoxScreen from "../../screens/MapBoxNav";

const Stack = createStackNavigator();

function Main() {
  return (
    <Stack.Navigator>
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
      <Stack.Screen
        name="NavigationScreen"
        component={MapBoxScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Main;
