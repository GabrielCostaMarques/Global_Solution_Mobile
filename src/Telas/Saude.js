import * as React from "react";
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
  } from 'react-native';

function Saude() {
  return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
  );
}

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Outubro Rosa - Câncer de mama",
    orientacoes:`Cuidados e orientações:
    - O principal cuidado é a realização de exames de rastreamento.\n
    - A mamografia é o exame mais eficaz para a detecção precoce do câncer de mama.

Faixas etárias:
   - Mulheres a partir dos 40 anos devem realizar exames de rastreamento anualmente.

Médicos:
    - Os médicos indicados para realizar os exames de rastreamento são o ginecologista e o mastologista.
    `,
    mes: "Outubro",
    imc: "25",
    idade: "41",
    peso: "81",
    sono: "7h",
  },
  {
    id: "3ac68afc-c1b1-46c2-aed5",
    title: "teste",
    mes: "teste",
    imc: "teste",
    idade: "teste",
    peso: "teste",
    sono: "teste",
  },
  {
    id: "3ad53abb28ba-c1b1-46c2-aed5-2",
    title: "teste",
    mes: "teste",
    imc: "teste",
    idade: "teste",
    peso: "teste",
    sono: "teste",
  },
];

const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>Campanha:{item.title}</Text>
    {/* <Text style={styles.title}>Mês:{item.mes}</Text> */}
    <Text style={styles.paragrafo}>IMC:{item.imc}</Text>
    <Text style={styles.paragrafo}>idade:{item.idade}</Text>
    <Text style={styles.paragrafo}>peso:{item.peso}</Text>
    <Text style={styles.paragrafo}>tempo de sono:{item.sono}</Text>
    <Text style={styles.paragrafo}>orientacoes:{item.orientacoes}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
    fontWeight:"bold"
  },
  paragrafo: {
    fontSize: 16,
  },
});

export default Saude;
