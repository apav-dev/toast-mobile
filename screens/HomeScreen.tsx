import { Text, View } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontFamily: "Sora_400Regular", fontSize: 40 }}>
        Sora Regular
      </Text>
    </View>
  );
};

export default HomeScreen;
