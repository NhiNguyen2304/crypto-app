import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { dummyData, COLORS, FONTS, SIZES, icons } from "../constants";
import { getCoinDetailChart } from "../api/coingecko";

const DetailChart = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchBitcoinChartData();
  }, []);

  const fetchBitcoinChartData = async () => {
    try {
      const response = await getCoinDetailChart();
      const data = await response.json();

      const prices = data.prices;
      const chartData = prices.map((price) => price[1]);

      setChartData(chartData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <LineChart
        data={{
          datasets: [
            {
              data: chartData,
            },
          ],
        }}
        width={Dimensions.get("window").width - 20}
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
      />
    </View>
  );
};

export default DetailChart;
