import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';


import PopModal from './Popup'
import IconAdd from '../../assets/iconadd.png'
import axios from 'axios';

const apiForms = axios.create({baseURL:"https://globalteste-5ed37-default-rtdb.firebaseio.com"})


function Saude() {

  useEffect(()=>{
    carregarInfo
  },[])
  const [modalVisible, setModalVisible] = useState(false)

  const [lista, setLista]=useState([{}])
  
  const toggleModal = () => { setModalVisible(!modalVisible) }
  
  const carregarInfo = () => {
    apiForms.get("/dadosSaude.json")
    
    .then((resposta) => {
      const listaNova = []
      for (const chave in resposta.data) {
        const obj = resposta.data[chave]
        obj.id = chave;
        listaNova.push(obj)
      }
      setLista(listaNova)
      console.log(lista);
    })
    .catch((err) => { alert("Erro ao ler a lista" + err) })
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconadd}>
        <TouchableOpacity onPress={toggleModal}>
          <Image source={IconAdd} style={styles.iconaddImg} />
        </TouchableOpacity>
        <PopModal aberto={modalVisible} fechado={toggleModal}/>
      </View>
      <View style={styles.blocoCampanha}>
        <Text style={styles.tituloBlocoCampanha}>Janeiro: Branco</Text>
        <Text style={styles.textoBlocoCampanha}>Campanha: global de conscientização sobre a Saúde Mental</Text>
      </View>

      <FlatList
        data={lista}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
        style={{ flex: 90 }}
        />
    </SafeAreaView>
  );
}

const Item = ({ item }) => (
  
  <View style={styles.item}>
    {/* <Text style={styles.title}>Campanha:{item.title}</Text>
     <Text style={styles.title}>Mês:{item.mes}</Text>
    <Text style={styles.paragrafo}>IMC:{item.imc}</Text> */}
    <Text style={styles.paragrafo}>idade:{item.idade}</Text>
    <Text style={styles.paragrafo}>peso:{item.peso}</Text>
    <Text style={styles.paragrafo}>tempo de sono:{item.sono}</Text>
    {/* <Text style={styles.paragrafo}>orientacoes:{item.orientacoes}</Text> */}
  </View>
);

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
    backgroundColor: "#9fec23",
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
});

export default Saude;
