import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home, Search, Market, Profile, FavCoins } from "../screens";
import { COLORS, icons } from "../constants";
import { TabIcon } from "../components";
import { connect } from "react-redux";
import { setTradeModelVisibility } from "../stores/tab/tabActions";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

const Tabs = ({ setTradeModelVisibility, isTradeModalVisible }) => {
  // function tradeTabButtonOnClickHandler() {
  //   //setTradeModelVisibility(!isTradeModalVisible);
  // }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.blue,
          height: 100,
        },
        tabBarLabelStyle: {
          display: "none", // Set display to "none" to hide the tab labels
          color: COLORS.white,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return <TabIcon focused={focused} icon={icons.home} />;
            }
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.searching}
                  label="Search"
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="FAV"
        component={FavCoins}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.like}
              // icon={isTradeModalVisible ? icons.close : icons.trade}
              iconStyle={
                isTradeModalVisible
                  ? {
                      width: 20,
                      height: 20,
                    }
                  : null
              }
              isTrade={true}
            />
          ),
          // tabBarButton: (props) => (
          //   <TabBarCustomButton
          //     {...props}
          //     onPress={() => tradeTabButtonOnClickHandler()}
          //   />
          // ),
        }}
      />

      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return <TabIcon focused={focused} icon={icons.market} />;
            }
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return <TabIcon focused={focused} icon={icons.profile} />;
            }
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

function mapStateToProps(state) {
  return {
    isTradeModalVisible: state.tabReducer.isTradeModalVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTradeModelVisibility: (isVisible) => {
      dispatch(setTradeModelVisibility(isVisible));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
