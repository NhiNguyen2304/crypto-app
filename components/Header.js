import React from "react";
import { View, Text } from "react-native";
import { dummyData, COLORS, FONTS, SIZES, icons } from "../constants";

const Header = ({ title }) => {
  return (
    <View
      style={{
        height: 100,
        paddingHorizontal: SIZES.radius,
        justifyContent: "flex-end",
      }}
    >
      <Text
        style={{
          color: COLORS.white,

          fontSize: 40,
        }}
      >
        {title}
      </Text>
    </View>
  );
};
export default Header;
