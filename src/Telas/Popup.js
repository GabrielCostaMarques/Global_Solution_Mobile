import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

import IconFechar from '../../assets/iconRemove.png'
import axios from 'axios';

import { api, API_URL } from "../fetcher/api";

import { respostaApiGPTSaude } from '../fetcher/apiGPT';

const apiForms = axios.create({baseURL:"https://globalteste-5ed37-default-rtdb.firebaseio.com"})

const PopModal = ({ aberto, fechado, atualizaLista }) => {
    const [nomeSaude, setNomeSaude]=useState("")
    const [idadeSaude, setIdadeSaude]=useState(null)
    const [pesoSaude, setPesoSaude]=useState(null)
    const [alturaSaude, setAltura]=useState("")
    const [habitosSaude, setHabitos]=useState("")
    const [alimentacaoSaude, setAlimentacao]=useState("")
    const [tempoSono, setTempoSono]=useState("")
    const [imc, setImc]=useState(null)
    

    const objSaude={
        nomeSaude,
        idadeSaude,
        pesoSaude,
        alturaSaude,
        habitosSaude,
        alimentacaoSaude,
        tempoSono,
        imc,
        }

    const cadastrarInfo =()=>{
        apiForms
        .post("/dadosSaude.json",objSaude)
        .then(()=>{
            atualizaLista()
            fechado()
            console.log("batata");

            setTimeout(() => {
                calcularIMC()
            }, 5*1000);
            
            
        }).catch((err)=>{alert("Erro ao cadastrar"+err)})
    }

    const calcularIMC=()=> {
        
        const alturaMetros = alturaSaude / 100;
        const imcTotal = pesoSaude / (alturaMetros * alturaMetros);
        setImc(imcTotal.toFixed(1));
        console.log(imcTotal.toFixed(2));
      }

    return (
        <Modal
            visible={aberto}
            transparent={true}
            onBackdropPress={fechado}
            onBackButtonPress={fechado}
            animationType="slide"
            calcularIMC={calcularIMC}
        >

            <ScrollView style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.iconFechar} onPress={fechado}>
                    <Image source={IconFechar}  />
                    </TouchableOpacity>
                
                <View style={styles.container}>
                    
                    <Text style={styles.titleForms}>Formulário de Saúde</Text>
                    <Text style={styles.subtitleForms}>Preencha com suas informações</Text>
                    <TextInput style={styles.inputForms} placeholder='Nome' value={nomeSaude} onChangeText={setNomeSaude}/>
                    <TextInput style={styles.inputForms} placeholder='Idade' value={idadeSaude} onChangeText={setIdadeSaude}/>
                    <TextInput style={styles.inputForms} placeholder='Peso' value={pesoSaude} onChangeText={setPesoSaude}/>
                    <TextInput style={styles.inputForms} placeholder='Altura' value={alturaSaude} onChangeText={setAltura}/>
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
        backgroundColor: "#2C6FD1",
        borderRadius: 20
    },

    titleButtonForms: {
        fontSize: 24,
        fontWeight: "bold",

    }

})

export default PopModal