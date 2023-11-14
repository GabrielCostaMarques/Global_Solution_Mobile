import React, { useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Importe de Funções e componente
import { Contexto } from "./src/components/contexto";

// Importe de telas
import HomeScreen from "./src/Telas/Intro";
import RegisterScreen from "./src/Telas/Register";
import LoginScreen from "./src/Telas/Login";
import MenuScreen from "./src/Telas/MenuScreen";
// Importe de telas
import ChatScreen from "./src/Telas/Chat";
import Menu from "./src/Telas/MenuProfile";

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [lista, setLista] = useState([]);
  const [id, setId] = useState(0);

  return (
    <Contexto.Provider
      value={{
        lista,
        id,
      }}
    >
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Cadastrar" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="‎" component={ChatScreen} />
            <Stack.Screen name="Menu" component={Menu} />
            {/* <Stack.Screen name="‎" component={MenuScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Contexto.Provider>
  );
}
