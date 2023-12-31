import React, { useContext, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  Modal,
} from "react-native";
import { Contexto } from "../components/contexto";
import { api, API_URL } from "../fetcher/api";
import { onSucess, onError } from "../models/Toast";

const Login = ({ navigation }) => {
  const contexto = useContext(Contexto);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    try {
      let resp = await api.post(`${API_URL}usuarios/login`, {
        email,
        senha,
      });
      contexto.id = resp.data.id;
      onSucess(`Login com Sucesso!`);
      navigation.navigate("Chat");
    } catch (error) {
      onError(error.response.data ?? `Falha no login. Verifique suas credenciais!!`);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSendEmail = () => {
    onSucess(`Email enviado com Sucesso!`);
    setEmail("")
    toggleModal();
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Login</Text>
      <View>
        <Text style={style.titleInput}>EMAIL</Text>
        <TextInput
          style={style.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Digite seu E-mail"
        />

        <Text style={style.titleInput}>PASSWORD</Text>
        <TextInput
          style={style.input}
          onChangeText={setSenha}
          value={senha}
          secureTextEntry={true}
          placeholder="Digite sua senha"
          minLength={1}
        />
      </View>
      <TouchableOpacity onPress={toggleModal}>
        <View>
          <Text style={style.esqueceuSenhaText}>Esqueceu a Senha?</Text>
        </View>
      </TouchableOpacity>
      <View>
        <TouchableOpacity
          onPress={() => {
            handleLogin();
          }}
        >
          <View style={style.btnLogin}>
            <Text style={style.btnText}>Logar</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            {/* <Text style={style.modalText}>Esqueceu sua senha?</Text> */}
            <Text style={style.modalText}>
              Insira seu email e enviaremos instruções para redefinir sua senha.
            </Text>
            <TextInput
              style={style.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            
            <TouchableOpacity  style={style.modalButtonEnviar} onPress={handleSendEmail}>
              <Text style={style.modalButtonText}>Enviar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.modalButtonCancelar} onPress={toggleModal}>
              <Text style={style.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Login;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0057FE",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    textAlign:"center"
  },

  titleInput: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
    color: "#F5F8FF",
    marginTop: 20,
    textAlign:"center"
  },

  input: {
    backgroundColor: "#F5F8FF",
    borderRadius: 30,
    margin: 5,
    width: 300,
    paddingVertical: 20,
    paddingHorizontal: 20,
    color: "black",
    borderWidth:0.5,
    textAlign:"center"
  },

  btnLogin: {
    fontSize: 30,
    backgroundColor: "#0057FE",
    position: "relative",
    top: 60,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 30,
    borderColor: "#Fff",
    borderWidth: 2,
  },
  btnText: {
    fontSize: 30,
    color: "white",
  },

  esqueceuSenhaText: {
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: "black",
  },
  modalButtonEnviar: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 5,
  },
  modalButtonCancelar: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});
