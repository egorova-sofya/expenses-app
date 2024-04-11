import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable, View } from "react-native";
import styles from "./avatar.style";
import {
  PermissionStatus,
  MediaTypeOptions,
  launchImageLibraryAsync,
  useCameraPermissions,
  launchCameraAsync,
} from "expo-image-picker";
import BottomMenu from "../BottomMenu/BottomMenu";
import PhotoIcon from "./../../assets/images/icons/photo.svg";
import GalleryIcon from "./../../assets/images/icons/gallery.svg";
import UserIcon from "./../../assets/images/icons/user.svg";
import { COLORS } from "../../constants/theme";
import { fetchAvatar, insertAvatar } from "../../utils/avatarDatabase";
import { useIsFocused } from "@react-navigation/native";

const Avatar = () => {
  const [image, setImage] = useState<null | string>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchAvatarHandler() {
      const avatar = await fetchAvatar();
      avatar && setImage(avatar);
      setIsLoading(false);
    }
    fetchAvatarHandler();
  }, [isFocused]);

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermission() {
    if (
      cameraPermissionInformation?.status === PermissionStatus.DENIED ||
      cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    return true;
  }

  useEffect(() => {
    async function createAvatarHandler(uri: string) {
      await insertAvatar(uri);
    }
    image && createAvatarHandler(image);
  }, [image]);

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 0.5,
    });

    if (!result.canceled) {
      setModalVisible(false);
      setImage(result.assets[0].uri);
    }
  };

  const launchCamera = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app."
      );
      return;
    }

    let result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 0.5,
    });

    if (!result.canceled) {
      setModalVisible(false);

      setImage(result.assets[0].uri);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <View>
      {image ? (
        <Pressable style={styles.unset} onPress={() => setModalVisible(true)}>
          <Image source={{ uri: image }} style={styles.avatar} />
        </Pressable>
      ) : (
        <Pressable style={styles.unset} onPress={() => setModalVisible(true)}>
          <UserIcon width={32} height={32} fill={COLORS.white} />
        </Pressable>
      )}
      <BottomMenu
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        options={[
          {
            title: "Take Photo",
            action: () => {
              launchCamera();
            },
            icon: <PhotoIcon width={32} height={32} fill={COLORS.black} />,
            appearance: "default",
          },
          {
            title: "Choose from Library",
            action: () => {
              pickImage();
            },
            icon: <GalleryIcon width={32} height={32} fill={COLORS.black} />,
            appearance: "default",
          },
        ]}
      />
    </View>
  );
};

export default Avatar;
