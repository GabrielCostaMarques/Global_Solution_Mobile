import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

import IconFechar from '../../assets/iconRemove.png'


import { api, API_URL } from "../fetcher/api";
import { onError } from '../models/Toast';


const PopModal = ({ aberto, fechado, atualizaLista }) => {
    const [nome, setNomeSaude]=useState("")
    const [idade, setIdadeSaude]=useState(null)
    const [peso, setPesoSaude]=useState(null)
    const [altura, setAltura]=useState("")
    const [habitosSaude, setHabitos]=useState("")
    const [alimentacaoSaude, setAlimentacao]=useState("")
    const [tempoSono, setTempoSono]=useState("")
    const [imc, setImc]=useState(null)
    

    const objSaude={
        nome,
        idade,
        peso,
        altura,
        habitosSaude,
        alimentacaoSaude,
        tempoSono,
        imc,
        }

    const cadastrarInfo =()=>{
        api
        .post(`${API_URL}dados-suple-usr`,objSaude)
        .then(()=>{
            atualizaLista()
            fechado()
            // console.log("envio",objSaude,"\n");
        }).catch((err)=>{onError("Erro ao cadastrar"+err)})
    }


    return (
        <Modal
            visible={aberto}
            transparent={true}
            onBackdropPress={fechado}
            onBackButtonPress={fechado}
            animationType="slide"
        >

            <ScrollView style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.iconFechar} onPress={fechado}>
                    <Image source={IconFechar}  />
                    </TouchableOpacity>
                
                <View style={styles.container}>
                    
                    <Text style={styles.titleForms}>Formulário de Saúde</Text>
                    <Text style={styles.subtitleForms}>Preencha com suas informações</Text>
                    <TextInput style={styles.inputForms} placeholder='Nome' value={nome} onChangeText={setNomeSaude}/>
                    <TextInput style={styles.inputForms} placeholder='Idade' value={idade} onChangeText={setIdadeSaude}/>
                    <TextInput style={styles.inputForms} placeholder='Peso' value={peso} onChangeText={setPesoSaude}/>
                    <TextInput style={styles.inputForms} placeholder='Altura' value={altura} onChangeText={setAltura}/>
                    <TextInput style={styles.inputForms} placeholder='Hábitos - descreva no máximo 3' value={habitosSaude} onChangeText={setHabitos}/>
                    <TextInput style={styles.inputForms} placeholder='Alimentação - descreva no máximo 3' value={alimentacaoSaude} onChangeText={setAlimentacao}/>
                    <TextInput style={styles.inputForms} placeholder='Tempo de Sono - apenas número' value={tempoSono} onChangeText={setTempoSono}/>
                    <TouchableOpacity style={styles.buttonForms} onPress={cadastrarInfo}>
                        <Text style={styles.titleButtonForms}>Concluir</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </Modal>
    )
}

const styles = StyleSheet.create({

    container: {
        paddingTop:50,
        flex: 1,
        backgroundColor: "#c5c9d1",

        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        paddingBottom: 10
    },

    iconFechar: {
        position: "absolute",
        left: 320,
        top: 10,
        zIndex: 1,
        width:40,
        height:40

    },

    titleForms: {
        fontSize: 24,
        fontWeight: "bold",
        textTransform: "uppercase",
        position: "relative",
        bottom: 40,
    },
    subtitleForms: {
        fontSize: 14,
        textTransform: "uppercase",
        position: "relative",
        bottom: 40,
    },
    inputForms: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 19,
        width: "90%",
        textAlign: "center",
        opacity: 0.5
    },

    buttonForms: {
        paddingHorizontal: 50,
        paddingVertical: 20,
        marginTop: 30,
        backgroundColor: "#0057FE",
        borderRadius: 20,
        
    },

    titleButtonForms: {
        fontSize: 24,
        fontWeight: "bold",
        color:"#FFF"

    }

})

export default PopModal