import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
} from "react-native";
import { connect } from "react-redux";
import { getCoinMarket } from "../stores/market/marketAction";
import { MainLayout } from ".";
import { COLORS, SIZES, icons, constants } from "../constants";
import { Header, TextButton, CoinDetail } from "../components";
import { LineChart } from "react-native-chart-kit";

const marketTabs = constants.marketTabs.map((marketTab) => ({
  ...marketTab,
  ref: React.createRef(),
}));

const TabIndicator = ({ measureLayout, scrollX }) => {
  const inputRange = marketTabs.map((_, i) => i * SIZES.width);
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.X),
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        height: "100%",
        width: (SIZES.width - SIZES.radius * 2) / 2,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const Tabs = ({ scrollX, onMarketTabPress }) => {
  const [measureLayout, setMeasureLayout] = React.useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
  const containerRef = React.useRef();

  React.useEffect(() => {
    let ml = [];
    marketTabs.forEach((marketTab) => {
      marketTab?.ref.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({
            x,
            y,
            width,
            height,
          });
          if (ml.length === marketTabs.length) {
            setMeasureLayout(ml);
          }
        }
      );
    });
  }, [containerRef.current]);

  const onTabPress = (index) => {
    onMarketTabPress(index);
    setSelectedTabIndex(index);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {/* Tab Navigator */}
      {measureLayout.length > 0 && (
        <TabIndicator
          measureLayout={measureLayout}
          scrollX={scrollX}
          selectedIndex={selectedTabIndex}
        />
      )}
      {/* Tabs */}
      {marketTabs.map((item, index) => (
        <TouchableOpacity
          key={`MarketTab-${index}`}
          style={{ flex: 1 }}
          onPress={() => onTabPress(index)}
        >
          <View
            ref={containerRef}
            style={{
              paddingHorizontal: 15,
              alignItems: "center",
              justifyContent: "center",
              height: 40,
            }}
          >
            <Text
              style={{
                color:
                  index === selectedTabIndex ? COLORS.white : COLORS.lightGray3,
                fontSize: 16,
              }}
            >
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Market = ({ getCoinMarket, coins }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const marketTabScrollViewRef = React.useRef();
  const [selectedCoinId, setSelectedCoinId] = React.useState(null);

  const onMarketTabPress = React.useCallback((marketTabIndex) => {
    marketTabScrollViewRef?.current?.scrollToOffset({
      offset: marketTabIndex * SIZES.width,
    });
  });
  React.useEffect(() => {
    getCoinMarket();
  }, []);

  function renderTabBar() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray,
        }}
      >
        <Tabs scrollX={scrollX} onMarketTabPress={onMarketTabPress} />
      </View>
    );
  }
  const handleCoinPress = (coinId) => {
    setSelectedCoinId(coinId);
  };

  function renderButton() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
        }}
      >
        <TextButton label="USD" />
        <TextButton
          label="% (7d)"
          containerStyle={{ marginLeft: SIZES.base }}
        />
        <TextButton label="Top" containerStyle={{ marginLeft: SIZES.base }} />
      </View>
    );
  }
  function renderList() {
    return (
      <Animated.FlatList
        ref={marketTabScrollViewRef}
        data={marketTabs}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                width: SIZES.width,
              }}
            >
              <FlatList
                data={coins}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                  let priceColor =
                    item.price_change_percentage_7d_in_currency == 0
                      ? COLORS.lightGray3
                      : item.price_change_percentage_7d_in_currency > 0
                      ? COLORS.lightGreen
                      : COLORS.red;
                  return (
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: SIZES.padding,
                        marginBottom: SIZES.radius,
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

                            fontSize: 16,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>

                      {/* Chart */}
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <LineChart
                          withVerticalLabels={false}
                          withHorizontalLabels={false}
                          withDots={false}
                          withInnerLines={false}
                          withVerticalLines={false}
                          withOuterLines={false}
                          data={{
                            datasets: [
                              {
                                data: item.sparkline_in_7d.price,
                              },
                            ],
                          }}
                          width={100}
                          height={60}
                          chartConfig={{
                            color: () => priceColor,
                          }}
                          bezier
                          style={{
                            paddingRight: 0,
                          }}
                        />
                      </View>

                      {/* Figures */}
                      <View
                        style={{
                          flex: 1,
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: COLORS.white,

                            fontSize: 14,
                          }}
                        >
                          $ {item.current_price}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
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
                                  item.price_change_percentage_7d_in_currency >
                                  0
                                    ? [{ rotate: "45deg" }]
                                    : [{ rotate: "125deg" }],
                              }}
                            />
                          )}
                          <Text
                            style={{
                              marginLeft: 5,

                              fontSize: 12,
                              color: priceColor,
                            }}
                          >
                            {item.price_change_percentage_7d_in_currency.toFixed(
                              2
                            )}
                            %
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          );
        }}
      />
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
        {/* Header */}
        <Header title="Market" />

        {/* TabBar */}
        {renderTabBar()}

        {/* Button */}
        {renderButton()}

        {/* Market list */}
        {renderList()}

        {/* Coin Detail */}
        {selectedCoinId && (
          <CoinDetail
            coinId={selectedCoinId}
            onClose={() => setSelectedCoinId(null)}
          />
        )}
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Market);
