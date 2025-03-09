import React, { useState, useEffect } from "react";
import { MainLayout } from ".";
import { Header, CoinDetail } from "../components";
import { COLORS, FONTS, SIZES, icons, constants } from "../constants";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { getCoin, updateCoin, updateWatchList, deleteCoin } from "../api/users";
import { searchCoins } from "../api/coingecko";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import ModalPopup from "../components/ModalPopup";

const FavCoins = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [watchListResults, setWatchListResults] = useState([]);
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [watchListCoins, setWatchListCoins] = useState("");

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [coinToRemove, setCoinToRemove] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Get user email from AsyncStorage
      const email = await AsyncStorage.getItem("Email");
      console.log("Effect " + email);
      if (email !== null) {
        setUserEmail(email);
      } else {
        console.log("User email is null");
      }
    };

    fetchData();
  }, []);

  // Get User watching whenever user email change
  useEffect(() => {
    const fetchData = async () => {
      if (userEmail) {
        await getUserWatchList();
      }
    };

    fetchData();
  }, [userEmail]);

  useEffect(() => {
    // Function to fetch user watchlist data
    const getUserWatchList = async () => {
      try {
        // Retrieve watchlist data from the database
        const response = await getCoin({ email: userEmail });

        if (response.watchList != null && response.watchList.length != 0) {
          const favCoinsTemp = response.watchList;
          setWatchListCoins(favCoinsTemp);

          // Fetch the updated watchlist data
          await handleSearch(favCoinsTemp);
        } else {
          console.log("User watch list is empty");
        }
      } catch (error) {
        console.error("Error retrieving user watch list:", error);
      }
    };

    // Fetch user watchlist when userEmail changes
    if (userEmail) {
      getUserWatchList();
    }
  }, []);

  // Get watch list coin detail
  const handleSearch = async (watchListCoins) => {
    try {
      if (watchListCoins && watchListCoins.length > 0) {
        const ids = watchListCoins.join(",");
        //console.log(ids);
        const response = await searchCoins({
          searchQuery: ids,
        });
        console.log("Search Coin: " + response);
        setWatchListResults(response);
        //console.log(watchListResults);
      } else {
        console.log("Watch list is empty");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get watchlist from DB
  const getUserWatchList = async () => {
    try {
      console.log("Try to get Watch List");
      const response = await getCoin({ email: userEmail });
      console.log("Response: " + response.watchList);
      if (response.watchList != null && response.watchList.length != 0) {
        //const data = response.data;
        const favCoinsTemp = response.watchList;
        setWatchListCoins(favCoinsTemp);
        await handleSearch(
          watchListCoins !== null ? favCoinsTemp : watchListCoins
        );
      } else {
        console.log("Invalid response received");
      }
    } catch (error) {
      console.error("Error retrieving user watch list:", error);
    }
  };

  const handleUpdateWatchList = async (updatedWatchList) => {
    try {
      // Remove the coin from the database
      if (coinToRemove) {
        await deleteCoin({ email: userEmail, coinId: coinToRemove });
      }

      // Handle success or perform any necessary actions
      console.log("Watchlist updated successfully");

      // Reload or update the component state as needed
      await getUserWatchList(); // Example: Reload the watchlist after update
    } catch (error) {
      // Handle error or display error message
      console.error("Failed to update watchlist:", error);
      // Perform any necessary error handling
    }
  };

  //   Delete fav coins
  const handleRemoveFavorite = (coinId) => {
    setCoinToRemove(coinId);
    setShowConfirmationModal(true);
  };
  const handleConfirmRemoveFavorite = async () => {
    // Remove the coin from the watch list
    const updatedCoins = watchListCoins.filter((id) => id !== coinToRemove);
    setWatchListCoins(updatedCoins);

    // Close the confirmation modal
    setShowConfirmationModal(false);

    // Call the function to update the watchlist and remove the coin from the database
    await handleUpdateWatchList(updatedCoins);
  };
  const handleCancelRemoveFavorite = () => {
    // Close the confirmation modal
    setShowConfirmationModal(false);
  };

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.black,
        }}
      >
        <Header title="Favorite Coins" />

        {watchListResults.length === 0 && (
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                marginTop: SIZES.padding,
                marginLeft: SIZES.radius,
                color: COLORS.white,
                fontSize: 22,
              }}
            >
              Sorry, your watching list is empty!
            </Text>
          </View>
        )}
        <View
          style={{
            flex: 1,
            width: SIZES.width,
          }}
        >
          <FlatList
            data={watchListResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              const isFavorite = watchListCoins.includes(item.id);
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: SIZES.padding,
                    marginTop: SIZES.radius,
                  }}
                  //onPress={() => handleCoinPress(item.id)}
                >
                  {/* COINS */}
                  <View
                    style={{
                      flex: 1.5,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{
                        uri: item.image,
                      }}
                      style={{
                        height: 20,
                        width: 20,
                      }}
                    />
                    <Text
                      style={{
                        marginLeft: SIZES.radius,
                        color: COLORS.white,
                        fontSize: 22,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        marginLeft: SIZES.radius,
                        color:
                          item.price_change_percentage_24h < 0
                            ? COLORS.red
                            : COLORS.lightGreen,
                        fontSize: 22,
                      }}
                    >
                      {item.price_change_percentage_24h}
                    </Text>
                    <Text
                      style={{
                        marginLeft: SIZES.radius,
                        color: COLORS.white,
                        fontSize: 22,
                      }}
                    >
                      {item.current_price}
                    </Text>
                    {isFavorite ? (
                      <TouchableOpacity
                        style={{ marginLeft: SIZES.radius }}
                        onPress={() => handleRemoveFavorite(item.id)}
                        onLongPress={() => {
                          // Set a timeout of 1000ms (1 second)
                          const timeout = setTimeout(() => {
                            // Perform the action for holding the button here
                            // For example, show a popup or confirmation message
                            handleRemoveFavorite(item.id);
                          }, 1000);

                          // Clear the timeout when the touch is released
                          // This prevents the action from being triggered if the user releases the touch before the timeout
                          return () => clearTimeout(timeout);
                        }}
                      >
                        <Text style={{ color: COLORS.red, fontSize: 18 }}>
                          -
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Reload page  */}
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.blue,
            borderRadius: SIZES.radius,
            marginTop: SIZES.padding,
            marginBottom: SIZES.padding,
          }}
          onPress={getUserWatchList}
        >
          <Text style={{ color: COLORS.white, fontSize: 16 }}>Reload</Text>
        </TouchableOpacity>

        {/* Coin Detail */}
        {selectedCoinId && (
          <CoinDetail
            coinId={selectedCoinId}
            onClose={() => setSelectedCoinId(null)}
            coinObject={watchListResults}
          />
        )}
      </View>

      {/* Confirmation Modal */}
      <ModalPopup
        visible={showConfirmationModal}
        onRequestClose={handleCancelRemoveFavorite}
        onConfirm={handleConfirmRemoveFavorite}
      >
        <Text style={{ color: COLORS.white }}>
          Are you sure you want to remove this coin from your watch list?
        </Text>
      </ModalPopup>
    </MainLayout>
  );
};

export default FavCoins;
