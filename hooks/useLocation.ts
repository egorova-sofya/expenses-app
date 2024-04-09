import {
  useForegroundPermissions,
  PermissionStatus,
  getCurrentPositionAsync,
} from "expo-location";
import React from "react";

const useLocation = () => {
  const [locationPermission, requestPermission] = useForegroundPermissions();

  const verifyPermission = async () => {
    if (
      locationPermission?.status === PermissionStatus.DENIED ||
      locationPermission?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    return true;
  };

  const getLocation = async () => {
    const hasPermission = await verifyPermission();
    // if (!hasPermission) {
    //   Alert.alert(
    //     "Insufficient permissions!",
    //     "You need to grant location permissions to use this app."
    //   );
    //   return;
    // }

    const location = await getCurrentPositionAsync();
    console.log("location", location);
  };
  const pickOnMap = () => {};
  return {
    getLocation,
    pickOnMap,
  };
};

export default useLocation;
