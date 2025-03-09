import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "../api/users";
import { SIZES, COLORS, FONTS, icons } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [seePassword, setSeePassword] = useState(true);

  const handleCheckEmail = (text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const checkPasswordValidity = (value) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return "Password must not contain Whitespaces.";
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return "Password must have at least one Uppercase Character.";
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return "Password must have at least one Lowercase Character.";
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return "Password must contain at least one Digit.";
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return "Password must be 8-16 Characters Long.";
    }

    return null;
  };
  const handleLogin = async () => {
    const checkEmail = handleCheckEmail(email);
    const checkPassword = checkPasswordValidity(password);
    if (!checkPassword && !checkValidEmail) {
      try {
        const result = await login({
          email: email,
          password: password,
        });
        console.log(result);
        if (result.token != null) {
          await AsyncStorage.setItem("AccessToken", result.token);
          // Store the wallet balance in AsyncStorage
          // Convert the wallet balance to a string before storing it
          const walletBalance = String(result.wallet);

          // Store the wallet, email balance in AsyncStorage
          await AsyncStorage.setItem("Wallet", walletBalance);
          await AsyncStorage.setItem("Email", email);

          //console.log("Response: " + result.wallet);
          //AsyncStorage.setItem("Wallet", result.wallet);
          navigation.replace("MainLayout");
        } else {
          alert(result.error);
        }
      } catch (error) {
        // Handle any other errors that may occur during login
        console.error(error);
      }
    } else {
      alert("Password is incorrect");
    }
  };

  const handleRegister = async () => {
    try {
      // Clear AccessToken
      //navigation.replace("Signup");
      navigation.replace("Signup");
      // Additional cleanup or navigation logic
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
  // const handleLogin = () => {
  //   // Perform login logic here
  //   //const checkPassowrd = checkPasswordValidity(password);

  //   login({
  //     data: JSON.stringify({
  //       email: email.toLocaleLowerCase(),
  //       password: password,
  //     }),
  //   })
  //     .then((result) => {
  //       if (result.status == 200) {
  //         AsyncStorage.setItem("AccessToken", result.data.token);
  //         navigation.replace("MainLayout");
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });

  //   // if (!checkPassowrd) {
  //   //   login({
  //   //     email: email.toLocaleLowerCase(),
  //   //     password: password,
  //   //   })
  //   //     .then((result) => {
  //   //       if (result.status == 200) {
  //   //         AsyncStorage.setItem("AccessToken", result.data.token);
  //   //         navigation.replace("MainLayout");
  //   //       }
  //   //     })
  //   //     .catch((err) => {
  //   //       console.error(err);
  //   //     });
  //   // } else {
  //   //   alert(checkPassowrd);
  //   // }

  //   // Example validation
  //   // if (email && password) {
  //   //   alert("Login successful");
  //   //   navigation.replace("MainLayout");
  //   // } else {
  //   //   alert("Please enter valid credentials");
  //   // }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.wrapperText}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginVertical: 12,
            color: COLORS.white,
            marginTop: 10,
          }}
        >
          Hi Welcome Back ! 👋
        </Text>
      </View>
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#FFFFFF"
          placeholder="Email"
          value={email}
          onChangeText={(text) => handleCheckEmail(text)}
        />
      </View>
      {checkValidEmail ? (
        <Text style={styles.textFailed}>Wrong format email</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#FFFFFF"
          value={password}
          secureTextEntry={seePassword}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.wrapperIcon}
          onPress={() => setSeePassword(!seePassword)}
        >
          <Image
            source={seePassword ? icons.eye : icons.eyeActive}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {email == "" || password == "" || checkValidEmail == true ? (
        <TouchableOpacity
          disabled
          style={styles.buttonDisable}
          onPress={handleLogin}
        >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      )}
      <View style={styles.wrapperText}>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.signUp}>Register an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.black,
  },
  wrapperText: {
    borderColor: "grey",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  wrapperInput: {
    borderWidth: 0.5,
    borderRadius: SIZES.radius,
    borderColor: "grey",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    padding: SIZES.padding,
    width: "100%",
    color: COLORS.white,
    fontSize: 16,
  },
  wrapperIcon: {
    position: "absolute",
    right: 0,
    padding: 10,
  },
  icon: {
    width: 30,
    height: 24,
  },
  button: {
    padding: SIZES.padding,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
  },
  buttonDisable: {
    padding: SIZES.padding,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightGray3,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
  },
  text: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 16,
  },
  textFailed: {
    alignSelf: "flex-end",
    color: "orange",
  },
  signUp: {
    marginTop: 10,
    color: COLORS.blue,
    padding: SIZES.padding,
    fontSize: 18,
    textDecorationLine: "underline",
  },
});

export default Login;
