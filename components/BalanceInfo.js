import React from "react";
import { View, Text, Image } from "react-native";

import { SIZES, COLORS, FONTS, icons } from "../constants";

const BalanceInfo = ({ title, displayAmount, changePac, containerStyle }) => {
  return (
    <View style={{ ...containerStyle }}>
      {/* Tittle */}
      <Text
        style={{
          color: COLORS.white,

          fontSize: SIZES.h2,
        }}
      >
        {title}
      </Text>

      {/* Figure */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            fontSize: SIZES.h2,
            marginLeft: SIZES.base,
            color: COLORS.lightGray3,
          }}
        >
          $
        </Text>
        <Text
          style={{
            fontSize: SIZES.h2,
            color: COLORS.white,
          }}
        >
          {displayAmount.toLocaleString()}
        </Text>
        <Text
          style={{
            fontSize: SIZES.h3,
            color: COLORS.lightGray3,
          }}
        >
          USD
        </Text>
      </View>

      {/* Change Percentage */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        {changePac != 0 && (
          <Image
            source={icons.upArrow}
            style={{
              width: 10,
              height: 10,
              alignSelf: "center",
              tintColor: changePac > 0 ? COLORS.lightGreen : COLORS.red,
              transform:
                changePac > 0 ? [{ rotate: "45deg" }] : [{ rotate: "125deg" }],
            }}
          />
        )}
        <Text
          style={{
            marginLeft: SIZES.base,
            alignSelf: "flex-end",
            color:
              changePac == 0
                ? COLORS.lightGray3
                : changePac > 0
                ? COLORS.lightGreen
                : COLORS.red,
          }}
        >
          {changePac.toFixed(2)}%
        </Text>
        <Text
          style={{
            marginLeft: SIZES.radius,
            alignSelf: "flex-end",
            color: COLORS.lightGray3,

            fontSize: SIZES.h5,
          }}
        >
          7d change
        </Text>
      </View>
    </View>
  );
};

export default BalanceInfo;
