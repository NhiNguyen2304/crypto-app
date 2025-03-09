import React from "react";
import { View, Text } from "react-native";
// import {
//   ChartDot,
//   ChartPath,
//   ChartPathProvider,
//   ChartXLabel,
//   ChartYLabel,
//   monotoneCubicInterpolation,
// } from "@rainbow-me/animated-charts";

import { SIZES, COLORS, FONTS } from "../constants";
import {
  VictoryLine,
  VictoryScatter,
  VictoryChart,
  VictoryAxis,
} from "victory-native";
import { VictoryCustomTheme } from "../styles";

const formatDateTime = () => {
  const currentDate = new Date();
  const date = `0${currentDate.getDate()}`.slice(-2);
  const month = `0${currentDate.getMonth() + 1}`.slice(-2);
  const year = currentDate.getFullYear();

  return `${date}/${month}/${year}`;
};

const formatNumber = (value) => {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(0)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(0)}M`;
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(0)}K`;
  } else {
    return value.toString();
  }
};

const formatTickLabel = (tick) => {
  if (tick >= 1000) {
    return `${tick / 1000}K`;
  }
  return tick;
};

const Chart = ({ containerStyle, chartPrices }) => {
  // const getYAxisLabels = () => {
  //   if (chartPrices != undefined) {
  //     let minValue = Math.min(...chartPrices);
  //     let maxValue = Math.max(...chartPrices);

  //     let midVal = (minValue + maxValue) / 2;
  //     let higherMidValue = (maxValue + midVal) / 2;
  //     let lowerMidValue = (minValue + midVal) / 2;

  //     let rounding = 2;
  //     return [
  //       formatNumber(maxValue, rounding),
  //       formatNumber(higherMidValue, rounding),
  //       formatNumber(lowerMidValue, rounding),
  //       formatNumber(minValue, rounding),
  //     ];
  //   } else {
  //     return [];
  //   }
  // };
  //const yLabels = getYAxisLabels(chartPrices);
  const tickFormat = (tick) => formatNumber(tick);
  return (
    // <Animated.ScrollView
    //   horizontal
    //   pagingEnabled
    //   scrollEventThrottle={16}
    //   snapToInterval={SIZES.width - 40}
    //   showsHorizontalScrollIndicator={false}
    //   decelerationRate={0}
    //   onScroll={Animated.event(
    //     [
    //       {
    //         nativeEvent: { contentOffset: { x: scrollX } },
    //       },
    //     ],
    //     { useNativeDriver: false }
    //   )}
    // >
    <View>
      <VictoryChart
        theme={VictoryCustomTheme}
        height={220}
        //width={SIZES.width - 40}
      >
        <VictoryLine
          style={{
            data: {
              stroke: COLORS.lightGreen,
            },
            parent: {
              border: "1px solid #ffffff",
            },
          }}
          data={chartPrices}
          // categories={{
          //   x: ["15 MIN", "30 MIN", "45 MIN", "60 MIN"],
          //   y: ["15", "30", "45"],
          // }}
        />
        {/* <VictoryScatter
          data={chartPrices}
          size={7}
          style={{
            data: {
              fill: COLORS.lightGreen,
            },
          }}
        /> */}
        <VictoryAxis
          style={{
            grid: {
              stroke: "transparent",
            },
          }}
          tickFormat={formatDateTime}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: {
              stroke: "transparent",
            },
            grid: {
              stroke: "grey",
            },
          }}
          tickFormat={tickFormat}
        />
        {/* <VictoryLine data={chartPrices} x="x" y="y" /> */}
      </VictoryChart>
    </View>
    // </Animated.ScrollView>
  );
};

export default Chart;
