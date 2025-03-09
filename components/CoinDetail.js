import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import { COLORS, SIZES, icons } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateCoin } from "../api/users";
import { getCoinDetail } from "../api/coingecko";

import axios from "axios";

const CoinDetail = ({ coinId, onClose }) => {
  const [coinDetail, setCoinDetail] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const getCoinDetailFromAPI = async () => {
      try {
        const response = await getCoinDetail({
          coinId: coinId,
        });
        if (response !== undefined) {
          //const coinDetail = await response.json();
          console.log("Get Coin Detail");
          //console.log(coinDetail);
          setCoinDetail(response);

          // Get user email
          const email = await AsyncStorage.getItem("Email");
          console.log("Set Email " + email);
          setUserEmail(email);
        } else {
          throw new Error("Request failed with status code " + response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCoinDetailFromAPI();
  }, [coinId]);

  if (!coinDetail) {
    return null;
  }

  // Add a coin to user watchlist
  const handleAddToWatchList = async () => {
    const response = await updateCoin({ email: userEmail, coinId });
    // If coin already in list is API status 409
    if (response.status === "409") {
      alert("Coin already in watch list");
      console.log("Coin added to watch list");
    } else if (response.status === "200") {
      alert("Congrats! Added successfully");
      console.log("Coin added to watch list");
    } else {
      alert("Failed to add watch list");
      console.log("Failed to add coin to watch list");
      // Handle the error case
    }
  };

  //Change color base on currency price, up => green, down => red
  let priceColor =
    coinDetail.market_data.price_change_percentage_24h == 0
      ? COLORS.lightGray3
      : coinDetail.market_data.price_change_percentage_24h > 0
      ? COLORS.lightGreen
      : COLORS.red;
  return (
    <Modal animationType="slide" transparent={false} visible={true}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image
              source={icons.close}
              resizeMode="contain"
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Coin Details */}
        <View style={styles.coinContainer}>
          <Image
            source={{ uri: coinDetail.image.large }}
            style={styles.coinImage}
          />
          <Text style={styles.coinName}>{coinDetail.name}</Text>
          <Text style={styles.coinSymbol}>
            {coinDetail.symbol.toUpperCase()}
          </Text>

          {/* Additional Coin Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Current Price: </Text>
              <Text style={styles.detailValue}>
                $ {coinDetail.market_data.current_price?.usd?.toFixed(2)}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Market Cap: </Text>
              <Text style={styles.detailValue}>
                $ {coinDetail.market_data.market_cap.usd}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Total Volume: </Text>
              <Text style={styles.detailValue}>
                $ {coinDetail.market_data.total_volume.usd}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Price Change (24h): </Text>
              <Text
                style={{
                  color: priceColor,
                }}
              >
                {coinDetail.market_data.price_change_percentage_24h?.toFixed(2)}
                %
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Market Rank: </Text>
              <Text style={styles.detailValue}>
                {coinDetail.market_cap_rank}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>All-Time High: </Text>
              <Text style={styles.detailValue}>
                $ {coinDetail.market_data.ath.usd}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Total Supply: </Text>
              <Text style={styles.detailValue}>
                {coinDetail.market_data.total_supply}
              </Text>
            </View>
          </View>
          {/* Add to Watch List Button */}
          <TouchableOpacity
            style={styles.addToWatchListButton}
            onPress={handleAddToWatchList}
          >
            <Text style={styles.addToWatchListButtonText}>
              Add to Watch List
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding * 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: SIZES.padding,
  },
  closeButton: {
    padding: SIZES.base,
  },
  closeIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.white,
  },
  coinContainer: {
    alignItems: "center",
  },
  coinImage: {
    width: 100,
    height: 100,
  },
  coinName: {
    marginTop: SIZES.padding,
    fontSize: 20,
    fontWeight: "bold",
  },
  coinSymbol: {
    color: COLORS.white,
    marginTop: SIZES.base,
    fontSize: 16,
  },
  detailsContainer: {
    marginTop: SIZES.padding * 2,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.base,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.lightGray2,
  },
  detailValue: {
    color: COLORS.white,
    fontSize: 16,
  },
  priceChangePositive: {
    color: COLORS.green,
    fontSize: 16,
  },
  priceChangeNegative: {
    color: COLORS.red,
    fontSize: 16,
  },

  addToWatchListButton: {
    marginTop: SIZES.padding,
    padding: SIZES.base,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    alignItems: "center",
  },
  addToWatchListButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default CoinDetail;
