import { StyleSheet, Text, View } from "react-native";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import StoreLocation from "../types/search/locations";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import * as Location from "expo-location";
import Typography from "../styles/typography";
import Colors from "../styles/colors";
import { v4 as uuid } from "uuid";
import Divider from "./Divider";
import LocationArrowIcon from "./icons/LocationIcon";

const LocationsList = () => {
  const searchActions = useSearchActions();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const locations = useSearchState((state) =>
    state.vertical.results?.map((result) => result.rawData)
  ) as unknown as StoreLocation[] | null;
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    return () => {
      // setting the vertical resets the search state
      searchActions.setVertical("locations");
    };
  }, []);

  useEffect(() => {
    if (location) {
      searchActions.setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      searchActions.setLocationRadius(10000000);
      searchActions.setVerticalLimit(3);
      searchActions.executeVerticalQuery();
    }
  }, [location]);

  const calculateDistance = (lat: number, lon: number) => {
    const R = 6371e3; // metres
    const φ1 = (lat * Math.PI) / 180; // φ, λ in radians
    const φ2 = (location.coords.latitude * Math.PI) / 180;
    const Δφ = ((location.coords.latitude - lat) * Math.PI) / 180;
    const Δλ = ((location.coords.longitude - lon) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    // convert to miles
    return d * 0.000621371;
  };

  return (
    // TODO: add loading state
    <Section>
      <SectionTitle title="Locations" />
      {locations?.map((location, index) => (
        <>
          <View key={uuid()} style={styles.locationCard}>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text style={styles.locationName}>{location.name}</Text>
              <View style={{ flexDirection: "row" }}>
                <LocationArrowIcon />
                <Text style={styles.locationDistance}>
                  {calculateDistance(
                    location.yextDisplayCoordinate.latitude,
                    location.yextDisplayCoordinate.longitude
                  ).toFixed(2)}{" "}
                  mi
                </Text>
              </View>
            </View>
            <Text style={styles.locationAddress}>{location.address.line1}</Text>
            <Text
              style={styles.locationAddress}
            >{`${location.address.city}, ${location.address.region} ${location.address.postalCode}`}</Text>
          </View>
          {index !== locations.length - 1 && <Divider />}
        </>
      ))}
    </Section>
  );
};

const styles = StyleSheet.create({
  locationCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  locationName: {
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.neutral.s900,
    marginBottom: 2,
  },
  locationAddress: {
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.s900,
    ...Typography.fontSize.x10,
  },
  locationDistance: {
    fontFamily: Typography.fontFamily.regular,
    ...Typography.fontSize.x10,

    color: Colors.neutral.s900,
    marginLeft: 4,
  },
});

export default LocationsList;
