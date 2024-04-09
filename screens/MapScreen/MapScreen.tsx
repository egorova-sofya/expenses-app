import { NavigationProp } from "@react-navigation/native";
import React, { FC, useCallback, useLayoutEffect } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import { RootStackParamList } from "../../types";
import CustomMediumText from "../../components/Text/CustomMediumText";
import { COLORS } from "../../constants/theme";

interface Props {
  navigation: NavigationProp<RootStackParamList, "Map">;
}

const MapScreen: FC<Props> = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = React.useState<null | {
    latitude: number;
    longitude: number;
  }>(null);

  const selectLocationHandler = (event: MapPressEvent) => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have not picked a location. Please pick one first!"
      );
      return;
    }
    navigation.navigate("ManageExpense", {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    });
  }, [selectedLocation, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "",
      headerStyle: {
        backgroundColor: COLORS.black,
      },
      headerRight: (tintColor: string) => (
        <Pressable style={styles.button} onPress={savePickedLocationHandler}>
          <CustomMediumText style={styles.buttonText}>Save</CustomMediumText>
        </Pressable>
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={selectLocationHandler}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  button: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: COLORS.white,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginVertical: 16,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    lineHeight: 18,
  },
});

export default MapScreen;
