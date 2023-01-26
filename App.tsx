import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import { useCallback, useEffect, useState } from "react";
import {
  useFonts,
  Sora_400Regular,
  Sora_600SemiBold,
  Sora_700Bold,
} from "@expo-google-fonts/sora";
import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
/** Under the hood, Search UI React is using Search Core which makes use of the URL object.
 * The URL object is not available in React Native's JavaScript runtime by default, so the next line adds support for it.
 * */
import "react-native-url-polyfill/auto";
import SearchResultsScreen from "./screens/SearchResultsScreen";
import BeverageScreen from "./screens/BeverageScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Text } from "react-native";
import Colors from "./styles/colors";
import Typography from "./styles/typography";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export type SearchStackParamList = {
  BeverageSearch: {
    verticalKey?: string;
  };
  Results: {
    query?: string;
    beverageTypeName?: string;
  };
  BeverageScreen: {
    name: string;
  };
};

const Tab = createBottomTabNavigator();
const SearchStack = createStackNavigator<SearchStackParamList>();

const headerOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: Colors.primary.orange,
  },
  headerTitle(props) {
    return (
      <Text
        style={{
          color: Colors.primary.darkRed,
          fontFamily: Typography.fontFamily.semiBold,
          fontSize: 24,
        }}
      >
        TOAST
      </Text>
    );
  },
  headerBackTitleVisible: false,
  headerTintColor: Colors.primary.darkRed,
};

const SearchStackNavigation = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        ...headerOptions,
      }}
    >
      <SearchStack.Screen
        name="BeverageSearch"
        component={SearchScreen}
        initialParams={{ verticalKey: "beverages" }}
      />
      <SearchStack.Screen name="Results" component={SearchResultsScreen} />
      <SearchStack.Screen name="BeverageScreen" component={BeverageScreen} />
    </SearchStack.Navigator>
  );
};

const searcher = provideHeadless({
  apiKey: "10a44dca245f5fd3faba055fd4d28e1d",
  experienceKey: "toast",
  locale: "en",
  verticalKey: "beverages",
});

function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  let [fontsLoaded] = useFonts({
    Sora_400Regular,
    Sora_600SemiBold,
    Sora_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      setAppIsReady(true);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // Artificially delay for two seconds to simulate a slow loading
  //       // experience. Please remove this if you copy and paste the code!
  //       await new Promise(resolve => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       setAppIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SearchHeadlessProvider searcher={searcher}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <HomeTabs />
        </NavigationContainer>
      </QueryClientProvider>
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
          ...headerOptions,
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            fontFamily: Typography.fontFamily.regular,
          },
          tabBarActiveTintColor: Colors.primary.darkRed,
          tabBarInactiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: Colors.primary.orange,
          },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5Icons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackNavigation}
        options={{
          tabBarLabel: "Search",
          tabBarActiveTintColor: Colors.primary.darkRed,
          tabBarInactiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: Colors.primary.orange,
          },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5Icons name="search" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
