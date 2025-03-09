import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./stores/tab/rootReducer";
import { loadFonts } from "./components";

import Tabs from "./navigation/tabs";
import Login from "./screens/Login";
import FavCoins from "./screens/FavCoins";
import { Signup } from "./screens";
import Splash from "./screens/Splash";

const Stack = createStackNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  React.useEffect(() => {
    loadFonts();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"Splash"}
        >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="FavCoins" component={FavCoins} />
          <Stack.Screen name="MainLayout" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
