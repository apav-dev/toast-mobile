import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import Divider from "./Divider";
import { v4 as uuid } from "uuid";
import Typography from "../styles/typography";
import Colors from "../styles/colors";
import SearchIcon from "./SearchIcon";
import CloseIcon from "./icons/CloseIcon";
import { useNavigation } from "@react-navigation/native";

export type SearchType = "beverage" | "category" | "query";

export type RecentSearch = {
  type: SearchType;
  query: string;
};

const RecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    fetchRecentSearches();
  }, []);

  const fetchRecentSearches = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("recentSearches");
      setRecentSearches(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.error("Error fetching recent searches.\n", e);
    }
  };

  const clearRecentSearches = async () => {
    try {
      await AsyncStorage.removeItem("recentSearches");
      setRecentSearches([]);
    } catch (e) {
      console.error("Error clearing recent searches.\n", e);
    }
  };

  const handleSearch = (search: RecentSearch) => {
    if (search.type === "beverage") {
      navigation.navigate("Search", {
        params: { name: search.query },
        screen: "BeverageScreen",
        initial: false,
      });
    } else if (search.type === "category") {
      navigation.navigate("Search", {
        params: { beverageTypeName: search.query },
        screen: "Results",
        initial: false,
      });
    } else if (search.type === "query") {
      navigation.navigate("Search", {
        params: { query: search.query },
        screen: "Results",
        initial: false,
      });
    }
  };

  return recentSearches.length > 0 ? (
    <ScrollView>
      <Section>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 12,
            alignItems: "center",
          }}
        >
          <SectionTitle title="Recent Searches" />
          <TouchableOpacity onPress={clearRecentSearches}>
            <CloseIcon size={24} color={Colors.primary.orange} />
          </TouchableOpacity>
        </View>
        {recentSearches.map((search, index) => (
          <TouchableOpacity key={uuid()} onPress={() => handleSearch(search)}>
            <View style={styles.searchContainer}>
              <SearchIcon size={18} color={Colors.neutral.s500} />
              <Text style={styles.search}>{search.query}</Text>
            </View>
            {/* show divider if not last in list */}
            {index !== recentSearches.length - 1 && <Divider />}
          </TouchableOpacity>
        ))}
      </Section>
    </ScrollView>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    zIndex: 1,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
  },
  search: {
    fontFamily: Typography.fontFamily.regular,
    ...Typography.fontSize.x30,
    color: Colors.neutral.s500,
    marginLeft: 8,
  },
  noRecentSearches: {
    fontSize: 16,
    color: "#ccc",
  },
  clear: {
    fontSize: 16,
    color: "#007AFF",
    marginTop: 16,
  },
});

export default RecentSearches;
