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
import { login, signup } from "../api/users";
import { SIZES, COLORS, FONTS, icons } from "../constants";

const Signup = () => {
  const navigation = useNavigation();
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [seePassword, setSeePassword] = useState(true);
  const [seeConfirmedPassword, setSeeConfirmedPassword] = useState(true);

  // Function to check Email format
  const handleCheckEmail = (text) => {
    let re = /\S+@\S+\.\S+/; // Regular expression for email validation

    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; // Regular expression for phone number validation

    setSignUpEmail(text); // Update the SignUpEmail state variable with the input text

    if (re.test(text) || regex.test(text)) {
      // Check if the input text matches either the email or phone number regex
      setCheckValidEmail(false); // Set checkValidEmail state variable to false if the input is valid
    } else {
      setCheckValidEmail(true); // Set checkValidEmail state variable to true if the input is not valid
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
  const handleSignUp = async () => {
    const checkEmail = handleCheckEmail(signUpEmail);
    const checkPassword = checkPasswordValidity(signUpPassword);
    if (signUpPassword !== confirmedPassword) {
      alert("Confirmed password does not match. Please try again 😞");
      return;
    }
    console.log(signUpPassword + " " + confirmedPassword);
    console.log(checkPassword + " " + checkValidEmail);
    if (checkPassword == null && !checkValidEmail) {
      try {
        const result = await signup({
          email: signUpEmail,
          password: signUpPassword,
        });
        console.log(result);
        if (result.status == "201") {
          alert("Register successfully. Please try to login 😃");
          navigation.replace("Login");
        }
        if (result.status == "401") {
          alert("Email already exist. Please register again ❗");
        } else if (result.status == "400") {
          alert("Something wrong in your network, please try again!");
        }
      } catch (error) {
        // Handle any other errors that may occur during login
        console.error(error);
      }
    } else {
      alert("Check password: " + checkPassword);
    }
  };

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
          Hi Welcome to our app ! 👋
        </Text>
      </View>
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#FFFFFF"
          placeholder="Email"
          value={signUpEmail}
          onChangeText={(text) => handleCheckEmail(text)} // Use handleCheckEmail instead of setPassword
        />
      </View>
      {checkValidEmail ? (
        <Text style={styles.textFailed}>Wrong format email</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}
      <View style={styles.wrapperText}>
        <Text style={styles.info}>
          📙Password must contains at least one uppercase, lowercase, special
          character, digit and 8-16 Characters Long
        </Text>
      </View>
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#FFFFFF"
          value={signUpPassword}
          secureTextEntry={seePassword}
          onChangeText={(text) => setSignUpPassword(text)}
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

      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#FFFFFF"
          value={confirmedPassword}
          secureTextEntry={seeConfirmedPassword}
          onChangeText={(text) => setConfirmedPassword(text)}
        />
        <TouchableOpacity
          style={styles.wrapperIcon}
          onPress={() => setSeeConfirmedPassword(!seeConfirmedPassword)}
        >
          <Image
            source={seeConfirmedPassword ? icons.eye : icons.eyeActive}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {signUpEmail == "" || signUpPassword == "" || checkValidEmail == true ? (
        <TouchableOpacity
          disabled
          style={styles.buttonDisable}
          onPress={handleSignUp}
        >
          <Text style={styles.text}>SignUp</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.text}>SignUp</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 65,
    // justifyContent: "center",
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
  info: {
    color: COLORS.white,
    padding: SIZES.padding,
  },
});

export default Signup;
