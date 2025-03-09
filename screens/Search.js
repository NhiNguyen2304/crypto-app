import React from "react";
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
import axios from "axios";
import { searchCoins } from "../api/coingecko";

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [selectedCoinId, setSelectedCoinId] = React.useState(null);
  const [isSearched, setIsSearched] = React.useState(false);

  const handleCoinPress = (coinId) => {
    setSelectedCoinId(coinId);
  };
  const handleSearch = async () => {
    try {
      const response = await searchCoins({
        searchQuery: searchQuery,
      });
      // console.log("Search Coin");
      // console.log(response);
      setSearchResults(response);
      setIsSearched(true);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        flex: 1,
        width: SIZES.width,
      }}
    >
      <Text style={{ color: COLORS.white }}>Name: {item.name}</Text>
      <Text style={{ color: COLORS.white }}>Symbol: {item.symbol}</Text>
    </View>
  );

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        <Header title="Search" />
        <TextInput
          style={{
            color: COLORS.black,
            borderRadius: SIZES.radius,
            borderColor: COLORS.white,
            padding: SIZES.padding,
            backgroundColor: COLORS.white,
            fontSize: 16,
          }}
          placeholder="Search coin..."
          placeholderTextColor={COLORS.black}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.blue,
            borderRadius: SIZES.radius,
            marginTop: SIZES.padding,
          }}
          onPress={handleSearch}
        >
          <Text style={{ color: COLORS.white, fontSize: 16 }}>Search</Text>
        </TouchableOpacity>
        {/* <Button
          style={{ color: COLORS.white }}
          title="Search"
          onPress={handleSearch}
        /> */}
        {searchResults.length === 0 && searchQuery !== "" && (
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                marginLeft: SIZES.radius,
                color: COLORS.white,
                fontSize: 22,
              }}
            >
              Sorry, we can't find any results with your search.
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
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: SIZES.padding,
                    marginTop: SIZES.radius,
                  }}
                  onPress={() => handleCoinPress(item.id)}
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
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {/* Coin Detail */}
        {selectedCoinId && (
          <CoinDetail
            coinId={selectedCoinId}
            onClose={() => setSelectedCoinId(null)}
            coinObject={searchResults}
          />
        )}
      </View>
    </MainLayout>
  );
};

export default Search;
