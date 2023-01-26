import AsyncStorage from "@react-native-async-storage/async-storage";
import { RecentSearch } from "../components/RecentSearches";

export const storeRecentSearches = async (search: RecentSearch) => {
  try {
    const jsonValue = await AsyncStorage.getItem("recentSearches");
    const recentSearches = jsonValue != null ? JSON.parse(jsonValue) : [];
    recentSearches.push(search);
    const uniqueRecentSearches = recentSearches.filter(
      (search, index, self) => self.indexOf(search) === index
    );
    const jsonRecentSearches = JSON.stringify(uniqueRecentSearches);
    await AsyncStorage.setItem("recentSearches", jsonRecentSearches);
  } catch (e) {
    console.error("Error saving recent searches.\n", e);
  }
};
