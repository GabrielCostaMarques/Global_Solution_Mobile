import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, DrawerLayoutAndroid } from "react-native";
import { respostaApiGPT } from "../components/apiGPT";
import Menu from "../Telas/MenuProfile";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const drawerRef = React.createRef();

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;
    const userMessage = { text: inputMessage, isSent: true };
    setMessages([...messages, userMessage]);
    setInputMessage("");

    try {
      const botMessage = await respostaApiGPT(inputMessage);

      if (botMessage) {
        const botResponse = { text: botMessage, isSent: false };
        setMessages([...messages, userMessage, botResponse]);
      }
    } catch (error) {
      console.error("Erro na chamada da API GPT-3:", error);
    }
  };

  const openDrawer = () => {
    drawerRef.current.openDrawer();
  };

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerLockMode='locked-closed'
      drawerWidth={300}
      drawerPosition="top"
      renderNavigationView={() => (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Menu/>
        </View>
      )}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={openDrawer}>
          <Text style={{ fontSize: 24, padding: 16 }}>☰ Menu</Text>
        </TouchableOpacity>

        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ alignSelf: item.isSent ? "flex-end" : "flex-start" }}>
              <View
                style={{
                  backgroundColor: item.isSent ? "#4CAF50" : "#007AFF",
                  padding: 10,
                  borderRadius: 10,
                  margin: 5,
                  maxWidth: "60%",
                  alignSelf: item.isSent ? "flex-end" : "flex-start",
                }}
              >
                <Text style={{ color: "white" }}>
                  {`${item.isSent ? '👤:\t\n' : '🤖:\t\n'}${item.text}`}
                </Text>
              </View>
            </View>
          )}
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 8,
            }}
            placeholder="Digite uma mensagem"
            value={inputMessage}
            onChangeText={(text) => setInputMessage(text)}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={{
              backgroundColor: "#007AFF",
              padding: 8,
              borderRadius: 5,
              marginLeft: 8,
            }}
          >
            <Text style={{ color: "white" }}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
};

export default App;
