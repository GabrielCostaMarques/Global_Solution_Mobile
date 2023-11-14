import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

// Importe de telas
import ChatScreen from "../Telas/Chat";
import Menu from "../Telas/MenuProfile";

const Tab = createBottomTabNavigator();

const MenuScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen
            name="ChatBot"
            component={ChatScreen}
            options={{
              tabBarIcon: () => {
                return (
                  <View>
                    <Ionicons name="chatbox" size={22} color="green" />
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Menu"
            component={Menu}
            options={{
              tabBarIcon: () => {
                return (
                  <View>
                    <Ionicons name="menu" size={22} color="darkorange" />
                  </View>
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default MenuScreen;