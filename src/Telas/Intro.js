import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";

import IconHome from "../../assets/IconHomeIA.png";
import Arrow from "../../assets/arrow.png";
import TypingAnimation from "../components/AnimationText";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerHome}>
        <Image style={styles.logo} source={IconHome} />
        <Text style={styles.titulo}>Bem Vindo ao NutrIA</Text>
        <TypingAnimation
          style={styles.subtitulo}
          text="Sua saúde merece cuidado"
        />
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Cadastrar");
          }}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.btnNext}>Próximo</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5F8FF",
    overflow: "hidden",
  },

  containerHome: {
    flex: 8,
    alignItems: "center",
    justifyContent: "center",
    padding:30,
    textAlign:"center"
  },

  logo: {
    marginBottom: 30,
    width: 230,
    height: 260,
  },
  titulo: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign:"center"
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    width: 350,
    lineHeight: 25,
  },

  button: {
    backgroundColor: "#4876FF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginTop: 30,
  },
  btnNext: {
    fontSize: 22,
    textTransform:"uppercase",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 25,
    color: "white",
  },
  containerButton: {
    flex: 2,
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowImage: {
    width: 45,
    height: 35,
    marginLeft: 10,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});
