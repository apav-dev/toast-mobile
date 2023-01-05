import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
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

/** Under the hood, Search UI React is using Search Core which makes use of the URL object.
 * The URL object is not available in React Native's JavaScript runtime by default, so the next line adds support for it.
 * */
import "react-native-url-polyfill/auto";
import SearchResultsScreen from "./screens/SearchResultsScreen";

// SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  Home: undefined;
  Results: {
    query?: string;
    beverageTypeName?: string;
  };
};

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator<RootStackParamList>();

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
        <RootStack.Navigator>
          {/* TODO: add ability to choose and toggle delivery locations */}
          <RootStack.Screen name="Root" component={HomeTabs} />
          <RootStack.Screen name="Results" component={SearchResultsScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SearchHeadlessProvider>
  );
}

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
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
  );
};

export default App;
