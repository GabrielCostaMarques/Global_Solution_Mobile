import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { api, API_URL } from "../api";
import { onSucess, onError } from "../components/Toast";
import {object,string} from "yup"

const SignIn = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro]= useState("")

  const validarCampos = () => {
    const campos ={nome,email,senha}
    validacaoCampos.validate(campos,{abortEarly:false})
    .then(()=>{
      setErro({nome:"",email:"",senha:""})
      const obj = { nome, email, senha };
      cadastrarUsuario(obj)
    })
    .catch((erro) => {
      const validationErrors = {};
      erro.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setErro(validationErrors);
      return false
    });
  }

  const cadastrarUsuario = (obj) => {
    api
      .post(`${API_URL}usuarios/cadastrar`, obj)
      .then(() => {
        onSucess(`Cadastro realizado com sucesso!`);
        setTimeout(() => {
          navigation.navigate("Login");  
        }, 900);
      })
      .catch((error) => {
        if (typeof error.response.data == "object") {
          let objErrors = error.response.data;
          let msgErroTratada = objErrors.errors.map(
            (msg) => msg.defaultMessage
          )[0];
          onError(`${msgErroTratada}`);
        } else {
          onError(error.response.data);
        }
      });
  };

  const validacaoCampos = object({ 
    nome: string().required("Campo Obrigatório").min((3),"Campo com minímo de 3 caracteres").max((50),"Campo com máximo de 50 caracteres"),
    email:string().email("Email Inválido").required("Campo Obrigatório"),
    senha: string().required("Campo Obrigatório").min((4),"Campo com minímo de 4 caracteres")
  })

  return (
    <View style={style.body}>
      <Text style={style.title}>Cadastre-se agora mesmo!</Text>

      <TextInput
        style={style.input}
        placeholder="Digite seu Nome"
        value={nome}
        onChangeText={setNome}
        minLength={1}
      />
        <Text style={style.msgErro}>{erro.nome}</Text>
      <TextInput
        style={style.input}
        placeholder="Digite seu Email"
        value={email}
        onChangeText={setEmail}
      />
        <Text style={style.msgErro}>{erro.email}</Text>
      <TextInput
        placeholder="Digite sua Senha"
        style={style.input}
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />
      <Text style={style.msgErro}>{erro.senha}</Text>

      <TouchableOpacity
        value="Cadastrar"
        onPress={() => {validarCampos()}}
      >
        <View style={style.btnCadastrar}>
          <Text style={style.btnText}>Cadastre-se</Text>
        </View>
      </TouchableOpacity>
      <Text>{"\n"}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{ marginVertical: 20 }}
      >
        <View style={style.btnCadastrar}>
          <Text style={style.btnText}>Já Tenho Conta</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

//Estilização
const style = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ee5e5e5",
    padding: 20,
  },

  title:{
    color:"black",
    fontSize:30,
    fontWeight:"bold"
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 5,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    color: "black",
  },

  titleInput: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
    color: "black",
    marginTop: 20,
    marginBottom: 20,
  },

  msgErro:{
    fontSize: 11, 
    color: "red", 
    fontWeight: "bold" 
  },
  
  btnCadastrar: {
    fontWeight: "bold" ,
    fontSize: 20,
    backgroundColor: "#ef4023",
    position: "relative",
    top: 60,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 2,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 25,
    color:"white"
  },
});
