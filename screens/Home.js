import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MainLayout } from ".";

import { connect } from "react-redux";
import { getHoldings, getCoinMarket } from "../stores/market/marketAction";
import { useFocusEffect } from "@react-navigation/native";
import { dummyData, COLORS, FONTS, SIZES, icons } from "../constants";
import { BalanceInfo, IconTextButton, Chart } from "../components";
import { fetchCryptoNews } from "../api/coinmarket";

let holdings = [
  {
    id: "bitcoin",
    qty: 888,
  },
  {
    id: "ethereum",
    qty: 188,
  },
  {
    id: "dogecoin",
    qty: 45,
  },
];

const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {
  const [selectedCoin, setSelectedCoin] = React.useState(null);
  const [walletBalance, setWalletBalance] = React.useState("");
  const [newsArticles, setNewsArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    retrieveWalletBalance();
  }, []);

  const retrieveWalletBalance = async () => {
    try {
      const wallet = await AsyncStorage.getItem("Wallet");
      if (wallet !== null) {
        setWalletBalance(wallet);
      }
    } catch (error) {
      console.log("Error retrieving wallet balance:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getHoldings((holdings = holdings));
      getCoinMarket();
    }, [])
  );

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await fetchCryptoNews();
        console.log("NEWS" + articles);
        setNewsArticles(articles);
      } catch (error) {
        console.log(error);
        //setError("Failed to fetch news articles");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // React.useEffect(() => {
  //   const handleUserWallet = async () => {
  //     const wallet = await AsyncStorage.getItem("Wallet");
  //     console.log("Wallet: " + wallet);
  //     if (!wallet) {
  //       setUserWallet(wallet);
  //     }
  //   };
  //   handleUserWallet();
  // }, [userWallet]);

  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;

  // Render each news article
  // Render each news article
  const renderNewsArticle = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
        onPress={() => console.log(item.url)}
      >
        {/* News Image */}
        <Image
          source={{ uri: item.urlToImage }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 10,
          }}
        />

        {/* News Details */}
        <View
          style={{
            flex: 1,
            marginLeft: 15,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 16,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              color: COLORS.lightGray3,
              fontSize: 14,
              marginTop: 5,
            }}
          >
            {item.source.name}
          </Text>
          <Text
            style={{
              color: COLORS.lightGray3,
              fontSize: 12,
              marginTop: 5,
            }}
          >
            {item.publishedAt}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <Text>Loading news articles...</Text>;
  }

  // if (error) {
  //   return <Text>{error}</Text>;
  // }

  function renderWalletInfoSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        {/* Balance Info */}
        <BalanceInfo
          title="Your wallet"
          // displayAmount={totalWallet}
          // changePac={percChange}
          displayAmount={walletBalance == null ? 95000 : walletBalance}
          changePac={2}
          containerStyle={{
            marginTop: 80,
          }}
        />

        {/* Button */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <IconTextButton
            label="Transfer"
            icon={icons.send}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
            onPress={() => console.log("Transfer")}
          />
          <IconTextButton
            label="Withdraw"
            icon={icons.withdraw}
            containerStyle={{
              flex: 1,
              height: 40,
            }}
            onPress={() => console.log("Withdraw")}
          />
        </View>
      </View>
    );
  }

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {/* Header Wallet info */}
        {renderWalletInfoSection()}

        {/* Chart */}
        <Chart
          containerStyle={{
            marginTop: SIZES.padding * 2,
          }}
          chartPrices={
            selectedCoin
              ? selectedCoin?.sparkline_in_7d?.price
              : coins[0]?.sparkline_in_7d?.price
          }
          // chartPrices={prices}
        ></Chart>

        {/* Top Cryptocurrency */}
        <FlatList
          data={coins}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 22,
                  //
                }}
              >
                Top Cryptocurrency
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency == 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;

            return (
              <TouchableOpacity
                style={{
                  height: 55,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setSelectedCoin(item)}
              >
                {/* Logo */}
                <View
                  style={{
                    width: 35,
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                </View>

                {/* Name */}
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: "Roboto-Regular",
                      fontSize: 16,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>

                {/* Figures */}
                <View>
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.white,
                      fontFamily: "Roboto-Regular",
                      fontSize: 14,
                    }}
                  >
                    $ {item.current_price}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {item.price_change_percentage_7d_in_currency != 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.price_change_percentage_7d_in_currency > 0
                              ? [{ rotate: "45deg" }]
                              : [{ rotate: "125deg" }],
                        }}
                      />
                    )}
                    <Text
                      style={{
                        marginLeft: 5,
                        color: priceColor,
                        fontFamily: "Roboto-Regular",
                        fontSize: 12,
                        lineHeight: 15,
                      }}
                    >
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={
            <View
              style={{
                marginBottom: 50,
              }}
            ></View>
          }
        />

        <FlatList
          data={newsArticles}
          renderItem={renderNewsArticle}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding,
            backgroundColor: COLORS.black,
          }}
          keyExtractor={(item) => item.url}
          ListHeaderComponent={
            <View>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 22,
                  //
                }}
              >
                Top News
              </Text>
            </View>
          }
        />
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getHoldings(
          holdings,
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
