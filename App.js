import { NavigationContainer } from "@react-navigation/native";
import Main from "./app/navigation/main/Main";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Oswald-": require("./assets/fonts/Oswald-VariableFont_wght.ttf"),
    "Space-Grotesk": require("./assets/fonts/SpaceGrotesk-VariableFont_wght.ttf"),
    "Amaranth-reg": require("./assets/fonts/Amaranth-Regular.ttf"),
    "Amaranth-bi": require("./assets/fonts/Amaranth-BoldItalic.ttf"),
    "Amaranth-b": require("./assets/fonts/Amaranth-Bold.ttf"),
    "Amaranth-i": require("./assets/fonts/Amaranth-Italic.ttf"),
  });

  const onlayoutView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer onlayoutView={onlayoutView}>
        <StatusBar style="dark" />
        <Main />
      </NavigationContainer>
    </Provider>
  );
}
