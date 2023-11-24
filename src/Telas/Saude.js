import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';




import PopModal from './Popup'
import IconAdd from '../../assets/iconadd.png'
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { onSucess, onError } from "../models/Toast";
import { api, API_URL } from "../fetcher/api";
import { Contexto } from '../components/contexto';


const apiformsSaude = axios.create({ baseURL: "https://globalteste-5ed37-default-rtdb.firebaseio.com" })

function Saude() {

  const toggleModal = () => { 
    
    setModalVisible(!modalVisible) }


  const [modalVisible, setModalVisible] = useState(false)
  const [lista, setLista] = useState([])

  const [campanha, setCampanha] = useState({
    titulo: "",
    descricao: "",
    dtInfoSaude: "",
  });

  const camapanhaSaudeAtual = () => {
    try {
      api.get(`${API_URL}atualizacoes-saude-pub`).then((resp) => {
        onSucess(`Campanha atual carregada!`);
        setCampanha(...resp.data)
      });
    } catch (error) {
      onError(`Falha ao carregar os dados`);
      
    }
  }


  const getUserSaude = () => {
    apiformsSaude.get("/dadosSaude.json")

      .then((resposta) => {
        const listaNova = [];
        for (const chave in resposta.data) {
          const obj = { ...resposta.data[chave], id: chave };
          obj.id = chave;
          listaNova.push(obj);
        }
        setLista(listaNova);
        
      })

      .catch((err) => { alert("Erro ao ler a lista" + err) })
  };

  const atualizaLista = () => {
    getUserSaude()
  
  }

  const editarDados = async (item, novosDados) => {
    novosDados['imc'] = parseFloat(novosDados.pesoSaude) / ((parseFloat(novosDados.alturaSaude)/100) * (parseFloat(novosDados.alturaSaude)/100))

    try {
      await apiformsSaude.put(`/dadosSaude/${item.id}.json`, novosDados);
      
      alert("Dados editados com sucesso!");
      handleSalvarEdicao();
    } catch (err) {
     
    }
  };


  const apagar = (obj) => {
    apiformsSaude.delete("/dadosSaude/" + obj.id + ".json")
      .then(() => {
        atualizaLista();
      })
      .catch(() => {
        alert("Erro ao apagar dado")
      })
  }

  useEffect(() => {
    camapanhaSaudeAtual()
    atualizaLista()
  }, [])




  return (
    <View style={styles.container}>
      <View style={styles.iconadd}>
        <TouchableOpacity onPress={toggleModal}>
          <Image source={IconAdd} style={styles.iconaddImg} />
        </TouchableOpacity>
        <PopModal aberto={modalVisible} fechado={toggleModal} atualizaLista={atualizaLista}/>
      </View>
      <View style={styles.blocoCampanha}>
        <Text style={styles.tituloBlocoCampanha}>{campanha.titulo}</Text>
        <Text style={styles.textoBlocoCampanha}>{campanha.descricao}</Text>
        <Text style={styles.textoBlocoCampanha}>Data Inicio Campanha: {campanha.dtInfoSaude}</Text>
      </View>

      <FlatList
        data={lista}
        renderItem={({ item }) => 
        
        <Item item={item} 
        apagarItem={apagar} 
        atualizaLista={atualizaLista} 
        editarItem={editarDados} />}

        keyExtractor={(item) => item.id}
        style={{ flex: 90 }}
      />
    </View>
  );
}

const Item = ({ item, apagarItem, editarItem, atualizaLista }) => {
  const [editar, setEditar] = useState(false);
  const [novosDados, setNovosDados] = useState({})

  const handleEdicao = () => { setEditar(!editar) }

  const handleSalvarEdicao = () => {

      setTimeout(() => {
        
    editarItem(item, novosDados);
    setEditar(false);
    atualizaLista();
      }, 3000);

      

  };



  return (

    <View style={{ flex: 1 }}>

      <View style={styles.item}>
        {editar ? (
          <View style={{ flex: 1, height: "100%" }}>
            <TextInput
              style={styles.inputEdicao}
              placeholder={`Nome: ${item.nomeSaude}`}
              onChangeText={(text) =>
                setNovosDados({ ...novosDados, nomeSaude: text })
              }
            />
            <TextInput
              style={styles.inputEdicao}
              placeholder={`Idade: ${item.idadeSaude}`}
              onChangeText={(text) =>
                setNovosDados({ ...novosDados, idadeSaude: text })
              }
            />
            <TextInput
           keyboardType='numeric'
              style={styles.inputEdicao}
              placeholder={`Peso: ${item.pesoSaude}`}
              onChangeText={(text) =>
                setNovosDados({ ...novosDados, pesoSaude: text })
              }
            />
            <TextInput
            keyboardType='numeric'
              style={styles.inputEdicao}
              placeholder={`Altura: ${item.alturaSaude}`}
              onChangeText={(text) =>
                setNovosDados({ ...novosDados, alturaSaude: text })
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
            <View style={styles.tagNome}><Text style={styles.paragrafoNome}>{item.nomeSaude}</Text></View>

            <Text style={styles.paragrafo}>Idade: {item.idadeSaude}</Text>
            <Text style={styles.paragrafo}>Peso: {item.pesoSaude}</Text>
            <Text style={styles.paragrafo}>Altura: {item.alturaSaude}</Text>
            <Text style={styles.paragrafo}>Hábitos: {item.habitosSaude}</Text>
            <Text style={styles.paragrafo}>Alimentação: {item.alimentacaoSaude}</Text>
            <Text style={styles.paragrafo}>Tempo de Sono: {item.tempoSono}</Text>
            <Text style={styles.paragrafoIMC}>IMC: {Number(item.imc).toFixed(1)}</Text>
            <TouchableOpacity style={styles.iconEdita} onPress={handleEdicao}>
              
              <AntDesign name='edit' size={40} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconLixeira}
              onPress={() => {
                apagarItem(item);
                atualizaLista();
              }}
            >
              <AntDesign name='delete' size={40} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )


};

const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: "#F5F8FF"
  },

  iconadd: {
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 10
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
    fontSize: 15

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
    color:"white"
  },
  paragrafoNome: {
    fontSize: 25,
    padding: 5,
    textAlign: "center",
    textTransform:"capitalize",
  },
  paragrafoIMC: {
    fontSize: 20,
    textAlign: "center",
    textTransform:"uppercase",
    fontWeight:"bold",
    padding:20,
    color:"white"
  },

  iconLixeira: {
    position: "absolute",
    right: 0,
    top: 20,
    margin: 0,
    backgroundColor:"#fff",
    borderRadius:100,
    padding:7,
    elevation: 10,
  },
  iconEdita: {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 0,
    backgroundColor:"#fff",
    borderRadius:100,
    padding:7,
    elevation: 10,
  }
});

export default Saude;
