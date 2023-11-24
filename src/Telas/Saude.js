import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import PopModal from "./Popup";
import IconAdd from "../../assets/iconadd.png";
import { AntDesign } from "@expo/vector-icons";
import { onSucess, onError } from "../models/Toast";
import { api, API_URL } from "../fetcher/api";

function Saude() {
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [lista, setLista] = useState([]);

  const [campanha, setCampanha] = useState({
    titulo: "",
    descricao: "",
    dtInfoSaude: "",
  });

  const camapanhaSaudeAtual = () => { 
    try {
      api.get(`${API_URL}atualizacoes-saude-pub`).then((resp) => {
        onSucess(`Campanha atual carregada!`);
        setCampanha(...resp.data);
      });
    } catch (error) {
      onError(`Falha ao carregar os dados`);
    }
  };

  const getUserSaude = () => {
    api
      .get(`${API_URL}dados-suple-usr`)
      .then((resposta) => {
        const listaNova = [];
        for (const chave in resposta.data) {
          const obj = { ...resposta.data[chave], id: chave };
          let id = resposta.data.map((x) => x.id);
          obj.id = id[0];
          listaNova.push(obj);
        }
        setLista(listaNova);
      })

      .catch((err) => {
        alert("Erro ao ler a lista" + err);
      });
  };

  const atualizaLista = () => {
    getUserSaude();
  };

  const editarDados = async (item, novosDados) => {
    novosDados["id"] = item.id;
    try {
      await api.put(`${API_URL}dados-suple-usr/${item.id}`, novosDados);
      onSucess("Dados editados com sucesso!");
      handleSalvarEdicao();
    } catch (err) {}
  };

  const apagar = (obj) => {

    api
      .delete(`${API_URL}dados-suple-usr/${obj.id}`)
      .then(() => {
        onSucess("Dados Removidos")
        atualizaLista();
      })
      .catch(() => {
        onError("Erro ao apagar dado");
      });
  };

  useEffect(() => {
    camapanhaSaudeAtual();
    atualizaLista();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconadd}>
        <TouchableOpacity onPress={toggleModal}>
          <Image source={IconAdd} style={styles.iconaddImg} />
        </TouchableOpacity>
        <PopModal
          aberto={modalVisible}
          fechado={toggleModal}
          atualizaLista={atualizaLista}
        />
      </View>
      <View style={styles.blocoCampanha}>
        <Text style={styles.tituloBlocoCampanha}>{campanha.titulo + "\n"}</Text>
        <Text style={styles.textoBlocoCampanha}>
          {campanha.descricao + "\n"}
        </Text>
        <Text style={styles.textoBlocoCampanha}>
          Data Inicio Campanha: {campanha.dtInfoSaude}
        </Text>
      </View>

      <FlatList
        data={lista}
        renderItem={({ item }) => (
          <Item
            item={item}
            apagarItem={apagar}
            atualizaLista={atualizaLista}
            editarItem={editarDados}
          />
        )}
        keyExtractor={(item) => item.id}
        style={{ flex: 90 }}
      />
    </View>
  );
}

const Item = ({ item, apagarItem, editarItem, atualizaLista }) => {
  const [editar, setEditar] = useState(false);
  const [novosDados, setNovosDados] = useState({});

  const handleEdicao = () => {
    setEditar(!editar);
  };

  const handleSalvarEdicao = () => {
    editarItem(item, novosDados);
    setEditar(false);
    atualizaLista();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.item}>
        {editar ? (
          <View style={{ flex: 1, height: "100%" }}>
            <TextInput
              style={styles.inputEdicao}
              placeholder={`Nome: ${item.nome}`}
              onChangeText={(text) =>
                setNovosDados({ ...novosDados, nome: text })
              }
            />
            <TextInput
              style={styles.inputEdicao}
              placeholder={`Idade: ${item.idade}`}
              onChangeText={(text) =>
                setNovosDados({ ...novosDados, idade: text })
              }
            />
            <TextInput
              keyboardType="numeric"
              style={styles.inputEdicao}
              placeholder={`Peso: ${item.peso}`}
              onChangeText={(text) =>
                setNovosDados({ ...novosDados, peso: text })
              }
            />
            <TextInput
              keyboardType="numeric"
              style={styles.inputEdicao}
              placeholder={`Altura: ${item.altura}`}
              onChangeText={(text) =>
                setNovosDados({ ...novosDados, altura: text })
              }
            />
            <TextInput
              style={styles.inputEdicao}
              placeholder={`Hábitos: ${item.habitosSaude}`}
              onChangeText={(text) =>
                setNovosDados({ ...novosDados, habitosSaude: text })
              }
            />
            <TextInput
              style={styles.inputEdicao}
              placeholder={`Alimentação: ${item.alimentacaoSaude}`}
              onChangeText={(text) =>
                setNovosDados({ ...novosDados, alimentacaoSaude: text })
              }
            />
            <TextInput
              style={styles.inputEdicao}
              placeholder={`Tempo de Sono: ${item.tempoSono}`}
              onChangeText={(text) =>
                setNovosDados({ ...novosDados, tempoSono: text })
              }
            />
            <TouchableOpacity onPress={handleSalvarEdicao}>
              <Text>Salvar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.tagNome}>
              <Text style={styles.paragrafoNome}>{item.nome}</Text>
            </View>
            <Text style={styles.paragrafo}>Idade: {item.idade}</Text>
            <Text style={styles.paragrafo}>Peso: {item.peso}</Text>
            <Text style={styles.paragrafo}>Altura: {item.altura}</Text>
            <Text style={styles.paragrafo}>Hábitos: {item.habitosSaude}</Text>
            <Text style={styles.paragrafo}>
              Alimentação: {item.alimentacaoSaude}
            </Text>
            <Text style={styles.paragrafo}>
              Tempo de Sono: {item.tempoSono}
            </Text>
            <Text style={styles.paragrafoIMC}>IMC: {item.imc.toFixed(1)}</Text>
            <TouchableOpacity style={styles.iconEdita} onPress={handleEdicao}>
              <AntDesign name="edit" size={40} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconLixeira}
              onPress={() => {
                apagarItem(item);
                atualizaLista();
              }}
            >
              <AntDesign name="delete" size={40} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FF",
  },

  iconadd: {
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 10,
  },
  iconaddImg: {
    width: 40,
    height: 40,
  },

  blocoCampanha: {
    margin: 20,
    marginBottom: 50,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  tituloBlocoCampanha: {
    fontSize: 24,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
  },
  textoBlocoCampanha: {
    textAlign: "center",
    fontSize: 15,
  },
  item: {
    backgroundColor: "#0057FE",
    elevation: 8,
    padding: 20,
    paddingTop: 30,
    marginVertical: 40,
    marginHorizontal: 16,
    borderRadius: 10,
  },

  tagNome: {
    backgroundColor: "#fff",
    bottom: 65,
    borderRadius: 20,
    paddingVertical: 5,
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  paragrafo: {
    fontSize: 17,
    padding: 5,
    color: "white",
  },
  paragrafoNome: {
    fontSize: 25,
    padding: 5,
    textAlign: "center",
    textTransform: "capitalize",
  },
  paragrafoIMC: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    padding: 20,
    color: "white",
  },

  iconLixeira: {
    position: "absolute",
    right: 0,
    top: 20,
    margin: 0,
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 7,
    elevation: 10,
  },
  iconEdita: {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 0,
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 7,
    elevation: 10,
  },
});

export default Saude;
