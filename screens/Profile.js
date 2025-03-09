import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from "react-native";
import { MainLayout } from "./";
import { Header } from "../components";
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  constants,
  dummyData,
} from "../constants";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SectionTitle = ({ title }) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
      }}
    >
      <Text style={{ color: COLORS.lightGray3, fontSize: 14 }}>{title}</Text>
    </View>
  );
};

const Setting = ({ title, value, type, onPress }) => {
  if (type == "button") {
    return (
      <TouchableOpacity
        style={{ flexDirection: "row", height: 50, alignItems: "center" }}
        onPress={onPress}
      >
        <Text style={{ flex: 1, color: COLORS.white, fontSize: 16 }}>
          {title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: COLORS.white,
              marginRight: SIZES.radius,
              fontSize: 16,
            }}
          ></Text>

          <Image
            source={icons.rightArrow}
            style={{ height: 15, width: 15, tintColor: COLORS.white }}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={{ flexDirection: "row", height: 50, alignItems: "center" }}>
        <Text style={{ flex: 1, color: COLORS.white, fontSize: 16 }}>
          {title}
        </Text>
        <Switch value={value} onValueChange={(value) => onPress(value)} />
      </View>
    );
  }
};

const Profile = () => {
  const navigation = useNavigation();
  const [faceId, setFaceId] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const email = await AsyncStorage.getItem("Email");
      //console.log("Effect " + email);
      if (email !== null) {
        setUserEmail(email);
      } else {
        console.log("User email is null");
      }
    };

    fetchData();
  }, []);

  // SignOut Function
  // Function to sign out and clear AccessToken
  const signOut = async () => {
    try {
      // Clear AccessToken
      await AsyncStorage.removeItem("AccessToken");
      navigation.replace("Login");

      // Additional cleanup or navigation logic
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const redirectToFaviroteCoin = async () => {
    navigation.replace("FavCoins");
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
        {/* Header */}
        <Header title="Profile" />

        {/* Detail */}
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.radius,
            }}
          >
            {/* Email & user id */}
            <View
              style={{
                flex: 1,
              }}
            >
              <Text style={{ color: COLORS.white, fontSize: 16 }}>
                {userEmail}
              </Text>
              <Text style={{ color: COLORS.lightGray3, fontSize: 14 }}>
                ID: {dummyData.profile.id}
              </Text>
            </View>
            {/* Status */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={icons.verified}
                style={{ height: 25, width: 25 }}
              />
              <Text
                style={{
                  marginLeft: SIZES.base,
                  color: COLORS.lightGreen,
                  fontSize: 16,
                }}
              >
                Verified
              </Text>
            </View>
          </View>
          <SectionTitle title="App" />
          <Setting
            title="Favirote Coins"
            value="Home"
            type="button"
            onPress={() => redirectToFaviroteCoin()}
          />

          {/* Account */}
          <SectionTitle title="Account" />
          <Setting
            title="Setting"
            value="Home"
            type="button"
            onPress={() => console.log("Pressed")}
          />
          <Setting
            title="Currency"
            value="USD"
            type="button"
            onPress={() => console.log("Pressed")}
          />
          <Setting
            title="Language"
            value="English"
            type="button"
            onPress={() => console.log("Pressed")}
          />

          {/* Security */}
          <SectionTitle title="Account" />
          <Setting
            title="Face ID"
            value={faceId}
            type="switch"
            onPress={(value) => setFaceId(value)}
          />
          <Setting
            title="Password Setting"
            value=""
            type="button"
            onPress={() => console.log("Pressed")}
          />
          <Setting
            title="Change Password"
            value=""
            type="button"
            onPress={() => console.log("Pressed")}
          />
          <Setting
            title="2-Factor Authentication"
            value=""
            type="button"
            onPress={() => console.log("Pressed")}
          />
          <Setting
            title="Signout"
            value=""
            type="button"
            onPress={() => signOut()}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default Profile;
