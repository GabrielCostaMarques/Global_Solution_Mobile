import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';


import PopModal from './Popup'
import IconAdd from '../../assets/iconadd.png'
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';




const apiformsSaude = axios.create({ baseURL: "https://globalteste-5ed37-default-rtdb.firebaseio.com" })

function Saude() {

  const [modalVisible, setModalVisible] = useState(false)

  const [id, setId] = useState(null)
  const [lista, setLista] = useState([])


  const toggleModal = () => { setModalVisible(!modalVisible) }

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
  const editarDados = (item, novosDados) => {
    apiformsSaude.put(`/dadosSaude/${item.id}.json`,novosDados)
    .then(()=>{alert("Dados dditados com sucesso!")    })
    .catch((err)=>{alert("Erro ao editar os dados",err)})
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
    getUserSaude()
  }, [])




  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconadd}>
        <TouchableOpacity onPress={toggleModal}>
          <Image source={IconAdd} style={styles.iconaddImg} />
        </TouchableOpacity>
        <PopModal aberto={modalVisible} fechado={toggleModal} atualizaLista={atualizaLista} />
      </View>
      <View style={styles.blocoCampanha}>
        <Text style={styles.tituloBlocoCampanha}>Janeiro: Branco</Text>
        <Text style={styles.textoBlocoCampanha}>Campanha: global de conscientização sobre a Saúde Mental</Text>
      </View>

      <FlatList
        data={lista}
        renderItem={({ item }) => <Item item={item} apagarItem={apagar} atualizaLista={atualizaLista} editarItem={editarDados} />}
        keyExtractor={(item) => item.id}
        style={{ flex: 90 }}
      />
    </SafeAreaView>
  );
}

const Item = ({ item, apagarItem, editarItem, atualizaLista }) => {
  const [editar, setEditar]=useState(false);
  const [novosDados, setNovosDados]=useState({})
  
  const handleEdicao=()=>{setEditar(!editar)}
  
  const handleSalvarEdicao=()=>{
    editarItem(item, novosDados);
    setEditar(false);
    atualizaLista();
  };

  return (

    <View>
      <View style={styles.item}>

        {editar?(
          <View style={{flex:1, height:"100%"}}>
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
              style={styles.inputEdicao}
              placeholder={`Peso: ${item.pesoSaude}`}
              onChangeText={(text) =>
                setNovosDados({ ...novosDados, pesoSaude: text })
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
          <>
            <Text style={styles.paragrafo}>Nome: {item.nomeSaude}</Text>
            <Text style={styles.paragrafo}>Idade: {item.idadeSaude}</Text>
            <Text style={styles.paragrafo}>Peso: {item.pesoSaude}</Text>
            <Text style={styles.paragrafo}>Tempo de Sono: {item.tempoSono}</Text>
            <TouchableOpacity onPress={handleEdicao}>
              <AntDesign name='edit' size={40} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                apagarItem(item);
                atualizaLista();
              }}
            >
              <AntDesign name='delete' size={40} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  )


};

const styles = StyleSheet.create({


  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
    backgroundColor: "#a8a8e5",
    elevation: 8,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  paragrafo: {
    fontSize: 16,
  },

  iconsModel: {

    position: 'absolute',
    right: 0,
    height: "100%"


  }
});

export default Saude;
