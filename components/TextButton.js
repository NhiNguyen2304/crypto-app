import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
} from "react-native";
import {
  dummyData,
  COLORS,
  FONTS,
  SIZES,
  icons,
  constants,
} from "../constants";

const TextButton = ({ label, containerStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 3,
        paddingHorizontal: 18,
        borderRadius: 15,
        backgroundColor: COLORS.gray1,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Text style={{ color: COLORS.white, fontSize: 22 }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
