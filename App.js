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
// Importe de telas
import ChatScreen from "./src/Telas/Chat";
import SaudeScreen from "./src/Telas/Saude";
import Menu from "./src/Telas/MenuProfile";
import PopModal from './src/Telas/Popup';

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [lista, setLista] = useState([]);
  const [id, setId] = useState(0);
  const [listaSaude, setListaSaude] = useState([]);
  const [idSaude, setIdSaude] = useState(0);


  return (
    <Contexto.Provider
      value={{
        lista,
        id,
        listaSaude,
        idSaude
      }}
    >
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Cadastrar" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} /> 
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="Saude" component={SaudeScreen}/>
            <Stack.Screen name="Popup" component={PopModal}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Contexto.Provider>
  );
}
