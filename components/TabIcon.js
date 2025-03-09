import React from "react";
import { View, Text, Image } from "react-native";
import { FONTS, COLORS } from "../constants";

const TabIcon = ({ focused, icon, iconStyle, isTrade }) => {
  if (isTrade) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 80,
          height: 80,
          borderRadius: 20,
          //   borderColor: COLORS.white,
          backgroundColor: COLORS.blue,
        }}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.white,
            ...iconStyle,
          }}
        />
        {/* <Text style={{ color: COLORS.white }}>Trade</Text> */}
      </View>
    );
  } else {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          height: 60,
          //   borderRadius: 30,
          //backgroundColor: COLORS.blue,
        }}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: focused ? COLORS.white : COLORS.secondary,
            ...iconStyle,
          }}
        />
      </View>
    );
  }
};

export default TabIcon;
