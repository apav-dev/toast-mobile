import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import { useCallback } from "react";
import { useFonts, Sora_400Regular } from "@expo-google-fonts/sora";
import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";

// SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

const searcher = provideHeadless({
  apiKey: "10a44dca245f5fd3faba055fd4d28e1d",
  experienceKey: "toast",
  locale: "en",
  verticalKey: "beverages",
});

function App() {
  let [fontsLoaded] = useFonts({
    Sora_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SearchHeadlessProvider searcher={searcher}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: "#e91e63",
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: "Home",
              tabBarLabelStyle: {
                fontFamily: "Sora_400Regular",
              },
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5Icons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
              tabBarLabel: "Search",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5Icons name="search" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SearchHeadlessProvider>
  );
}

export default App;
